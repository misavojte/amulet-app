import { get, writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { GameConfig, GameState } from '$lib';
import { updateState } from '$lib/utils/storeUtils';

export interface GameStateStore extends Writable<GameState> {
    reset: () => void;
    updateState: (updates: Partial<GameState>) => void;
    purchaseAmulet: (price: number) => boolean;
    repeat: () => void;
    progressFromBoxDecision: (win: boolean) => void;
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
        subscribe,
        update,
        set,
        reset: () => set(createInitialGameState(config)),
        updateState: (updates: Partial<GameState>) => updateState(store, updates),
        purchaseAmulet: (price: number) => purchaseAmulet(store, price),
        repeat: () => repeatGameState(store, config),
        progressFromBoxDecision: (win: boolean) => progressFromBoxDecision(store, win),
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
    config,
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
            gameStage: 'AmuletDecision',
            score: config.startScore,
            numberOfRepeats: state.numberOfRepeats + 1,
        };
    });
};

export const progressFromBoxDecision = (state: Writable<GameState>, win: boolean) => {
    // Choose next game stage based on number of rounds left
    const nextGameStage = get(state).numberOfRounds > 1 ? 'BoxDecision' : 'End';
    const delayOfNextStage = win ? 2000 : 1000;

    updateState(state, {
        hasCurrentlyWon: win,
        blockInteraction: true,
        score: win ? get(state).score + get(state).config.scoreOnWin : get(state).score,
    });

    setTimeout(() => {
        updateState(state, {
            gameStage: nextGameStage,
            blockInteraction: false,
            numberOfRounds: get(state).numberOfRounds - 1,
        });
    }, delayOfNextStage);
}