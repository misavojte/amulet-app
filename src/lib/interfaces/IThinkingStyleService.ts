export interface IThinkingStyleService {
    saveThinkingStyle(id: string, value: string): boolean;
    getThinkingStyle(sessionId: string): ThinkingStyleResult;
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