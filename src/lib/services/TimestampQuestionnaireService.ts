import type { ITimestampQuestionnaireService } from "$lib/interfaces/ITimestampQuestionnaireService";
import type { TimestampQuestionnaireType, TimestampQuestionnaireEntryObject } from "$lib";
import { getContext } from "svelte";
import { get } from "svelte/store";
import { writeTimestampQuestionnaire } from "../../firebase";
import type { UserStateStore } from "../../stores/UserState";

export class TimestampQuestionnaireService implements ITimestampQuestionnaireService {

    userState: UserStateStore = getContext('userState');

    async saveTimestampQuestionnaire(type: TimestampQuestionnaireType, question: string, answer: string): Promise<void> {
        const userState = get(this.userState);
        if (userState.id === null) {
            throw new Error("User is null");
        }
        const timestampEntry: TimestampQuestionnaireEntryObject = {
            timestamp: Date.now(),
            type,
            question,
            answer,
            userId: userState.id,
            sessionId: userState.id // TODO FIX
        }
        return writeTimestampQuestionnaire(timestampEntry);
    }

    async saveQuestionnaire(): Promise<void> {
        console.log('TimestampQuestionnaire saved successfully!');
    }
}

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