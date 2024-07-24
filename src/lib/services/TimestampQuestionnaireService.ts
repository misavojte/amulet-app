import type { ITimestampQuestionnaireService, StartQuestionnaireEntryObject } from "$lib/interfaces/ITimestampQuestionnaireService";
import type { TimestampQuestionnaireEntryObject } from "$lib";
import { getContext } from "svelte";
import { get } from "svelte/store";
import { type QuestionnaireScore, writeQuestionnaireScore, writeTimestampQuestionnaire } from "../../firebase";
import type { UserStateStore } from "../../stores/UserState";
import type { IBeliefInventoryService } from "$lib/interfaces/IBeliefInventoryService";
import type { IThinkingStyleService } from "$lib/interfaces/IThinkingStyleService";

export class TimestampQuestionnaireService implements ITimestampQuestionnaireService {

    metaQuestions: Record<string, string> = {};

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

        const wasCapturedByBeliefInventory = this.beliefInventoryService.saveBeliefInventory(timestampEntry);
        const wasCapturedByThinkingStyle = this.thinkingStyleService.saveThinkingStyle(timestampEntry);

        if (!wasCapturedByBeliefInventory && !wasCapturedByThinkingStyle) {
            // log to meta questions
            this.metaQuestions[question] = answer;
        }
        
        return writeTimestampQuestionnaire(timestampEntry);
    }

    async saveQuestionnaire(): Promise<void> {
        const userState = get(this.userState);
        if (userState.userId === null || userState.sessionId === null) {
            throw new Error("User or sessionId is null");
        }
        const beliefInventory = this.beliefInventoryService.getBeliefInventory(userState.sessionId);
        const thinkingStyle = this.thinkingStyleService.getThinkingStyle(userState.sessionId);
        const questionnaireScore: QuestionnaireScore = {
            ...beliefInventory,
            ...thinkingStyle,
            ...this.metaQuestions,
            userId: userState.userId,
            sessionId: userState.sessionId,
            timestamp: Date.now()
        }
        return writeQuestionnaireScore(questionnaireScore);
    }
}