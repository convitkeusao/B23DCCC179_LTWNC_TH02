import { useSessionStore } from './useSessionStore';

export default function SessionBar() {
  const workout = useSessionStore((state) => state.workout);
  const activeExerciseId = useSessionStore((state) => state.activeExerciseId);
  const isRunning = useSessionStore((state) => state.isRunning);

  return (
    <section className="workout-panel">
      <div className="session-header">
        <h2>Buổi tập</h2>
        <span>{isRunning ? 'Đang chạy' : 'Tạm dừng'}</span>
      </div>

      {workout.length === 0 ? (
        <p className="empty-session">Chưa có bài tập nào được thêm.</p>
      ) : (
        <div className="session-list">
          {workout.map((item) => (
            <div
              key={item.id}
              className={`session-item ${activeExerciseId === item.id ? 'is-active' : ''}`}
            >
              <div className="session-item-main">
                <strong>{item.name}</strong>
                <span>{item.trainer}</span>
              </div>
              <span className="session-item-meta">{item.duration}s</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
