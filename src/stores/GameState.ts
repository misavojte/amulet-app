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
    numberOfRepeats: number;
    userName?: string;
}

let numberOfRepeats = -1;

export const gameState = writable<GameState|null>(null);

export const resetGameState = () => {
    const config = get(gameConfigStore);
    if (config === null) {
        throw new Error('Game config not loaded');
    }
    numberOfRepeats++;
    gameState.set({
        hasAmulet: false,
        numberOfRounds: config.numberOfRounds,
        hasCurrentlyWon: false,
        blockInteraction: false,
        scenario: config.scenario,
        gameStage: 'Start',
        score: config.startScore,
        numberOfRepeats: numberOfRepeats,
    });
}

export const repeatGameState = () => {
    const state = get(gameState);
    if (state === null) {
        throw new Error('Game state not loaded');
    }
    const config = get(gameConfigStore);
    if (config === null) {
        throw new Error('Game config not loaded');
    }
    numberOfRepeats++;
    gameState.set({
        hasAmulet: false,
        numberOfRounds: config.numberOfRounds,
        hasCurrentlyWon: false,
        blockInteraction: true,
        scenario: config.scenario,
        gameStage: 'Intermezzo',
        score: config.startScore,
        numberOfRepeats: numberOfRepeats,
        userName: state.userName,
    });
}

export const updateGameState = (updates: Partial<GameState>) => {
    gameState.update(state => state ? { ...state, ...updates } : null);
}