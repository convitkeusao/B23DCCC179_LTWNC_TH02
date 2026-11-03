import { useEffect } from 'react';
import { useSessionStore } from './useSessionStore';

export function CountdownBar() {
  const queue = useSessionStore((state) => state.queue);
  const currentIndex = useSessionStore((state) => state.currentIndex);
  const elapsed = useSessionStore((state) => state.elapsed);
  const isRunning = useSessionStore((state) => state.isRunning);
  const tick = useSessionStore((state) => state.tick);

  const activeExercise = queue[currentIndex] ?? null;
  const totalSeconds = activeExercise?.duration ?? 0;
  const remainingSeconds = Math.max(0, totalSeconds - elapsed);
  const progress = totalSeconds > 0 ? Math.min((elapsed / totalSeconds) * 100, 100) : 0;

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
    <div className="countdown-panel">
      <div className="countdown-topline">
        <span>Còn lại</span>
        <strong>{remainingSeconds}s</strong>
      </div>
      <div className="countdown-progress">
        <span style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

export default CountdownBar;
