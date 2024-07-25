import type { GameScoreEntry, ITimestampGameService } from "$lib/interfaces/ITimestampGameService";
import type { TimestampGameType, TimestampGameEntryObject } from "$lib";
import { get } from "svelte/store";
import { AbstractTimestampGameService } from "./AbstractTimestampGameService";

export class MockTimestampGameService extends AbstractTimestampGameService implements ITimestampGameService {

    async saveTimestampGame(type: TimestampGameType): Promise<void> {
        if (this.gameState === null) throw new Error("Game state is null");
        if (this.userState === null) throw new Error("User state is null");
        const state = get(this.gameState);
        const userState = get(this.userState);
        const config = state.config;
        const timestampEntry: TimestampGameEntryObject = {
            timestamp: Date.now(),
            type,
            round: config.numberOfRounds - state.numberOfRounds + 1,
            repeat: state.numberOfRepeats,
            userId: userState.userId ?? "mock-user-id",
            sessionId: userState.sessionId ?? "mock-session-id"
        }
        console.info(timestampEntry);
    }

    async writeGameScore(): Promise<GameScoreEntry> {
        if (this.gameState === null || this.userState === null) throw new Error("Game or user state is null");
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

        console.info(data);
        return data;
    }
}