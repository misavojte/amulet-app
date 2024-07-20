import type { ITimestampGameServise } from "$lib/interfaces/ITimestampGameService";
import type { TimestampGameType, TimestampGameEntryObject, TimestampGameEntryUrl } from "$lib";
import { getContext } from "svelte";
import type { GameStateStore } from "../../stores/GameState";
import { get } from "svelte/store";
import { writeTimestampGame } from "../../firebase";
import type { UserStateStore } from "../../stores/UserState";

export class TimestampGameService implements ITimestampGameServise {

    gameState: GameStateStore = getContext('gameState');
    userState: UserStateStore = getContext('userState');

    async saveTimestampGame(type: TimestampGameType): Promise<void> {
        const state = get(this.gameState);
        const userState = get(this.userState);
        const config = state.config;
        const userName = userState.name ? userState.name : 'ANONYMOUS_ERR';
        // url without http(s)://
        const url = window.location.href.replace(/(^\w+:|^)\/\//, '');
        const timestampEntry: TimestampGameEntryObject = {
            timestamp: Date.now(),
            type,
            round: config.numberOfRounds - state.numberOfRounds + 1,
            repeat: state.numberOfRepeats,
        }
        if (userState.id === null) {
            throw new Error("User is null");
        }
        const timestampEntryUrl: TimestampGameEntryUrl = {
            userId: userState.id,
            userName,
            url
        }
        return writeTimestampGame(timestampEntry, timestampEntryUrl);
    }
}