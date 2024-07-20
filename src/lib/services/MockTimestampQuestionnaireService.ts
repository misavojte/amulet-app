import type { ITimestampQuestionnaireService, TimestampQuestionnaireType } from "$lib/interfaces/ITimestampQuestionnaireService";

export class MockTimestampQuestionnaireService implements ITimestampQuestionnaireService {

    async saveTimestampQuestionnaire(type: TimestampQuestionnaireType): Promise<void> {
        setTimeout(() => {
            console.log('TimestampQuestionnaire saved successfully!' + type);
        }, 1000);
    }

    async saveQuestionnaire(): Promise<void> {
        setTimeout(() => {
            console.log('TimestampQuestionnaire saved successfully!');
        }, 1000);
    }
}