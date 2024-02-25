import type { Writable } from 'svelte/store';

// Define a generic type for the store
type StoreType<T> = Writable<T>;

// Define a generic type for the state
type StateType<T> = T;

export const updateState = <T>(state: StoreType<T>, updates: Partial<StateType<T>>) => {
    state.update(currentState => ({ ...currentState, ...updates }));
}