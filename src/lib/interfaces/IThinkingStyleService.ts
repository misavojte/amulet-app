import type { TimestampQuestionnaireEntryObject } from "./ITimestampQuestionnaireService";

export interface IThinkingStyleService {
    saveThinkingStyle(entry: TimestampQuestionnaireEntryObject): Promise<void>;
    getThinkingStyle(sessionId: string): Promise<TimestampQuestionnaireEntryObject[]>;
}

export interface ThinkingStyleElligibleQuestionnaireQuestion {
    questionId: string;
    subscale: 'activelyOpenMindedThinking' | 'closeMindedThinking' | 'preferenceForIntuitiveThinking' | 'preferenceForRationalThinking';
    isReversed: boolean;
}

export interface ThinkingStyleResult {
    activelyOpenMindedThinking: number;
    closeMindedThinking: number;
    preferenceForIntuitiveThinking: number;
    preferenceForRationalThinking: number;
}