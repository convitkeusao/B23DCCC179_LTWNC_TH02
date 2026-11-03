import { useRoutineContext, RoutineProvider } from './RoutineContext';
import { withLogger } from './withLogger';

function RoutinesPageInner() {
  const { routine, removeItem } = useRoutineContext();

  return (
    <section className="workout-panel">
      <h2>Danh sách giáo án</h2>

      {routine.items.length === 0 ? (
        <p className="empty-session">Chưa có bài tập trong giáo án.</p>
      ) : (
        <ul className="session-list">
          {routine.items.map((item) => (
            <li key={item.id} className="session-item">
              <div className="session-item-main">
                <strong>{item.name}</strong>
                <span>{item.duration}s</span>
              </div>
              <button type="button" onClick={() => removeItem(item.id)}>
                Xóa
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

const LoggedRoutinesPage = withLogger(RoutinesPageInner, 'RoutinesPage');

export default function RoutinesPage() {
  return (
    <RoutineProvider>
      <LoggedRoutinesPage />
    </RoutineProvider>
  );
}
