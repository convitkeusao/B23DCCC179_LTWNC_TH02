import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SavedState = {
  ids: string[];
  toggle: (id: string) => void;
  isSaved: (id: string) => boolean;
  clear: () => void;
};

export const useSavedStore = create<SavedState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set((state) => ({
          ids: state.ids.includes(id) ? state.ids.filter((item) => item !== id) : [...state.ids, id],
        })),
      isSaved: (id) => get().ids.includes(id),
      clear: () => set({ ids: [] }),
    }),
    {
      name: 'workout-saved',
    },
  ),
);

export const useSavedExercises = () => {
  const savedIds = useSavedStore((state) => state.ids);
  return savedIds;
};
