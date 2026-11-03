import { useSessionStore } from './useSessionStore';

export default function CountdownBar() {
  const activeExerciseId = useSessionStore((state) => state.activeExerciseId);
  const elapsedSeconds = useSessionStore((state) => state.elapsedSeconds);
  const workout = useSessionStore((state) => state.workout);

  const activeExercise = workout.find((item) => item.id === activeExerciseId) ?? null;
  const totalSeconds = activeExercise?.duration ?? 0;
  const remainingSeconds = Math.max(0, totalSeconds - elapsedSeconds);

  return (
    <div className="session-summary">
      <div>
        <span className="label">Hiện tại</span>
        <strong>{activeExercise?.name ?? 'Không có bài tập'}</strong>
      </div>
      <div>
        <span className="label">Còn lại</span>
        <strong>{remainingSeconds}s</strong>
      </div>
    </div>
  );
}
