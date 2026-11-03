export type Routine = {
  id: string;
  name: string;
  exerciseIds: string[];
};

export type RoutineAction =
  | { type: 'createRoutine'; payload: { id: string; name: string } }
  | { type: 'renameRoutine'; payload: { id: string; name: string } }
  | { type: 'removeRoutine'; payload: string }
  | { type: 'addExercise'; payload: { id: string; exerciseId: string } }
  | { type: 'removeExercise'; payload: { id: string; exerciseId: string } };

export type RoutineState = Routine[];

export const initialRoutineState: RoutineState = [];

export function routineReducer(state: RoutineState, action: RoutineAction): RoutineState {
  switch (action.type) {
    case 'createRoutine': {
      const exists = state.some(
        (item) => item.name.trim().toLowerCase() === action.payload.name.trim().toLowerCase(),
      );

      if (exists) {
        return state;
      }

      return [
        ...state,
        {
          id: action.payload.id,
          name: action.payload.name.trim(),
          exerciseIds: [],
        },
      ];
    }

    case 'renameRoutine': {
      return state.map((routine) =>
        routine.id === action.payload.id
          ? { ...routine, name: action.payload.name.trim() }
          : routine,
      );
    }

    case 'removeRoutine': {
      return state.filter((routine) => routine.id !== action.payload);
    }

    case 'addExercise': {
      return state.map((routine) => {
        if (routine.id !== action.payload.id) {
          return routine;
        }

        if (routine.exerciseIds.includes(action.payload.exerciseId)) {
          return routine;
        }

        return {
          ...routine,
          exerciseIds: [...routine.exerciseIds, action.payload.exerciseId],
        };
      });
    }

    case 'removeExercise': {
      return state.map((routine) =>
        routine.id === action.payload.id
          ? {
              ...routine,
              exerciseIds: routine.exerciseIds.filter((id) => id !== action.payload.exerciseId),
            }
          : routine,
      );
    }

    default:
      return state;
  }
}
