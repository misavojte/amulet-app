import type { ITimestampQuestionnaireService } from "$lib/interfaces/ITimestampQuestionnaireService";
import type { TimestampQuestionnaireEntryObject } from "$lib";
import { getContext } from "svelte";
import { get } from "svelte/store";
import { writeTimestampQuestionnaire } from "../../firebase";
import type { UserStateStore } from "../../stores/UserState";
import { IBeliefInventoryService } from "$lib/interfaces/IBeliefInventoryService";
import { IThinkingStyleService } from "$lib/interfaces/IThinkingStyleService";

export class TimestampQuestionnaireService implements ITimestampQuestionnaireService {

    userState: UserStateStore = getContext('userState');
    beliefInventoryService: IBeliefInventoryService = getContext('beliefInventoryService');
    thinkingStyleService: IThinkingStyleService = getContext('thinkingStyleService');

    async startQuestionnaire(): Promise<void> {
        console.log('Questionnaire started successfully!');
    }

    async saveTimestampQuestionnaire(question: string, answer: string): Promise<void> {
        const userState = get(this.userState);
        if (userState.id === null) {
            throw new Error("User is null");
        }
        const timestampEntry: TimestampQuestionnaireEntryObject = {
            timestamp: Date.now(),
            type: 'answer',
            question,
            answer,
            userId: userState.id,
            sessionId: userState.id // TODO FIX
        }

        this.beliefInventoryService.saveBeliefInventory(timestampEntry);
        this.thinkingStyleService.saveThinkingStyle(timestampEntry);
        
        return writeTimestampQuestionnaire(timestampEntry);
    }

    async saveQuestionnaire(): Promise<void> {
        console.log('TimestampQuestionnaire saved successfully!');
    }
}