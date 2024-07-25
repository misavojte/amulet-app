import { GameConfig } from "$lib";
import type { GameStateStore } from "../../stores/GameState";
import type { UserStateStore } from "../../stores/UserState";

export interface ITimestampGameService {
    init(gameState: GameStateStore, userState: UserStateStore): void;
    saveInitialTimestampGame(): Promise<InitialTimestampGameEntry>;
    saveTimestampGame(entry: TimestampGameType): Promise<void>;
    writeGameScore(): Promise<GameScoreEntry>;
}

export type TimestampGameType = 'round' | 'amuletStart' | 'amuletBuy' | 'amuletReject' | 'leftBoxWin' | 'leftBoxLoss' | 'rightBoxWin' | 'rightBoxLoss';

export interface TimestampGameEntryObject {
    timestamp: number;
    type: TimestampGameType;
    round: number;
    repeat: number;
    userId: string;
    sessionId: string;
}
export interface GameScoreResult {
    averageScore: number;
    bestScore: number;
}

export interface GameScoreEntry {
    sessionId: string;
    score: number;
    timestamp: number;
    userId: string;
}

export type InitialTimestampGameEntry = {
    sessionId: string;
    userId: string;
    timestamp: number;
    locale: string;
} & GameConfig;
