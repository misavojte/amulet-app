import type { ITimestampGameService } from "$lib/interfaces/ITimestampGameService";
import type { TimestampGameType, TimestampGameEntryObject } from "$lib";
import { get } from "svelte/store";
import { writeTimestampGame } from "../../firebase";
import { AbstractTimestampGameService } from "./AbstractTimestampGameService";

export class TimestampGameService extends AbstractTimestampGameService implements ITimestampGameService {
    async saveTimestampGame(type: TimestampGameType): Promise<void> {
        if (this.gameState === null || this.userState === null) throw new Error("Game or user state is null");
        const state = get(this.gameState);
        const userState = get(this.userState);
        const config = state.config;
        if (userState.userId === null || userState.sessionId === null) {
            throw new Error("User is null");
        }
        const timestampEntry: TimestampGameEntryObject = {
            timestamp: Date.now(),
            type,
            round: config.numberOfRounds - state.numberOfRounds + 1,
            repeat: state.numberOfRepeats,
            userId: userState.userId,
            sessionId: userState.sessionId // TODO FIX
        }
        return writeTimestampGame(timestampEntry);
    }
}