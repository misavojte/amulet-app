export interface ITimestampQuestionnaireService {
    saveTimestampQuestionnaire(entry: TimestampQuestionnaireType, question: string, answer: string): Promise<void>;
    saveQuestionnaire(entry: unknown): Promise<void>;
}

export type TimestampQuestionnaireType = 'start' | 'end';

export interface TimestampQuestionnaireEntryObject {
    timestamp: number;
    type: TimestampQuestionnaireType;
    question: string;
    answer: string;
    userId: string;
    sessionId: string;
}