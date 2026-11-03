import { create } from 'zustand';
import type { Exercise } from '../../types';

export type SessionState = {
  queue: Exercise[];
  currentIndex: number;
  isRunning: boolean;
  elapsed: number;
  startSession: (exercises: Exercise[], startIndex?: number) => void;
  toggleRun: () => void;
  next: () => void;
  prev: () => void;
  addToSession: (exercise: Exercise) => void;
  tick: () => void;
  reset: () => void;
};

export const useSessionStore = create<SessionState>((set, get) => ({
  queue: [],
  currentIndex: -1,
  isRunning: false,
  elapsed: 0,
  startSession: (exercises, startIndex = 0) => {
    const safeIndex = exercises.length > 0 ? Math.min(Math.max(startIndex, 0), exercises.length - 1) : -1;
    set({
      queue: exercises,
      currentIndex: safeIndex,
      elapsed: 0,
      isRunning: exercises.length > 0,
    });
  },
  toggleRun: () => {
    set((state) => ({
      isRunning: state.queue.length > 0 ? !state.isRunning : false,
    }));
  },
  next: () => {
    const { queue, currentIndex } = get();
    if (queue.length === 0) {
      set({ isRunning: false, currentIndex: -1, elapsed: 0 });
      return;
    }

    const nextIndex = currentIndex + 1;
    if (nextIndex >= queue.length) {
      set({ isRunning: false, currentIndex: queue.length - 1, elapsed: 0 });
      return;
    }

    set({ currentIndex: nextIndex, elapsed: 0, isRunning: true });
  },
  prev: () => {
    const { queue, currentIndex, elapsed } = get();
    if (queue.length === 0) {
      set({ currentIndex: -1, elapsed: 0, isRunning: false });
      return;
    }

    if (elapsed > 3) {
      set({ elapsed: 0 });
      return;
    }

    set({ currentIndex: Math.max(currentIndex - 1, 0), elapsed: 0, isRunning: true });
  },
  addToSession: (exercise) => {
    set((state) => ({
      queue: state.queue.some((item) => item.id === exercise.id) ? state.queue : [...state.queue, exercise],
      currentIndex: state.queue.length === 0 && state.currentIndex === -1 ? 0 : state.currentIndex,
    }));
  },
  tick: () => {
    const { queue, currentIndex, elapsed, isRunning } = get();

    if (!isRunning || currentIndex < 0 || currentIndex >= queue.length) {
      return;
    }

    const currentExercise = queue[currentIndex];
    if (!currentExercise) {
      return;
    }

    const nextElapsed = elapsed + 1;

    if (nextElapsed >= currentExercise.duration) {
      const nextIndex = currentIndex + 1;
      if (nextIndex < queue.length) {
        set({ elapsed: 0, currentIndex: nextIndex, isRunning: true });
        return;
      }

      set({ elapsed: currentExercise.duration, isRunning: false });
      return;
    }

    set({ elapsed: nextElapsed });
  },
  reset: () => {
    set({ queue: [], currentIndex: -1, isRunning: false, elapsed: 0 });
  },
}));

export type SessionItem = Exercise;
