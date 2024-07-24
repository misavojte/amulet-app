import type { ITimestampQuestionnaireService, StartQuestionnaireEntryObject } from "$lib/interfaces/ITimestampQuestionnaireService";
import type { TimestampQuestionnaireEntryObject } from "$lib";
import { getContext } from "svelte";
import { get } from "svelte/store";
import { type QuestionnaireScore, writeQuestionnaireScore, writeTimestampQuestionnaire } from "../../firebase";
import type { UserStateStore } from "../../stores/UserState";
import type { IBeliefInventoryService } from "$lib/interfaces/IBeliefInventoryService";
import type { IThinkingStyleService } from "$lib/interfaces/IThinkingStyleService";

export class TimestampQuestionnaireService implements ITimestampQuestionnaireService {

    userState: UserStateStore = getContext('userState');
    beliefInventoryService: IBeliefInventoryService = getContext('beliefInventoryService');
    thinkingStyleService: IThinkingStyleService = getContext('thinkingStyleService');

    async startQuestionnaire(): Promise<void> {
        
        const userState = get(this.userState);
        if (userState.userId === null || userState.sessionId === null) {
            throw new Error("User or sessionId is null");
        }
        const timestampEntry: StartQuestionnaireEntryObject = {
            timestamp: Date.now(),
            type: 'start',
            userId: userState.userId,
            sessionId: userState.sessionId // TODO FIX
        }

        return writeTimestampQuestionnaire(timestampEntry);
    }

    async saveTimestampQuestionnaire(question: string, answer: string): Promise<void> {
        const userState = get(this.userState);
        if (userState.userId === null || userState.sessionId === null) {
            throw new Error("User or sessionId is null");
        }
        const timestampEntry: TimestampQuestionnaireEntryObject = {
            timestamp: Date.now(),
            type: 'answer',
            question,
            answer,
            userId: userState.userId,
            sessionId: userState.sessionId // TODO FIX
        }

        
        
        return writeTimestampQuestionnaire(timestampEntry);
    }

    async saveQuestionnaire(data: 
        {
            id: string;
            value: string;
            required: boolean;
        }[]
    ): Promise<void> {
        const userState = get(this.userState);
        if (userState.userId === null || userState.sessionId === null) {
            throw new Error("User or sessionId is null");
        }

        const metaQuestions: Record<string, string> = {};

        data.forEach(({ id, value }) => {
            const wasCapturedByBeliefInventory = this.beliefInventoryService.saveBeliefInventory(id, value);
            const wasCapturedByThinkingStyle = this.thinkingStyleService.saveThinkingStyle(id, value);
            if (!wasCapturedByBeliefInventory && !wasCapturedByThinkingStyle) {
                // log to meta questions
                metaQuestions[id] = value;
            }
        });

        const beliefInventory = this.beliefInventoryService.getBeliefInventory(userState.sessionId);
        const thinkingStyle = this.thinkingStyleService.getThinkingStyle(userState.sessionId);
        const questionnaireScore: QuestionnaireScore = {
            ...beliefInventory,
            ...thinkingStyle,
            ...metaQuestions,
            userId: userState.userId,
            sessionId: userState.sessionId,
            timestamp: Date.now()
        }
        return writeQuestionnaireScore(questionnaireScore);
    }
}