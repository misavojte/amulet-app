import type { BeliefInventoryResult, IBeliefInventoryService } from "$lib/interfaces/IBeliefInventoryService";
import { beliefInventoryElligibleQuestionnaireQuestions } from "../../configs/beliefInventoryElligibleQuestionnaireQuestion";

type ScoreEntry = {
    score: number;
    weight: number;
};

type Scores = {
    F1: ScoreEntry[];
    F2: ScoreEntry[];
    F3: ScoreEntry[];
};

export class BeliefInventoryService implements IBeliefInventoryService {

    scores: Scores = {
        F1: [],
        F2: [],
        F3: []
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
        this.scores[questionInfo.subscale].push({ score: answer, weight: questionInfo.weight });
        return true;
    }

    getBeliefInventory(): BeliefInventoryResult {
        const sum = (acc: number, score: ScoreEntry) => acc + score.score * score.weight;
        const getSubscale = (subscale: 'F1' | 'F2' | 'F3') => this.scores[subscale].reduce(sum, 0);
        return {
            beliefInventoryF1: getSubscale('F1'),
            beliefInventoryF2: getSubscale('F2'),
            beliefInventoryF3: getSubscale('F3')
        };
    }
}
