import { Suspense, lazy } from 'react';
import { BrowserRouter, NavLink, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { SessionBar } from './features/session/SessionBar';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { RoutineProvider } from './contexts/RoutineContext';

const LibraryPage = lazy(() => import('./features/library/LibraryPage'));
const SavedPage = lazy(() => import('./features/saved/SavedPage'));
const RoutinesPage = lazy(() => import('./features/routines/RoutinesPage'));
const RoutineDetailPage = lazy(() => import('./features/routines/RoutineDetailPage'));

function AppShell() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`app-shell ${theme}`}>
      <div className="app-frame">
        <header className="app-topbar">
          <div className="app-topbar-left">
            <span className="brand-mark">W</span>
            <div className="brand-copy">
              <strong>Workout Timer</strong>
              <small>Routine board</small>
            </div>
          </div>

          <nav className="topbar-nav" aria-label="Main navigation">
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active-nav' : '')}>
              Kho bài tập
            </NavLink>
            <NavLink to="/saved" className={({ isActive }) => (isActive ? 'active-nav' : '')}>
              Đã lưu
            </NavLink>
            <NavLink to="/routines" className={({ isActive }) => (isActive ? 'active-nav' : '')}>
              Giáo án
            </NavLink>
          </nav>

          <button type="button" className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? 'Dark mode' : 'Light mode'}
          </button>
        </header>

        <main className="app-layout">
          <Suspense fallback={<div className="page-loading">Đang tải trang...</div>}>
            <Routes>
              <Route path="/" element={<LibraryPage />} />
              <Route path="/saved" element={<SavedPage />} />
              <Route path="/routines" element={<RoutinesPage />} />
              <Route path="/routines/:id" element={<RoutineDetailPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>

        <SessionBar />
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <RoutineProvider>
          <AppShell />
        </RoutineProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
