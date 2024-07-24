import type { ITimestampQuestionnaireService } from "$lib/interfaces/ITimestampQuestionnaireService";

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
    ): Promise<void> {
        setTimeout(() => {
            console.log('TimestampQuestionnaire saved successfully!');
            console.log(data);
        }, 1000);
    }
}