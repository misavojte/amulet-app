export interface IBeliefInventoryService {
    saveBeliefInventory(id: string, value: string): boolean
    getBeliefInventory(sessionId: string): BeliefInventoryResult;
}

export interface BeliefInventoryElligibleQuestionnaireQuestion {
    questionId: string;
    isReversed: boolean;
}

export interface BeliefInventoryResult {
    beliefInventory: number;
}