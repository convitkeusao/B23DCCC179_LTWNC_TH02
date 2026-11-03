import { Navigate, useParams } from 'react-router-dom';
import { EXERCISES } from '../../data/exercises';
import { useRoutineDispatch, useRoutines } from '../../contexts/RoutineContext';
import { useSessionStore } from '../session/useSessionStore';

export default function RoutineDetailPage() {
  const { id } = useParams();
  const routines = useRoutines();
  const dispatch = useRoutineDispatch();
  const startSession = useSessionStore((state) => state.startSession);

  const routine = routines.find((item) => item.id === id);

  if (!routine) {
    return <Navigate to="/routines" replace />;
  }

  const items = EXERCISES.filter((exercise) => routine.exerciseIds.includes(exercise.id));
  const totalSeconds = items.reduce((sum, exercise) => sum + exercise.duration, 0);

  return (
    <section className="library-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">WORKOUT TIMER</p>
          <h1>{routine.name}</h1>
        </div>
        <span className="build-tag">{items.length} bài tập</span>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">Không tìm thấy giáo án.</div>
      ) : (
        <div className="routine-detail-body">
          {items.map((exercise) => (
            <div key={exercise.id} className="saved-item">
              <div>
                <strong>{exercise.name}</strong>
                <span>{exercise.trainer}</span>
              </div>
              <span>{exercise.group}</span>
              <span>{Math.floor(exercise.duration / 60)}:{String(exercise.duration % 60).padStart(2, '0')}</span>
              <button
                type="button"
                onClick={() =>
                  dispatch({ type: 'removeExercise', payload: { id: routine.id, exerciseId: exercise.id } })
                }
              >
                Bỏ bài
              </button>
            </div>
          ))}
          <div className="routine-footer">
            <strong>Tổng thời gian: {Math.floor(totalSeconds / 60)} phút {totalSeconds % 60} giây</strong>
            <button
              type="button"
              onClick={() => startSession(items)}
            >
              Tập tất cả
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
