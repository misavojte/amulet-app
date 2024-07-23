import type { ThinkingStyleResult, IThinkingStyleService } from "$lib/interfaces/IThinkingStyleService";
import type { TimestampQuestionnaireEntryObject } from "$lib/interfaces/ITimestampQuestionnaireService";
import { thinkingStyleElligibleQuestionnaireQuestions } from "../../configs/thinkingStyleElligibleQuestionnaireQuestions";

export class ThinkingStyleService implements IThinkingStyleService {

    // Keep score in an object, where the key is a sessionId.. in it, there is a object with the score
    score: Record<string, ThinkingStyleResult> = {};

    async saveThinkingStyle(entry: TimestampQuestionnaireEntryObject): Promise<void> {
        const questionInfo = thinkingStyleElligibleQuestionnaireQuestions.find(q => q.questionId === entry.question);
        if (!questionInfo) return;
        const originalAnswer = parseInt(entry.answer);
        if (isNaN(originalAnswer)) {
            console.warn(`Answer for question ${entry.question} is not a number`);
            return;
        }
        // check if reversed, in this settings, numbers are alwas 0-5...
        const MAXIMUM_ANSWER = 5;
        const answer = questionInfo.isReversed ? MAXIMUM_ANSWER - originalAnswer : originalAnswer;
        this.score[entry.sessionId][questionInfo.subscale] += answer;
    }

    getThinkingStyle(sessionId: string): ThinkingStyleResult {
        if (!this.score[sessionId]) {
            throw new Error("No entry for sessionId");
        }
        return this.score[sessionId];
    }

}
