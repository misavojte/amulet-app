import type { BeliefInventoryResult, IBeliefInventoryService } from "$lib/interfaces/IBeliefInventoryService";
import type { TimestampQuestionnaireEntryObject } from "$lib/interfaces/ITimestampQuestionnaireService";
import { beliefInventoryElligibleQuestionnaireQuestions } from "../../configs/beliefInventoryElligibleQuestionnaireQuestion";

export class BeliefInventoryService implements IBeliefInventoryService {

    // Keep score in an object, where the key is a sessionId.. in it, there is a object with the score
    score: Record<string, BeliefInventoryResult> = {};

    async saveBeliefInventory(entry: TimestampQuestionnaireEntryObject): Promise<void> {
        const questionInfo = beliefInventoryElligibleQuestionnaireQuestions.find(q => q.questionId === entry.question);
        if (!questionInfo) return;
        const originalAnswer = parseInt(entry.answer);
        if (isNaN(originalAnswer)) {
            console.warn(`Answer for question ${entry.question} is not a number`);
            return;
        }
        // check if reversed, in this settings, numbers are alwas 0-5...
        const MAXIMUM_ANSWER = 5;
        const answer = questionInfo.isReversed ? MAXIMUM_ANSWER - originalAnswer : originalAnswer;
        this.score[entry.sessionId].beliefInventory += answer;
    }

    getBeliefInventory(sessionId: string): BeliefInventoryResult {
        if (!this.score[sessionId]) {
            throw new Error("No entry for sessionId");
        }
        return this.score[sessionId];
    }

}
