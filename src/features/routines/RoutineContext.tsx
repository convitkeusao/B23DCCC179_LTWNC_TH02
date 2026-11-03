import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import { initialRoutineState, routineReducer, type RoutineAction, type RoutineItem, type RoutineState } from './routineReducer';

type RoutineContextValue = {
  routine: RoutineState;
  dispatch: React.Dispatch<RoutineAction>;
  addItem: (item: RoutineItem) => void;
  removeItem: (id: string) => void;
};

const RoutineContext = createContext<RoutineContextValue | null>(null);

export function RoutineProvider({ children }: { children: ReactNode }) {
  const [routine, dispatch] = useReducer(routineReducer, initialRoutineState);

  const value = useMemo<RoutineContextValue>(
    () => ({
      routine,
      dispatch,
      addItem: (item) => dispatch({ type: 'add-item', payload: item }),
      removeItem: (id) => dispatch({ type: 'remove-item', payload: id }),
    }),
    [routine],
  );

  return <RoutineContext.Provider value={value}>{children}</RoutineContext.Provider>;
}

export function useRoutineContext() {
  const context = useContext(RoutineContext);

  if (!context) {
    throw new Error('useRoutineContext must be used inside RoutineProvider');
  }

  return context;
}
