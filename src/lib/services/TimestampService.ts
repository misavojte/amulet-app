import type { ITimestampServise } from "$lib/interfaces/ITimestampService";
import type { TimestampType, TimestampEntryObject, TimestampEntryUrl } from "$lib";
import { getContext } from "svelte";
import type { GameStateStore } from "../../stores/GameState";
import { get } from "svelte/store";
import { writeTimestamp } from "../../firebase";
import type { UserStateStore } from "../../stores/UserState";

export class TimestampService implements ITimestampServise {

    gameState: GameStateStore = getContext('gameState');
    userState: UserStateStore = getContext('userState');

    async saveTimestamp(type: TimestampType): Promise<void> {
        const state = get(this.gameState);
        const userState = get(this.userState);
        const config = state.config;
        const userName = userState.name ? userState.name : 'ANONYMOUS_ERR';
        // url without http(s)://
        const url = window.location.href.replace(/(^\w+:|^)\/\//, '');
        const timestampEntry: TimestampEntryObject = {
            timestamp: Date.now(),
            type,
            round: config.numberOfRounds - state.numberOfRounds + 1,
            repeat: state.numberOfRepeats,
        }
        if (userState.id === null) {
            throw new Error("User is null");
        }
        const timestampEntryUrl: TimestampEntryUrl = {
            userId: userState.id,
            userName,
            url
        }
        return writeTimestamp(timestampEntry, timestampEntryUrl);
    }
}