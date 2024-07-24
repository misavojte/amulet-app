import type { ThinkingStyleResult, IThinkingStyleService } from "$lib/interfaces/IThinkingStyleService";
import type { TimestampQuestionnaireEntryObject } from "$lib/interfaces/ITimestampQuestionnaireService";
import { thinkingStyleElligibleQuestionnaireQuestions } from "../../configs/thinkingStyleElligibleQuestionnaireQuestions";

export class ThinkingStyleService implements IThinkingStyleService {

    // Keep score in an object, where the key is a sessionId.. in it, there is a object with the score
    score: ThinkingStyleResult = {
        activelyOpenMindedThinking: 0,
        closeMindedThinking: 0,
        preferenceForIntuitiveThinking: 0,
        preferenceForRationalThinking: 0,
    };

    saveThinkingStyle(entry: TimestampQuestionnaireEntryObject): boolean {
        const questionInfo = thinkingStyleElligibleQuestionnaireQuestions.find(q => q.questionId === entry.question);
        if (!questionInfo) return false;
        const originalAnswer = parseInt(entry.answer);
        if (isNaN(originalAnswer)) {
            console.warn(`Answer for question ${entry.question} is not a number`);
            return false;
        }
        // check if reversed, in this settings, numbers are alwas 0-5...
        const MAXIMUM_ANSWER_VALUE = 5;
        const answer = questionInfo.isReversed ? MAXIMUM_ANSWER_VALUE - originalAnswer : originalAnswer;
        this.score[questionInfo.subscale] += answer;
        return true;
    }

    getThinkingStyle(): ThinkingStyleResult {
        return this.score;
    }

}
