import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { EXERCISES } from '../../data/exercises';
import { useRoutines, useRoutineDispatch } from '../../contexts/RoutineContext';
import { useSessionStore } from '../session/useSessionStore';

export default function RoutinesPage() {
  const routines = useRoutines();
  const dispatch = useRoutineDispatch();
  const startSession = useSessionStore((state) => state.startSession);
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleCreate = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Tên giáo án không được để trống');
      return;
    }

    if (routines.some((routine) => routine.name.toLowerCase() === trimmed.toLowerCase())) {
      setError('Tên giáo án đã tồn tại');
      return;
    }

    dispatch({ type: 'createRoutine', payload: { id: crypto.randomUUID(), name: trimmed } });
    setName('');
    setError('');
  };

  const totalMinutes = useMemo(
    () => routines.reduce((sum, routine) => sum + routine.exerciseIds.length, 0),
    [routines],
  );

  return (
    <section className="library-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">WORKOUT TIMER</p>
          <h1>Danh sách giáo án</h1>
        </div>
        <span className="build-tag">{routines.length} giáo án</span>
      </div>

      <div className="routine-form">
        <input
          aria-label="Tên giáo án"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Nhập tên giáo án"
        />
        <button type="button" onClick={handleCreate}>Tạo giáo án</button>
      </div>

      {error && <p className="form-message">{error}</p>}

      {routines.length === 0 ? (
        <div className="empty-state">Chưa có giáo án nào.</div>
      ) : (
        <div className="routine-list">
          {routines.map((routine) => {
            const routineExercises = EXERCISES.filter((exercise) => routine.exerciseIds.includes(exercise.id));
            const totalSeconds = routineExercises.reduce((sum, exercise) => sum + exercise.duration, 0);

            return (
              <div key={routine.id} className="routine-card">
                <div>
                  <h3>{routine.name}</h3>
                  <span>{routine.exerciseIds.length} bài tập</span>
                </div>
                <div className="routine-actions">
                  <Link to={`/routines/${routine.id}`}>Chi tiết</Link>
                  <button type="button" onClick={() => dispatch({ type: 'removeRoutine', payload: routine.id })}>Xóa</button>
                  <button
                    type="button"
                    onClick={() => {
                      const exercises = EXERCISES.filter((exercise) => routine.exerciseIds.includes(exercise.id));
                      startSession(exercises);
                    }}
                  >
                    Tập tất cả
                  </button>
                </div>
                <small>
                  {Math.floor(totalSeconds / 60)} phút {totalSeconds % 60} giây
                </small>
              </div>
            );
          })}
        </div>
      )}

      <div className="summary-box">Tổng số bài: {totalMinutes}</div>
    </section>
  );
}
