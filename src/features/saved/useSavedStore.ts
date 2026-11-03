import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Exercise } from '../../types';

type SavedState = {
  saved: Exercise[];
  toggleSaved: (exercise: Exercise) => void;
  removeSaved: (exerciseId: string) => void;
};

export const useSavedStore = create<SavedState>()(
  persist(
    (set) => ({
      saved: [],
      toggleSaved: (exercise) =>
        set((state) => ({
          saved: state.saved.some((item) => item.id === exercise.id)
            ? state.saved.filter((item) => item.id !== exercise.id)
            : [...state.saved, exercise],
        })),
      removeSaved: (exerciseId) =>
        set((state) => ({
          saved: state.saved.filter((item) => item.id !== exerciseId),
        })),
    }),
    {
      name: 'workout-saved-store',
    },
  ),
);
