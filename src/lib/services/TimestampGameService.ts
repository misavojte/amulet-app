import type { ITimestampGameService } from "$lib/interfaces/ITimestampGameService";
import type { TimestampGameType, TimestampGameEntryObject } from "$lib";
import { getContext } from "svelte";
import type { GameStateStore } from "../../stores/GameState";
import { get } from "svelte/store";
import { writeTimestampGame } from "../../firebase";
import type { UserStateStore } from "../../stores/UserState";

export class TimestampGameService implements ITimestampGameService {

    gameState: GameStateStore = getContext('gameState');
    userState: UserStateStore = getContext('userState');

    async saveTimestampGame(type: TimestampGameType): Promise<void> {
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