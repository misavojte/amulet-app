/**
 * Acts as a service for the timestamp questionnaire.
 * Actual implementation should include call to the via get context IThinkingStyleService for saving the data.
 */
export interface ITimestampQuestionnaireService {
    startQuestionnaire(): Promise<void>;
    saveTimestampQuestionnaire(question: string, answer: string): Promise<void>;
    saveQuestionnaire(data: {
        id: string;
        value: string;
        required: boolean;
    }[]): Promise<void>;
}

export interface TimestampQuestionnaireEntryObject {
    timestamp: number;
    type: 'answer';
    question: string;
    answer: string;
    userId: string;
    sessionId: string;
}

export interface StartQuestionnaireEntryObject {
    timestamp: number;
    type: 'start';
    userId: string;
    sessionId: string;
}