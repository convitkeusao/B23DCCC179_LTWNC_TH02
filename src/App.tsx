import { useState } from 'react';
import './App.css';
import { WorkoutPanel } from './components/workout/WorkoutPanel';
import { ExerciseLibraryPage } from './pages/ExerciseLibraryPage';
import { useWorkoutStore } from './store/workoutStore';

function App() {
  const [keyword, setKeyword] = useState('');
  const addToWorkout = useWorkoutStore((state) => state.addToWorkout);

  return (
    <div className="app-shell">
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

export default App;
