import { useState } from 'react';
import './App.css';
import { ExerciseLibraryPage } from './pages/ExerciseLibraryPage';

function App() {
  const [keyword, setKeyword] = useState('');

  return (
    <div className="app-shell">
      <ExerciseLibraryPage
        keyword={keyword}
        onKeywordChange={(event) => setKeyword(event.target.value)}
      />
    </div>
  );
}

export default App;
