import type { GameScoreResult } from "./ITimestampGameService";

export interface IGameScoreGetterService {
    getUserScore(): number;
    getGameScores(): Promise<GameScoreResult>;
}