export interface IGameScoreService {
    writeGameScore(data: GameScoreEntry): Promise<GameScoreEntry>;
    getGameScores(): Promise<GameScoreResult>;
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