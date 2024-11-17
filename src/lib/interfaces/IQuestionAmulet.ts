import type { BeliefInventoryResult } from './IBeliefInventoryService';
import type { ITimestampQuestionService } from './IQuestion';
import type { ThinkingStyleResult } from './IThinkingStyleService';

/**
 * Acts as a service for the timestamp questionnaire.
 * Actual implementation should include call to the via get context IThinkingStyleService for saving the data.
 */
export interface ITimestampQuestionAmuletService extends ITimestampQuestionService {
    lastScore: QuestionnaireScore | null;
    getScore(
        data: {
            id: string;
            value: string;
        }[]
    ): QuestionnaireScore;
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
export type QuestionnaireScore = BeliefInventoryResult & ThinkingStyleResult & {
  userId: string;
  sessionId: string;
  timestamp: number;
};
