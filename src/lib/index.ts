export interface GameConfig {
    numberOfRounds: number;
    startScore: number;
    scenario: string;
    priceOfAmulet: number;
    scoreOnWin: number;
}

export interface GameState {
    hasAmulet: boolean;
    numberOfRounds: number;
    hasCurrentlyWon: boolean;
    blockInteraction: boolean;
    scenario: string;
    gameStage: GameStageType;
    score: number;
    numberOfRepeats: number;
    config: GameConfig;
}

export interface UserState {
    id: string | null;
    name: string | null;
}

export type GameStageType = 'Start' | 'AmuletDecision' | 'BoxDecision' | 'AfterBoxDecision' | 'End';

export interface DbData {
    userId: string;
    timestamp: number;
    timediff: number;
    round: number;
    repeat: number;
    scenario: string;
    score: number;
    isAmulet: boolean;
    isWin: boolean;
    boxId: number;
}

export type TimestampType = 'round' | 'amuletDecisionStart' | 'amuletDecisionClick' | 'leftBoxWin' | 'leftBoxLoss' | 'rightBoxWin' | 'rightBoxLoss';

export interface TimestampEntryObject {
    timestamp: number;
    type: TimestampType;
    round: number;
    repeat: number;
}

/**
 * In FireBase, saved in: /timestamps/{url}/{userId}/{userName}
 */
export interface TimestampEntryUrl {
    userId: string;
    userName: string;
    url: string;
}

export interface LeaderboardEntryBase {
    userName: string;
    score: number;
    mark?: boolean;
}

export interface LeaderboardEntry extends LeaderboardEntryBase {
    timestamp: number;
    userId: string;
}