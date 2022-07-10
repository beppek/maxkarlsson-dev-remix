import type { ReactElement} from 'react';
import { useCallback} from 'react';
import {useReducer, createContext} from 'react'

interface State {
  openWindows: number[];
}

enum Actions {
  handleOpenWindow = 'handleOpenWindow',
  handleCloseWindow = 'handleCloseWindow',
  handleCloseAllWindows = 'handleCloseAllWindows',
  handleSelectWindow = 'handleSelectWindow',
}

interface Action {
  type: Actions;
  payload?: Payload;
}

interface ProviderMethods {
  handleOpenWindow: (windowId: number) => number;
  handleCloseWindow: (windowId: number) => void;
  handleCloseAllWindows: () => void;
  handleSelectWindow: (windowId: number) => number;
  findWindowIndex: (windowId: number) => number;
}

interface Props {
  children: ReactElement | ReactElement[];
}

const initialState = {
  openWindows: [],
}

export const WindowContext = createContext<{state: State, actions: ProviderMethods}>({
  state: initialState,
  actions: {} as ProviderMethods,
})

type Payload = any

type ActionFunction = (state: State, payload?: Payload) => State;

const actions: Record<Actions, ActionFunction> = {
  handleOpenWindow: (state: State, payload: Payload) => {
    const newOpenWindows = [...state.openWindows, payload.windowId];
    return {
      ...state,
      openWindows: newOpenWindows,
    }
  },
  handleCloseWindow: (state: State, payload: Payload) => {
    const newOpenWindows = state.openWindows.filter(windowId => windowId !== payload.windowId);
    return {
      ...state,
      openWindows: newOpenWindows,
    }
  },
  handleCloseAllWindows: (state: State) => {
    return {
      ...state,
      openWindows: [],
    }
  },
  handleSelectWindow: (state: State, payload: Payload) => {
    const newOpenWindows = state.openWindows.filter(windowId => windowId !== payload.windowId);
    newOpenWindows.push(payload.windowId);
    console.log('newOpenWindows :>> ', newOpenWindows);
    return {
      ...state,
      openWindows: newOpenWindows,
    }
  }
}

function reducer(state: State, action: Action): State {
  return actions[action.type](state, action.payload) || state;
}

export function WindowProvider({children}: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleOpenWindow = useCallback((windowId: number): number => {
    dispatch({type: Actions.handleOpenWindow, payload: {windowId}});
    return state.openWindows.length;
  }, [state])

  const handleCloseWindow = (windowId: number): void => {
    dispatch({type: Actions.handleCloseWindow, payload: {windowId}});
  }

  const handleCloseAllWindows = (): void => {
    dispatch({type: Actions.handleCloseAllWindows});
  }

  const handleSelectWindow = (windowId: number): number => {
    dispatch({type: Actions.handleSelectWindow, payload: {windowId}});
    return state.openWindows.length;
  }

  const findWindowIndex = (windowId: number): number => {
    return state.openWindows.indexOf(windowId);
  }

  return (
    <WindowContext.Provider
      value={{
        state,
        actions: {
          handleOpenWindow,
          handleCloseWindow,
          handleCloseAllWindows,
          handleSelectWindow,
          findWindowIndex
        }
      }}
    >
      {children}
    </WindowContext.Provider>
  )
}