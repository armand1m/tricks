import { useMemo, useState } from 'react';

export interface QueueMethods<T> {
  add: (item: T) => void;
  remove: () => void;
  replace: (state: T[]) => void;
}

export interface QueueValues<T> {
  first: T;
  last: T;
  size: number;
}

export type QueueHook<T> = [QueueValues<T>, QueueMethods<T>];

export const useQueue = <T>(initialValue: T[] = []): QueueHook<T> => {
  const [state, set] = useState(initialValue);

  const values: QueueValues<T> = useMemo(
    () => ({
      get first() {
        return state[0];
      },
      get last() {
        return state[state.length - 1];
      },
      get size() {
        return state.length;
      },
    }),
    [state]
  );

  const actions: QueueMethods<T> = useMemo(
    () => ({
      replace: (state: T[]) => {
        set(state);
      },
      add: (value) => {
        set((queue) => [...queue, value]);
      },
      remove: () => {
        set(([, ...rest]) => {
          return rest;
        });
      },
    }),
    [set]
  );

  return [values, actions];
};
