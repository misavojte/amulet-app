import type { GameScoreResult } from "./IGameScoreService";

export interface IGameScoreGetterService {
    getUserScore(): number;
    getGameScores(): Promise<GameScoreResult>;
}