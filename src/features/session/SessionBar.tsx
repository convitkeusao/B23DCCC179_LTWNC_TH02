import { CountdownBar } from './CountdownBar';
import { useSessionStore } from './useSessionStore';

export function SessionBar() {
  const queue = useSessionStore((state) => state.queue);
  const currentIndex = useSessionStore((state) => state.currentIndex);
  const isRunning = useSessionStore((state) => state.isRunning);
  const elapsed = useSessionStore((state) => state.elapsed);
  const toggleRun = useSessionStore((state) => state.toggleRun);
  const next = useSessionStore((state) => state.next);
  const prev = useSessionStore((state) => state.prev);

  const activeExercise = queue[currentIndex] ?? null;

  return (
    <footer className="session-bottom-bar">
      <div className="session-bar-inner">
        <div className="session-status">
          <span className="session-badge">{isRunning ? 'Đang tập' : 'Chưa bắt đầu'}</span>
          <strong>{activeExercise ? activeExercise.name : 'Không có bài tập'}</strong>
          <small>{activeExercise ? activeExercise.trainer : 'Hãy thêm bài tập'}</small>
        </div>

        <CountdownBar />

        <div className="session-controls-row">
          <button type="button" className="ghost-button" onClick={prev}>Trước</button>
          <button type="button" className="primary-button" onClick={toggleRun}>
            {isRunning ? 'Tạm dừng' : 'Bắt đầu'}
          </button>
          <button type="button" className="ghost-button" onClick={next}>Sau</button>
        </div>
      </div>

      {queue.length > 0 && (
        <div className="session-queue">
          {queue.map((item, index) => (
            <span key={item.id} className={index === currentIndex ? 'queue-item active' : 'queue-item'}>
              {index + 1}
            </span>
          ))}
        </div>
      )}

      <div className="session-footer-meta">
        <span>Số bài: {queue.length}</span>
        <span>Giây hiện tại: {elapsed}</span>
      </div>
    </footer>
  );
}

export default SessionBar;
