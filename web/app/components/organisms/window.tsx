import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { useCallback, useEffect, useState } from 'react';

interface WindowProps {
  children: ReactElement | ReactElement[] | string;
  onClose: () => void;
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

  useEffect(() => {
    const windowElement = document.getElementById(`${windowId}`);
    const scrollbarOffset =
      (windowElement?.offsetWidth || 0) - (windowElement?.scrollWidth || 0);
    setPosition({
      x:
        window.innerWidth / 2 -
        ((windowElement?.offsetWidth || 2) + scrollbarOffset * 4) / 2,
      y: window.innerHeight / 2 - (windowElement?.offsetHeight || 2) / 2,
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
        max-h-screen
        absolute
        left-1/2
        backdrop-blur-md
        shadow-md 
        rounded-lg 
        border-[1px] 
        border-slate-600
        bg-slate-600
        overflow-hidden
      `}
    >
      <div
        id={`${windowId}-bar`}
        className="flex justify-between px-1 items-center bg-slate-600 text-white"
      >
        <button
          aria-label="Close window button"
          id={`${windowId}-close-button`}
          className="text-red-700 p-2 rounded-full bg-red-700"
          onClick={onClose}
        ></button>
        <h3>{title}</h3>
      </div>
      <div
        className={`
          overflow-y-auto
          max-h-[80vh]
          py-2 
          px-4
          bg-slate-100/75
          backdrop-blur-md 
        `}
      >
        {children}
      </div>
    </div>
  );
}
