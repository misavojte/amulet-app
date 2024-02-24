import { get, writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { GameConfig } from '$lib';


export interface GameState {
    hasAmulet: boolean;
    numberOfRounds: number;
    hasCurrentlyWon: boolean;
    blockInteraction: boolean;
    scenario: string;
    gameStage: string;
    score: number;
    numberOfRepeats: number;
    userName?: string;
}

export interface GameStateStore extends Writable<GameState> {
    reset: () => void;
    updateState: (updates: Partial<GameState>) => void;
    purchaseAmulet: (price: number) => boolean;
    repeat: () => void;
    config: GameConfig;
}

/**
 * Purchase the amulet if the player has enough score and does not already own it
 * @param state The game state
 * @param price The price of the amulet
 * @returns True if the amulet was purchased, false if not
 */
export const purchaseAmulet = (state: Writable<GameState>, price: number): boolean => {
    state.update((state) => {
        if (state.hasAmulet || state.score < price) {
            return state; // No changes if amulet already owned or not enough score
        }
        return {
            ...state,
            score: state.score - price,
            hasAmulet: true,
        };
    });
    return get(state).hasAmulet;
};

export const createGameState = (config: GameConfig) => {
    const store = writable<GameState>(createInitialGameState(config));
    const { subscribe, set, update } = store;
    return {
        config,
        subscribe,
        update,
        set,
        reset: () => set(createInitialGameState(config)),
        updateState: (updates: Partial<GameState>) => update(state => ({ ...state, ...updates })),
        purchaseAmulet: (price: number) => purchaseAmulet(store, price),
        repeat: () => repeatGameState(store, config),
    };
}

const createInitialGameState = (config: GameConfig): GameState => ({
    hasAmulet: false,
    numberOfRounds: config.numberOfRounds,
    hasCurrentlyWon: false,
    blockInteraction: false,
    scenario: config.scenario,
    gameStage: 'Start',
    score: config.startScore,
    numberOfRepeats: 0,
});

export const repeatGameState = (state: Writable<GameState>, config: GameConfig) => {
    state.update((state) => {
        return {
            ...state,
            hasAmulet: false,
            numberOfRounds: config.numberOfRounds,
            hasCurrentlyWon: false,
            blockInteraction: true,
            scenario: config.scenario,
            gameStage: 'Intermezzo',
            score: config.startScore,
            numberOfRepeats: state.numberOfRepeats + 1,
        };
    });
};