import type { StartQuestionnaireEntryObject } from "$lib/interfaces/IQuestionAmulet";
import type { TimestampQuestionnaireEntryObject } from "$lib";
import { get } from "svelte/store";
import { writeQuestionnaireScore, writeTimestampQuestionnaire } from "../../firebase";
import type { QuestionnaireScore } from "$lib/interfaces/IQuestionAmulet";
import type { UserStateStore } from "../../stores/UserState";
import type { IBeliefInventoryService } from "$lib/interfaces/IBeliefInventoryService";
import type { IThinkingStyleService } from "$lib/interfaces/IThinkingStyleService";
import type { ITimestampQuestionAmuletService } from "$lib/interfaces/IQuestionAmulet";

export class TimestampQuestionnaireService implements ITimestampQuestionAmuletService {

    userState: UserStateStore;
    beliefInventoryService: IBeliefInventoryService;
    thinkingStyleService: IThinkingStyleService;
    lastScore: QuestionnaireScore | null = null;

    constructor (
        userState: UserStateStore,
        beliefInventoryService: IBeliefInventoryService,
        thinkingStyleService: IThinkingStyleService
    ) {
        this.userState = userState;
        this.beliefInventoryService = beliefInventoryService;
        this.thinkingStyleService = thinkingStyleService;
    }

    async startQuestions(): Promise<void> {
        
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

    async saveTimestampQuestion(question: string, answer: string): Promise<void> {
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

    getScore(data: { id: string; value: string; }[]): QuestionnaireScore {
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
        this.lastScore = questionnaireScore;
        return questionnaireScore;
    }

    async saveQuestions(data: 
        {
            id: string;
            value: string;
        }[]
    ): Promise<void> {
        const questionnaireScore = this.getScore(data);
        return writeQuestionnaireScore(questionnaireScore);
    }
}