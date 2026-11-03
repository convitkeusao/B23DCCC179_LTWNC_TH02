import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import {
  initialRoutineState,
  routineReducer,
  type Routine,
  type RoutineAction,
} from '../features/routines/routineReducer';
import { withLogger } from '../features/routines/withLogger';

const STORAGE_KEY = 'workout-routines';

const RoutineStateContext = createContext<Routine[] | null>(null);
const RoutineDispatchContext = createContext<React.Dispatch<RoutineAction> | null>(null);

function readInitialState(): Routine[] {
  if (typeof window === 'undefined') {
    return initialRoutineState;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return initialRoutineState;
    }

    const parsed = JSON.parse(raw) as Routine[];
    return Array.isArray(parsed) ? parsed : initialRoutineState;
  } catch {
    return initialRoutineState;
  }
}

export function RoutineProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(withLogger(routineReducer), readInitialState());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const stateValue = useMemo(() => state, [state]);
  const dispatchValue = useMemo(() => dispatch, [dispatch]);

  return (
    <RoutineStateContext.Provider value={stateValue}>
      <RoutineDispatchContext.Provider value={dispatchValue}>{children}</RoutineDispatchContext.Provider>
    </RoutineStateContext.Provider>
  );
}

export function useRoutines(): Routine[] {
  const context = useContext(RoutineStateContext);
  if (!context) {
    throw new Error('useRoutines must be used inside RoutineProvider');
  }
  return context;
}

export function useRoutineDispatch(): React.Dispatch<RoutineAction> {
  const context = useContext(RoutineDispatchContext);
  if (!context) {
    throw new Error('useRoutineDispatch must be used inside RoutineProvider');
  }
  return context;
}

export { RoutineStateContext, RoutineDispatchContext };
