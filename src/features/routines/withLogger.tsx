import type { Reducer } from 'react';

export function withLogger<R, A>(reducer: Reducer<R, A>): Reducer<R, A> {
  return (state, action) => {
    if (import.meta.env.DEV) {
      console.log('[routine action]', action);
    }

    const nextState = reducer(state, action);

    if (import.meta.env.DEV) {
      console.log('[routine next state]', nextState);
    }

    return nextState;
  };
}
