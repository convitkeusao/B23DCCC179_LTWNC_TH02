export type RoutineItem = {
  id: string;
  name: string;
  duration: number;
};

export type RoutineState = {
  name: string;
  items: RoutineItem[];
};

export type RoutineAction =
  | { type: 'set-name'; payload: string }
  | { type: 'add-item'; payload: RoutineItem }
  | { type: 'remove-item'; payload: string }
  | { type: 'clear' };

export function routineReducer(state: RoutineState, action: RoutineAction): RoutineState {
  switch (action.type) {
    case 'set-name':
      return { ...state, name: action.payload };
    case 'add-item':
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case 'remove-item':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case 'clear':
      return { ...state, items: [] };
    default:
      return state;
  }
}

export const initialRoutineState: RoutineState = {
  name: 'New routine',
  items: [],
};
