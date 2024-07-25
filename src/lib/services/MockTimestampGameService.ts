import type { ITimestampGameService } from "$lib/interfaces/ITimestampGameService";
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
}