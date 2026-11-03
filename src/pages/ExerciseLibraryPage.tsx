import { useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';
import { ExerciseFilters } from '../components/exercises/ExerciseFilters';
import { ExerciseList } from '../components/exercises/ExerciseList';
import { EXERCISES } from '../data/exercises';
import { useSavedStore } from '../features/saved/useSavedStore';
import { useDebounce } from '../hooks/useDebounce';
import type { Exercise, MuscleGroup } from '../types';

export type SortMode = 'default' | 'name' | 'duration';

export type ExerciseLibraryPageProps = {
  keyword: string;
  onKeywordChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onAddToWorkout: (exercise: Exercise) => void;
};

export function ExerciseLibraryPage({
  keyword,
  onKeywordChange,
  onAddToWorkout,
}: ExerciseLibraryPageProps) {
  const [group, setGroup] = useState<'Tất cả' | MuscleGroup>('Tất cả');
  const [sortMode, setSortMode] = useState<SortMode>('default');
  const savedExercises = useSavedStore((state) => state.saved);
  const toggleSaved = useSavedStore((state) => state.toggleSaved);
  const savedIds = useMemo(() => savedExercises.map((item) => item.id), [savedExercises]);
  const debouncedKeyword = useDebounce(keyword, 150);

  const filteredExercises = useMemo(() => {
    const normalizedKeyword = debouncedKeyword.trim().toLowerCase();
    const nextList = EXERCISES.filter((exercise: Exercise) => {
      const matchesKeyword =
        !normalizedKeyword ||
        exercise.name.toLowerCase().includes(normalizedKeyword) ||
        exercise.trainer.toLowerCase().includes(normalizedKeyword);
      const matchesGroup = group === 'Tất cả' || exercise.group === group;

      return matchesKeyword && matchesGroup;
    });

    const sortedList = [...nextList];

    if (sortMode === 'name') {
      sortedList.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
    } else if (sortMode === 'duration') {
      sortedList.sort((left, right) => left.duration - right.duration);
    }

    return sortedList;
  }, [debouncedKeyword, group, sortMode]);

  const handleStart = (exercise: Exercise) => {
    console.log('Start:', exercise.id);
  };

  const handleSave = (exercise: Exercise) => {
    toggleSaved(exercise);
  };

  const handleAddToWorkout = (exercise: Exercise) => {
    onAddToWorkout(exercise);
  };

  return (
    <section className="library-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">WORKOUT TIMER</p>
          <h1>Kho bài tập</h1>
        </div>
        <span className="build-tag">{filteredExercises.length.toLocaleString()} bài tập</span>
      </div>

      <ExerciseFilters
        keyword={keyword}
        onKeywordChange={onKeywordChange}
        group={group}
        onGroupChange={setGroup}
        sortMode={sortMode}
        onSortChange={setSortMode}
      />

      <p className="result-summary">
        {filteredExercises.length === 0
          ? 'Không tìm thấy bài tập nào.'
          : `Tìm thấy ${filteredExercises.length} bài tập`}
      </p>

      {filteredExercises.length === 0 ? (
        <div className="empty-state">Không tìm thấy bài tập nào.</div>
      ) : (
        <ExerciseList
          exercises={filteredExercises}
          savedIds={savedIds}
          onStart={handleStart}
          onSave={handleSave}
          onAddToWorkout={handleAddToWorkout}
        />
      )}
    </section>
  );
}

export default ExerciseLibraryPage;
