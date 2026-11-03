import { useState } from 'react';
import { ExerciseLibraryPage } from '../../pages/ExerciseLibraryPage';
import { useSessionStore } from '../session/useSessionStore';

export default function LibraryPage() {
  const [keyword, setKeyword] = useState('');
  const addToWorkout = useSessionStore((state) => state.addToSession);

  return (
    <ExerciseLibraryPage
      keyword={keyword}
      onKeywordChange={(event) => setKeyword(event.target.value)}
      onAddToWorkout={addToWorkout}
    />
  );
}
