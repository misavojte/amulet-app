import type { ITimestampQuestionAmuletService } from "$lib/interfaces/IQuestionAmulet";
import type { QuestionnaireScore } from "$lib/interfaces/IQuestionAmulet";

export class MockTimestampQuestionnaireService implements ITimestampQuestionAmuletService {

    lastScore: QuestionnaireScore | null = null;
    async startQuestions(): Promise<void> {
        setTimeout(() => {
            console.log('Questionnaire started successfully!');
        }, 1000);
    }

    async saveTimestampQuestion(question: string, answer: string): Promise<void> {
        setTimeout(() => {
            console.log('TimestampQuestionnaire saved successfully!', question, answer);
        }, 1000);
    }

    getScore(data: { id: string; value: string; }[]): QuestionnaireScore {
        void data;
        const result = {
            userId: 'mockUserId',
            sessionId: 'mockSessionId',
            timestamp: Date.now(),
            beliefInventoryF1: 0,
            beliefInventoryF2: 0,
            beliefInventoryF3: 0,
            activelyOpenMindedThinking: 0,
            preferenceForIntuitiveThinking: 0,
            preferenceForRationalThinking: 0,
            closeMindedThinking: 0,
        };
        this.lastScore = result;
        return result;
    }

    async saveQuestions(data: {
            id: string;
            value: string;
            required: boolean;
        }[]
    ): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Questionnaire saved successfully!', this.getScore(data));
                resolve();
            }
            , 1000);
        });
    }
}