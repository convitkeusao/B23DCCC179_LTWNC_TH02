import { useState } from 'react';
import './App.css';
import { WorkoutPanel } from './components/workout/WorkoutPanel';
import { AppProvider, useAppContext } from './context/AppContext';
import { ExerciseLibraryPage } from './pages/ExerciseLibraryPage';
import { useWorkoutStore } from './store/workoutStore';

function AppContent() {
  const [keyword, setKeyword] = useState('');
  const { theme, toggleTheme } = useAppContext();
  const addToWorkout = useWorkoutStore((state) => state.addToWorkout);

  return (
    <div className={`app-shell ${theme}`}>
      <div className="app-topbar">
        <div className="app-topbar-left">
          <button type="button" className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? 'Tối' : 'Sáng'}
          </button>
        </div>

      </div>

      <div className="app-layout">
        <ExerciseLibraryPage
          keyword={keyword}
          onKeywordChange={(event) => setKeyword(event.target.value)}
          onAddToWorkout={addToWorkout}
        />
        <WorkoutPanel />
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
