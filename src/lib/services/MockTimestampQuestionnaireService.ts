import type { ITimestampQuestionnaireService, QuestionnaireScore } from "$lib/interfaces/ITimestampQuestionnaireService";

export class MockTimestampQuestionnaireService implements ITimestampQuestionnaireService {

    async startQuestionnaire(): Promise<void> {
        setTimeout(() => {
            console.log('Questionnaire started successfully!');
        }, 1000);
    }

    async saveTimestampQuestionnaire(question: string, answer: string): Promise<void> {
        setTimeout(() => {
            console.log('TimestampQuestionnaire saved successfully!', question, answer);
        }, 1000);
    }

    async saveQuestionnaire(data: {
            id: string;
            value: string;
            required: boolean;
        }[]
    ): Promise<QuestionnaireScore> {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Questionnaire saved successfully!', data);
                resolve({
                    userId: 'mockUserId',
                    sessionId: 'mockSessionId',
                    timestamp: Date.now(),
                    beliefInventory: 0,
                    activelyOpenMindedThinking: 0,
                    preferenceForIntuitiveThinking: 0,
                    preferenceForRationalThinking: 0,
                    closeMindedThinking: 0,
                });
            }
            , 1000);
        });
    }
}