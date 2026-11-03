import { memo, useMemo } from 'react';
import { FixedSizeList } from 'react-window';
import type { Exercise } from '../../types';
import { ExerciseRow, type ExerciseRowData } from './ExerciseRow';

export type ExerciseListProps = {
  exercises: Exercise[];
  onStart: (exercise: Exercise) => void;
  onSave: (exercise: Exercise) => void;
  onAddToWorkout: (exercise: Exercise) => void;
};

const LIST_HEIGHT = 560;
const ROW_HEIGHT = 56;

export const ExerciseList = memo(function ExerciseList({
  exercises,
  onStart,
  onSave,
  onAddToWorkout,
}: ExerciseListProps) {
  const itemData = useMemo<ExerciseRowData>(
    () => ({
      exercises,
      onStart,
      onSave,
      onAddToWorkout,
    }),
    [exercises, onStart, onSave, onAddToWorkout],
  );

  return (
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
  );
});

export default ExerciseList;
