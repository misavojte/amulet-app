import type { BeliefInventoryResult, IBeliefInventoryService } from "$lib/interfaces/IBeliefInventoryService";
import { beliefInventoryElligibleQuestionnaireQuestions } from "../../configs/beliefInventoryElligibleQuestionnaireQuestion";

export class BeliefInventoryService implements IBeliefInventoryService {

    // Keep score in an object, where the key is a sessionId.. in it, there is a object with the score
    score: BeliefInventoryResult = {
        beliefInventory: 0,
    };

    saveBeliefInventory(id: string, value: string): boolean {
        const questionInfo = beliefInventoryElligibleQuestionnaireQuestions.find(q => q.questionId === id);
        if (!questionInfo) return false;
        const originalAnswer = parseInt(value);
        if (isNaN(originalAnswer)) {
            console.warn(`Answer for question ${id} is not a number`);
            return false;
        }
        // check if reversed, in this settings, numbers are alwas 0-5...
        const MAXIMUM_ANSWER = 5;
        const answer = questionInfo.isReversed ? MAXIMUM_ANSWER - originalAnswer : originalAnswer;
        this.score.beliefInventory += answer;
        return true;
    }

    getBeliefInventory(): BeliefInventoryResult {
        return this.score;
    }

}
