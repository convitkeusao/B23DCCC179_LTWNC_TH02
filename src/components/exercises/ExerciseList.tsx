import { memo, useMemo } from 'react';
import { FixedSizeList } from 'react-window';
import type { Exercise } from '../../types';
import { ExerciseRow, type ExerciseRowData } from './ExerciseRow';

export type ExerciseListProps = {
  exercises: Exercise[];
  savedIds: string[];
  onStart: (exercise: Exercise) => void;
  onSave: (exercise: Exercise) => void;
  onAddToWorkout: (exercise: Exercise) => void;
};

const LIST_HEIGHT = 560;
const ROW_HEIGHT = 56;

export const ExerciseList = memo(function ExerciseList({
  exercises,
  savedIds,
  onStart,
  onSave,
  onAddToWorkout,
}: ExerciseListProps) {
  const itemData = useMemo<ExerciseRowData>(
    () => ({
      exercises,
      savedIds: new Set(savedIds),
      onStart,
      onSave,
      onAddToWorkout,
    }),
    [exercises, onStart, onSave, onAddToWorkout, savedIds],
  );

  return (
    <div className="exercise-table">
      <div className="exercise-table-header">
        <span>#</span>
        <span>BÀI TẬP</span>
        <span>HUẤN LUYỆN VIÊN</span>
        <span>THỜI LƯỢNG</span>
        <span>THAO TÁC</span>
      </div>

      <div className="list-shell">
        <FixedSizeList
          height={LIST_HEIGHT}
          width="100%"
          itemCount={exercises.length}
          itemSize={ROW_HEIGHT}
          itemData={itemData}
          itemKey={(index, data) => data.exercises[index]?.id ?? `empty-${index}`}
        >
          {ExerciseRow}
        </FixedSizeList>
      </div>
    </div>
  );
});

export default ExerciseList;
