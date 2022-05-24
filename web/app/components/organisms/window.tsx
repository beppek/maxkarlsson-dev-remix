import { useNavigate } from '@remix-run/react';
import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { SVG } from '../atoms/svg';

interface WindowProps {
  children: ReactElement | ReactElement[] | string;
  onClose?: () => void;
  title: string;
}

function generateWindowId(windowTitle: string) {
  let hash = 0;
  for (let i = 0; i < windowTitle.length; ++i)
    hash = Math.imul(31, hash) + windowTitle.charCodeAt(i);

  return hash | 0;
}

export function Window({ children, onClose, title }: WindowProps) {
  const [clickPosition, setClickPosition] = useState({ x: 30, y: 30 });
  const [position, setPosition] = useState({ x: 30, y: 30 });
  const [isDragging, setIsDragging] = useState(false);

  const windowId = useMemo(() => generateWindowId(title), [title]);

  const navigate = useNavigate();

  useEffect(() => {
    const windowElement = document.getElementById(`${windowId}`);
    const scrollbarOffset =
      (windowElement?.offsetWidth || 0) - (windowElement?.clientWidth || 0);

    console.log(
      'windowElement?.offsetHeight :>> ',
      windowElement?.offsetHeight,
    );
    setPosition({
      x:
        window.innerWidth / 2 -
        ((windowElement?.offsetWidth || 2) + scrollbarOffset * 4) / 2,
      y: window.innerHeight / 2 - (windowElement?.offsetHeight || 2) / 2 - 20,
    });
  }, [windowId]);

  const onMouseMove = useCallback(
    (e: any) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - clickPosition.x,
          y: e.clientY - clickPosition.y,
        });
      }
    },
    [clickPosition, isDragging],
  );

  const onMouseDown = useCallback(
    (e: any) => {
      if (e.target.id === `${windowId}-close-button`) return;
      if (e.target?.id === `${windowId}-bar`) {
        setIsDragging(true);
        const dragElement = e.target.parentNode;
        setClickPosition({
          x: e.clientX - dragElement.offsetLeft,
          y: e.clientY - dragElement.offsetTop,
        });
      } else if (e.target.parentNode.id === `${windowId}-bar`) {
        setIsDragging(true);
        const dragElement = e.target.parentNode.parentNode;
        setClickPosition({
          x: e.clientX - dragElement.offsetLeft,
          y: e.clientY - dragElement.offsetTop,
        });
      }
    },
    [windowId],
  );

  const onMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
    }
  }, [isDragging]);

  const addEventListeners = useCallback(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
  }, [onMouseUp, onMouseMove, onMouseDown]);

  const removeEventListeners = useCallback(() => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mousedown', onMouseDown);
    document.removeEventListener('mouseup', onMouseUp);
  }, [onMouseUp, onMouseMove, onMouseDown]);

  useEffect(() => {
    addEventListeners();
    return () => removeEventListeners();
  }, [addEventListeners, removeEventListeners]);

  return (
    <div
      id={`${windowId}`}
      style={{
        top: position.y,
        left: position.x,
      }}
      className={`
        z-10
        shadow-retro
        max-h-screen
        absolute
        backdrop-blur-md
        overflow-hidden
        border-teal-500
        border-2 
        max-w-full
        lg:max-w-screen-lg
        2xl:max-w-screen-xl
      `}
    >
      <div
        id={`${windowId}-bar`}
        className="grid grid-cols-3 px-2 items-center bg-slate-600/75 backdrop-blur-med text-white"
      >
        <div className="flex justify-start">
          <button
            aria-label={onClose ? 'Close window button' : 'Back button'}
            id={`${windowId}-close-button`}
            className="text-red-700 p-2 lg:p-1 rounded-full bg-red-700 my-1"
            onClick={onClose ? onClose : () => navigate(-1)}
          >
            <SVG
              src={onClose ? '/icons/close-icon.svg' : '/icons/back-icon.svg'}
              height={15}
              width={15}
            />
          </button>
        </div>
        <div className="flex justify-center">
          <div className="border-b-2 border-double border-white w-20 " />
        </div>
        <div className="flex justify-end">
          <h3 className="font-heading text-xs truncate">{title}</h3>
        </div>
      </div>
      <div
        className={`
          overflow-y-auto
          max-h-[70vh]
          lg:max-h-[80vh]
          bg-white/75
          backdrop-blur-md 
        `}
      >
        {children}
      </div>
    </div>
  );
}
