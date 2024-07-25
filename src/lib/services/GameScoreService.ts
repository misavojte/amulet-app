import type { GameScoreEntry, GameScoreResult, IGameScoreService } from "$lib/interfaces/IGameScoreService";
import type { UserStateStore } from "../../stores/UserState";
import type { GameStateStore } from "../../stores/GameState";
import { getContext } from "svelte";
import { get } from "svelte/store";
import { getGameScores, writeGameScore } from "../../firebase";

export class GameScoreService implements IGameScoreService {

    gameState = getContext<GameStateStore>('gameState');
    userState = getContext<UserStateStore>('userState');

    writeGameScore(): Promise<GameScoreEntry> {
        const userStateValue = get(this.userState);
        const sessionId = userStateValue.sessionId;
        if (sessionId === null || sessionId === undefined) throw new Error("Session is null");

        const userId = userStateValue.userId;
        if (userId === null || userId === undefined) throw new Error("User is null");

        const gameStateValue = get(this.gameState);
        const score = gameStateValue.score;
        if (score === null || score === undefined) throw new Error("Score is null");

        const timestamp = Date.now();

        const data: GameScoreEntry = {
            sessionId,
            userId,
            score,
            timestamp
        };

        return writeGameScore(data);
    }
    async getGameScores(): Promise<GameScoreResult> {
        const entries = await getGameScores();

        const averageScore = entries.length > 0 ? entries.reduce((acc, entry) => acc + entry.score, 0) / entries.length : 0;
        const bestScore = entries.length > 0 ? Math.max(...entries.map(entry => entry.score)) : 0;

        return { averageScore, bestScore };
    }
}