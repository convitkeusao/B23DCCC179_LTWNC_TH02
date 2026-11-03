import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Exercise } from '../types';

export type WorkoutItem = Exercise;

type WorkoutState = {
  workout: WorkoutItem[];
  activeExerciseId: string | null;
  isRunning: boolean;
  elapsedSeconds: number;
  totalSeconds: number;
  addToWorkout: (exercise: Exercise) => void;
  removeExercise: (exerciseId: string) => void;
  clearWorkout: () => void;
  startExercise: (exercise: Exercise) => void;
  toggleRunning: () => void;
  advanceToNext: () => void;
  tick: () => void;
};

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set, get) => ({
      workout: [],
      activeExerciseId: null,
      isRunning: false,
      elapsedSeconds: 0,
      totalSeconds: 0,

      addToWorkout: (exercise) => {
        set((state) => {
          if (state.workout.some((item) => item.id === exercise.id)) {
            return state;
          }

          const nextWorkout = [...state.workout, exercise];
          const nextActiveId = state.activeExerciseId ?? exercise.id;

          return {
            workout: nextWorkout,
            activeExerciseId: nextActiveId,
            totalSeconds: nextWorkout.reduce((sum, item) => sum + item.duration, 0),
          };
        });
      },

      removeExercise: (exerciseId) => {
        set((state) => {
          const nextWorkout = state.workout.filter((item) => item.id !== exerciseId);
          const nextActiveExercise = nextWorkout.find((item) => item.id === state.activeExerciseId) ?? nextWorkout[0] ?? null;

          return {
            workout: nextWorkout,
            activeExerciseId: nextActiveExercise ? nextActiveExercise.id : null,
            isRunning: nextActiveExercise ? state.isRunning : false,
            elapsedSeconds: nextActiveExercise ? state.elapsedSeconds : 0,
            totalSeconds: nextWorkout.reduce((sum, item) => sum + item.duration, 0),
          };
        });
      },

      clearWorkout: () => {
        set({
          workout: [],
          activeExerciseId: null,
          isRunning: false,
          elapsedSeconds: 0,
          totalSeconds: 0,
        });
      },

      startExercise: (exercise) => {
        set((state) => ({
          activeExerciseId: exercise.id,
          elapsedSeconds: 0,
          isRunning: true,
          workout: state.workout.some((item) => item.id === exercise.id)
            ? state.workout
            : [...state.workout, exercise],
          totalSeconds: state.workout.some((item) => item.id === exercise.id)
            ? state.totalSeconds
            : state.totalSeconds + exercise.duration,
        }));
      },

      toggleRunning: () => {
        set((state) => ({
          isRunning: !state.isRunning,
        }));
      },

      advanceToNext: () => {
        set((state) => {
          if (state.workout.length === 0) {
            return { ...state, activeExerciseId: null, isRunning: false, elapsedSeconds: 0 };
          }

          const currentIndex = state.workout.findIndex((item) => item.id === state.activeExerciseId);
          const nextIndex = currentIndex >= 0 ? currentIndex + 1 : 0;
          const nextExercise = state.workout[nextIndex] ?? state.workout[0];

          return {
            activeExerciseId: nextExercise ? nextExercise.id : null,
            elapsedSeconds: 0,
            isRunning: Boolean(nextExercise),
          };
        });
      },

      tick: () => {
        const state = get();
        if (!state.isRunning || !state.activeExerciseId) {
          return;
        }

        const activeExercise = state.workout.find((item) => item.id === state.activeExerciseId);
        if (!activeExercise) {
          return;
        }

        if (state.elapsedSeconds >= activeExercise.duration) {
          set((currentState) => {
            const currentIndex = currentState.workout.findIndex((item) => item.id === currentState.activeExerciseId);
            const nextExercise = currentState.workout[currentIndex + 1] ?? null;

            return {
              elapsedSeconds: 0,
              activeExerciseId: nextExercise ? nextExercise.id : null,
              isRunning: Boolean(nextExercise),
            };
          });
          return;
        }

        set((currentState) => ({
          elapsedSeconds: currentState.elapsedSeconds + 1,
        }));
      },
    }),
    {
      name: 'workout-session-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
