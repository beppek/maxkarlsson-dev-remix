import { useNavigate } from '@remix-run/react';
import type { ReactElement} from 'react';
import { useContext } from 'react';
import { useMemo } from 'react';
import { useCallback, useEffect, useReducer } from 'react';
import { WindowContext } from '~/state/window-context';
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

interface Coordinates {
  x: number;
  y: number;
}

interface State {
  position: Coordinates;
  isDragging: boolean;
  zIndex: number;
}

enum Actions {
  setPosition = 'setPosition',
  setIsDragging = 'setIsDragging',
  setZIndex = 'setZIndex',
}

type Payload = Coordinates | boolean | number;

interface Action {
  type: Actions;
  payload: Payload;
}

type ActionFunction = (state: State, payload: Payload) => State;

const actions: Record<Actions, ActionFunction> = {
  setPosition: (state: State, payload: Payload) => {
    return {
      ...state,
      position: payload as Coordinates,
    };
  },
  setIsDragging: (state: State, payload: Payload) => {
    return {
      ...state,
      isDragging: payload as boolean,
    };
  },
  setZIndex: (state: State, payload: Payload) => {
    return {
      ...state,
      zIndex: (payload as number) + 10,
    };
  }
}

const clickPosition = { x: 30, y: 30 }

const initialState = {
  position: { x: 30, y: 30 },
  isDragging: false,
  zIndex: 10,
}

function reducer(state: State, action: Action) {
  return actions[action.type](state, action.payload);
}

export function Window({ children, onClose, title }: WindowProps) {
  const { state: {openWindows}, actions: {handleOpenWindow, handleSelectWindow, findWindowIndex, handleCloseWindow}} = useContext(WindowContext);
  const [state, dispatch] = useReducer(reducer, initialState)

  const windowId = useMemo(() => generateWindowId(title), [title]);

  const navigate = useNavigate();

  useEffect(() => {
    const newZIndex = findWindowIndex(windowId);
    dispatch({ type: Actions.setZIndex, payload: newZIndex });
  }, [findWindowIndex, openWindows.length, windowId])

  useEffect(() => {
    const windowElement = document.getElementById(`${windowId}`);
    const scrollbarOffset =
      (windowElement?.offsetWidth || 0) - (windowElement?.clientWidth || 0);

    const newZIndex = handleOpenWindow(windowId)
    dispatch({ type: Actions.setZIndex, payload: newZIndex });
    dispatch({type: Actions.setPosition, payload: {
      x:
        window.innerWidth / 2 -
        ((windowElement?.offsetWidth || 2) + scrollbarOffset * 4) / 2,
      y: window.innerHeight / 2 - (windowElement?.offsetHeight || 2) / 2 - 20,
    }});
  // disable exhaustive deps because it causes infinite loop
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowId]);

  const onMouseMove = useCallback(
    (e: any) => {
      if (state.isDragging) {
        dispatch({type: Actions.setPosition, payload: {
          x: e.clientX - clickPosition.x,
          y: e.clientY - clickPosition.y,
        }});
      }
    },
    [state.isDragging],
  );

  const onMouseDown = useCallback(
    (e: any) => {
      e.stopPropagation()
      console.log('windowId :>> ', windowId);
      if (e.target.id === `${windowId}-close-button`) return;
      if (e.target?.id === `${windowId}-bar`) {
        dispatch({type: Actions.setIsDragging, payload: true})
        const dragElement = e.target.parentNode;
        clickPosition.x = e.clientX - dragElement.offsetLeft;
        clickPosition.y = e.clientY - dragElement.offsetTop;
      } else if (e.target.parentNode.id === `${windowId}-bar`) {
        dispatch({type: Actions.setIsDragging, payload: true});
        const dragElement = e.target.parentNode.parentNode;
        clickPosition.x = e.clientX - dragElement.offsetLeft;
        clickPosition.y = e.clientY - dragElement.offsetTop;
      }
      console.log('e.target :>> ', e.target);
      const newZIndex = handleSelectWindow(windowId);
      dispatch({ type: Actions.setZIndex, payload: newZIndex });
    },
    [windowId, handleSelectWindow],
  );

  const onMouseUp = useCallback(() => {
    if (state.isDragging) {
      dispatch({type: Actions.setIsDragging, payload: false});
    }
  }, [state.isDragging]);

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

  const handleClickClose = useCallback(() => {
    handleCloseWindow(windowId);
    if (onClose) onClose();
    else navigate(-1);
  }, [onClose, windowId, handleCloseWindow, navigate]);

  return (
    <div
      id={`${windowId}`}
      style={{
        top: state.position.y,
        left: state.position.x,
        zIndex: state.zIndex,
      }}
      className={`
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
            onClick={handleClickClose}
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
