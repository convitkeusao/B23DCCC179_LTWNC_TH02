import { memo, useCallback } from 'react';
import type { ListChildComponentProps } from 'react-window';
import type { Exercise } from '../../types';
import { formatDuration } from '../../utils/format';

export type ExerciseRowData = {
  exercises: Exercise[];
  onStart: (exercise: Exercise) => void;
  onSave: (exercise: Exercise) => void;
  onAddToWorkout: (exercise: Exercise) => void;
};

const ExerciseRowComponent = ({ index, style, data }: ListChildComponentProps<ExerciseRowData>) => {
  const exercise = data.exercises[index];

  const handleStart = useCallback(() => {
    data.onStart(exercise);
  }, [data, exercise]);

  const handleSave = useCallback(() => {
    data.onSave(exercise);
  }, [data, exercise]);

  const handleAddToWorkout = useCallback(() => {
    data.onAddToWorkout(exercise);
  }, [data, exercise]);

  if (!exercise) {
    return null;
  }

  return (
    <div className="exercise-row" style={style}>
      <span className="exercise-index">{index + 1}</span>

      <div className="exercise-main">
        <span className="exercise-name">{exercise.name}</span>
        <span className="exercise-meta">
          {exercise.trainer} · {exercise.group}
        </span>
      </div>

      <span className="exercise-duration">{formatDuration(exercise.duration)}</span>

      <div className="exercise-actions">
        <button type="button" onClick={handleStart}>
          BĐ
        </button>
        <button
          type="button"
          className="icon-button"
          onClick={handleSave}
          aria-label={`Lưu ${exercise.name}`}
        >
          ☆
        </button>
        <button
          type="button"
          className="icon-button"
          onClick={handleAddToWorkout}
          aria-label={`Thêm ${exercise.name} vào buổi tập`}
        >
          + Buổi tập
        </button>
      </div>
    </div>
  );
};

export const ExerciseRow = memo(ExerciseRowComponent);
export default ExerciseRow;
