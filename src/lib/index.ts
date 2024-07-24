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
    userId: string | null;
    sessionId: string | null;
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

export type { ITimestampGameService, TimestampGameType, TimestampGameEntryObject} from "$lib/interfaces/ITimestampGameService";
export type { ITimestampQuestionnaireService, TimestampQuestionnaireType, TimestampQuestionnaireEntryObject} from "$lib/interfaces/ITimestampQuestionnaireService";

/**
 * In FireBase, saved in: /timestamps/{url}/{userId}/{userName}
 */
export interface TimestampGameEntryUrl {
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