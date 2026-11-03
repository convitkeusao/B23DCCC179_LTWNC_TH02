import { useEffect } from 'react';
import { formatDuration } from '../../utils/format';
import { useWorkoutStore } from '../../store/workoutStore';

export function WorkoutPanel() {
  const workout = useWorkoutStore((state) => state.workout);
  const activeExerciseId = useWorkoutStore((state) => state.activeExerciseId);
  const isRunning = useWorkoutStore((state) => state.isRunning);
  const elapsedSeconds = useWorkoutStore((state) => state.elapsedSeconds);
  const totalSeconds = useWorkoutStore((state) => state.totalSeconds);
  const toggleRunning = useWorkoutStore((state) => state.toggleRunning);
  const clearWorkout = useWorkoutStore((state) => state.clearWorkout);
  const removeExercise = useWorkoutStore((state) => state.removeExercise);
  const advanceToNext = useWorkoutStore((state) => state.advanceToNext);
  const tick = useWorkoutStore((state) => state.tick);

  const activeExercise = workout.find((exercise) => exercise.id === activeExerciseId) ?? workout[0] ?? null;

  useEffect(() => {
    if (!isRunning) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      tick();
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isRunning, tick]);

  return (
    <aside className="workout-panel">
      <div className="session-header">
        <h2>Buổi tập hiện tại</h2>
        <button type="button" onClick={clearWorkout} className="ghost-button">
          Xóa
        </button>
      </div>

      <div className="session-summary">
        <div>
          <span className="label">Tổng thời lượng</span>
          <strong>{formatDuration(totalSeconds)}</strong>
        </div>
        <div>
          <span className="label">Hiện tại</span>
          <strong>{activeExercise ? activeExercise.name : 'Chưa có bài tập'}</strong>
        </div>
      </div>

      <div className="session-timer">
        <span>{formatDuration(elapsedSeconds)}</span>
      </div>

      <div className="session-controls">
        <button type="button" className="primary-button" onClick={toggleRunning}>
          {isRunning ? 'Tạm dừng' : 'Bắt đầu'}
        </button>
        <button type="button" className="secondary-button" onClick={advanceToNext}>
          Bài tiếp
        </button>
      </div>

      <div className="session-list">
        {workout.length === 0 ? (
          <p className="empty-session">Chưa có bài tập nào trong buổi tập.</p>
        ) : (
          workout.map((exercise) => (
            <div
              key={exercise.id}
              className={`session-item ${exercise.id === activeExerciseId ? 'is-active' : ''}`}
            >
              <div className="session-item-main">
                <strong>{exercise.name}</strong>
                <span>{exercise.trainer}</span>
              </div>
              <div className="session-item-meta">
                <span>{exercise.group}</span>
                <span>{formatDuration(exercise.duration)}</span>
              </div>
              <button type="button" className="remove-button" onClick={() => removeExercise(exercise.id)}>
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}

export default WorkoutPanel;
