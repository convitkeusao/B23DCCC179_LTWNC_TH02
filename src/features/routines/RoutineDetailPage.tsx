import { useRoutineContext, RoutineProvider } from './RoutineContext';

function RoutineDetailPageInner() {
  const { routine } = useRoutineContext();

  return (
    <section className="workout-panel">
      <h2>Chi tiết giáo án</h2>
      <p><strong>{routine.name}</strong></p>
      {routine.items.length === 0 ? (
        <p className="empty-session">Chưa có bài tập nào trong giáo án.</p>
      ) : (
        <ul className="session-list">
          {routine.items.map((item) => (
            <li key={item.id} className="session-item">
              <div className="session-item-main">
                <strong>{item.name}</strong>
                <span>{item.duration}s</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function RoutineDetailPage() {
  return (
    <RoutineProvider>
      <RoutineDetailPageInner />
    </RoutineProvider>
  );
}
