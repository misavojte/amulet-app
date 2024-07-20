export interface ITimestampQuestionnaireService {
    startQuestionnaire(): Promise<void>;
    saveTimestampQuestionnaire(question: string, answer: string): Promise<void>;
    saveQuestionnaire(entry: unknown): Promise<void>;
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