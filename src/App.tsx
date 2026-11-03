import { useState } from 'react';
import './App.css';
import { WorkoutPanel } from './components/workout/WorkoutPanel';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import RoutineDetailPage from './features/routines/RoutineDetailPage';
import { ExerciseLibraryPage } from './pages/ExerciseLibraryPage';
import { useWorkoutStore } from './store/workoutStore';

function AppContent() {
  const [keyword, setKeyword] = useState('');
  const { theme, toggleTheme } = useTheme();
  const addToWorkout = useWorkoutStore((state) => state.addToWorkout);

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
            <span className="active-nav">Library</span>
            <span>Session</span>
            <span>Plans</span>
          </nav>

          <button type="button" className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? 'Dark mode' : 'Light mode'}
          </button>
        </header>

        <main className="app-layout">
          <ExerciseLibraryPage
            keyword={keyword}
            onKeywordChange={(event) => setKeyword(event.target.value)}
            onAddToWorkout={addToWorkout}
          />

          <aside className="right-stack">
            <WorkoutPanel />
            <RoutineDetailPage />
          </aside>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
