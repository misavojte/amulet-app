import type { GameStateStore } from "../../stores/GameState";
import type { UserStateStore } from "../../stores/UserState";

export interface ITimestampGameService {
    init(gameState: GameStateStore, userState: UserStateStore): void;
    saveTimestampGame(entry: TimestampGameType): Promise<void>;
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