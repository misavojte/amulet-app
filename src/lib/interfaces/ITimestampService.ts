import type { TimestampType } from "$lib";

export interface ITimestampServise {
    saveTimestamp(entry: TimestampType): Promise<void>;
}