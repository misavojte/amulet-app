import type { IGameScoreGetterService } from "$lib/interfaces/IGameScoreGetterService";
import { getGameScores } from "../../firebase";
import type { GameStateStore } from "../../stores/GameState";
import { get } from "svelte/store";

export const getGameScoreServiceFn = async () => {
        const entries = await getGameScores();

        const averageScore = entries.length > 0 ? entries.reduce((acc, entry) => acc + entry.score, 0) / entries.length : 0;
        const bestScore = entries.length > 0 ? Math.max(...entries.map(entry => entry.score)) : 0;

        return { averageScore, bestScore };
};

export const parseInt = (value: string) => {
		const parsed = Number.parseInt(value);
		if (Number.isNaN(parsed)) {
			throw new Error('Invalid score data');
		}
		return parsed;
};

export class GameScoreGetterServiceStore implements IGameScoreGetterService {

    gameState: GameStateStore;

    constructor(gameState: GameStateStore) {
        this.gameState = gameState;
    }

    getUserScore = () => {
        const gameStateValue = get(this.gameState);
		if (!gameStateValue) {
			throw new Error('Game state is not set');
		}
		return gameStateValue.score;
    }

    getGameScores = getGameScoreServiceFn;
}

export class GameScoreGetterServiceUrl implements IGameScoreGetterService {

    getUserScore = () => {
        if (!window) {
            throw new Error('Window object is not available');
        }
        // get URLSearchParams from the current page URL
        const urlSearchParams = new URLSearchParams(window.location.search);
		const urlSearchParamEntries = {
			...Object.fromEntries(urlSearchParams.entries())
		};
		// 1. s is 'game score'
		const USER_SCORE_LABEL = 's';
		// if does not contain USER_SCORE_LABEL key from the score, throw an error
		if (!Object.keys(urlSearchParamEntries).includes(USER_SCORE_LABEL)) {
			throw new Error('Invalid score data');
		}

		return parseInt(urlSearchParamEntries.s);
    }

    getGameScores = getGameScoreServiceFn;
}

export class GameScoreGetterServiceMock implements IGameScoreGetterService {

    getUserScore = () => {
        return 100;
    }

    getGameScores = async () => {
        return { averageScore: 40, bestScore: 300 };
    }
}