import type { TimestampGameType } from "$lib";

export interface ITimestampGameServise {
    saveTimestampGame(entry: TimestampGameType): Promise<void>;
}