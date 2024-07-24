export interface ITimestampGameService {
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