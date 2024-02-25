import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { UserState } from '$lib';

export interface UserStateStore extends Writable<UserState> {
    reset: () => void;
    updateState: (updates: Partial<UserState>) => void;
}

export const createUserState = () => {
    const store = writable<UserState>({ id: null, name: null });
    const { subscribe, set, update } = store;
    return {
        subscribe,
        update,
        set,
        reset: () => set({ id: null, name: null }),
        updateState: (updates: Partial<UserState>) => update(state => ({ ...state, ...updates })),
    };
}