export interface IBeliefInventoryService {
    saveBeliefInventory(id: string, value: string): boolean
    getBeliefInventory(sessionId: string): BeliefInventoryResult;
}

export interface BeliefInventoryElligibleQuestionnaireQuestion {
    questionId: string;
    isReversed: boolean;
    subscale: 'F1' | 'F2' | 'F3' // F4 not included
    weight: number;
}

export interface BeliefInventoryResult {
    beliefInventoryF1: number;
    beliefInventoryF2: number;
    beliefInventoryF3: number;
}