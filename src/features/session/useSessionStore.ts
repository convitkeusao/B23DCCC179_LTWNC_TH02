import { useWorkoutStore } from '../../store/workoutStore';

export const useSessionStore = useWorkoutStore;
export type SessionItem = ReturnType<typeof useWorkoutStore.getState>['workout'][number];
