import type { TimestampQuestionnaireEntryObject } from "./ITimestampQuestionnaireService";

export interface IBeliefInventoryService {
    saveBeliefInventory(entry: TimestampQuestionnaireEntryObject): boolean;
    getBeliefInventory(sessionId: string): BeliefInventoryResult;
}

export interface BeliefInventoryElligibleQuestionnaireQuestion {
    questionId: string;
    isReversed: boolean;
}

export interface BeliefInventoryResult {
    beliefInventory: number;
}