import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';

export type ThemeMode = 'light' | 'dark';

type AppState = {
  theme: ThemeMode;
};

type AppAction =
  | { type: 'toggle-theme' }
  | { type: 'set-theme'; payload: ThemeMode };

type AppContextValue = AppState & {
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
};

const STORAGE_KEY = 'workout-timer.theme';

const readTheme = (): ThemeMode => {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const savedTheme = window.localStorage.getItem(STORAGE_KEY);
  return savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : 'light';
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'toggle-theme':
      return { theme: state.theme === 'light' ? 'dark' : 'light' };
    case 'set-theme':
      return { theme: action.payload };
    default:
      return state;
  }
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, { theme: readTheme() });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, state.theme);
    document.documentElement.dataset.theme = state.theme;
  }, [state.theme]);

  const value = useMemo<AppContextValue>(
    () => ({
      ...state,
      toggleTheme: () => dispatch({ type: 'toggle-theme' }),
      setTheme: (theme: ThemeMode) => dispatch({ type: 'set-theme', payload: theme }),
    }),
    [state],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used inside AppProvider');
  }

  return context;
}
