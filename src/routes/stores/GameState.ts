import { get, writable } from 'svelte/store';
import { gameConfigStore } from './GameConfigStore';


export interface GameState {
    hasAmulet: boolean;
    numberOfRounds: number;
    hasCurrentlyWon: boolean;
    blockInteraction: boolean;
    scenario: string;
    gameStage: string;
    score: number;

}

export const gameState = writable<GameState|null>(null);

export const resetGameState = () => {
    const config = get(gameConfigStore);
    if (config === null) {
        throw new Error('Game config not loaded');
    }
    gameState.set({
        hasAmulet: false,
        numberOfRounds: config.numberOfRounds,
        hasCurrentlyWon: false,
        blockInteraction: false,
        scenario: config.scenario,
        gameStage: 'Start',
        score: config.startScore,
    });
}

export const repeatGameState = () => {
    const state = get(gameState);
    console.log(state);
    if (state === null) {
        throw new Error('Game state not loaded');
    }
    const config = get(gameConfigStore);
    if (config === null) {
        throw new Error('Game config not loaded');
    }
    gameState.set({
        hasAmulet: false,
        numberOfRounds: config.numberOfRounds,
        hasCurrentlyWon: false,
        blockInteraction: false,
        scenario: config.scenario,
        gameStage: 'Intermezzo',
        score: config.startScore,
    });
    console.log(state);
}

export const updateGameState = (updates: Partial<GameState>) => {
    gameState.update(state => state ? { ...state, ...updates } : null);
}