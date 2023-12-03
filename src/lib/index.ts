// place files you want to import through the `$lib` alias in this folder.
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';


export interface GameConfig {
    numberOfRounds: number;
    startScore: number;
    scenario: string;
    priceOfAmulet: number;
    scoreOnWin: number;
}

export interface GameState {
    hasAmulet: boolean;
    numberOfRounds: number;
    hasCurrentlyWon: boolean;
    blockInteraction: boolean;
    scenario: string;
    gameStage: string;
    score: number;
}

export const resetGameState = (config: GameConfig): Writable<GameState> => {
    return writable({
        hasAmulet: false,
        numberOfRounds: config.numberOfRounds,
        hasCurrentlyWon: false,
        blockInteraction: false,
        scenario: config.scenario,
        gameStage: 'Start',
        score: config.startScore,
    });
}

export interface DbData {
    userId: string;
    timestamp: number;
    timediff: number;
    round: number;
    repeat: number;
    scenario: string;
    score: number;
    isAmulet: boolean;
    isWin: boolean;
    boxId: number;
}

export interface LeaderboardEntryBase {
    userName: string;
    score: number;
    mark?: boolean;
}

export interface LeaderboardEntry extends LeaderboardEntryBase {
    timestamp: number;
    userId: string;
}