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

    async saveQuestionnaire(): Promise<void> {
        setTimeout(() => {
            console.log('TimestampQuestionnaire saved successfully!');
        }, 1000);
    }
}