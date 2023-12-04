import type { GameConfig } from '$lib';
import { writable } from 'svelte/store';

export const gameConfigStore = writable<GameConfig|null>(null);