import type { StartQuestionnaireEntryObject, ITimestampQuestionAmuletService, QuestionnaireScore } from "$lib/interfaces/IQuestionAmulet";
import type { TimestampQuestionnaireEntryObject } from "$lib";
import { getAuthAnonymousUser, writeStandaloneQuestionnaireScore, writeStandaloneTimestampQuestionnaire } from "../../firebase";
import { BeliefInventoryService } from "./BeliefInventoryService";
import { ThinkingStyleService } from "./ThinkingStyleService";

export class StandaloneQuestionnaireService implements ITimestampQuestionAmuletService {
    userId: string | null = null;
    sessionId: string | null = null;
    beliefInventoryService = new BeliefInventoryService();
    thinkingStyleService = new ThinkingStyleService();
    lastScore: QuestionnaireScore | null = null;

    private async ensureUserAndSession(): Promise<{ userId: string; sessionId: string }> {
        if (!this.userId) {
            try {
                this.userId = await getAuthAnonymousUser();
            } catch {
                this.userId = `anon_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
            }
        }
        if (!this.sessionId) {
            this.sessionId = `standalone_session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        }
        return { userId: this.userId, sessionId: this.sessionId };
    }

    async startQuestions(): Promise<void> {
        const { userId, sessionId } = await this.ensureUserAndSession();
        const timestampEntry: StartQuestionnaireEntryObject = {
            timestamp: Date.now(),
            type: 'start',
            userId,
            sessionId
        };
        return writeStandaloneTimestampQuestionnaire(timestampEntry);
    }

    async saveTimestampQuestion(question: string, answer: string): Promise<void> {
        const { userId, sessionId } = await this.ensureUserAndSession();
        const timestampEntry: TimestampQuestionnaireEntryObject = {
            timestamp: Date.now(),
            type: 'answer',
            question,
            answer,
            userId,
            sessionId
        };
        return writeStandaloneTimestampQuestionnaire(timestampEntry);
    }

    getScore(data: { id: string; value: string }[]): QuestionnaireScore {
        const userId = this.userId || 'unknown_user';
        const sessionId = this.sessionId || 'unknown_session';
        const metaQuestions: Record<string, string> = {};

        data.forEach(({ id, value }) => {
            const capturedByBelief = this.beliefInventoryService.saveBeliefInventory(id, value);
            const capturedByThinking = this.thinkingStyleService.saveThinkingStyle(id, value);
            if (!capturedByBelief && !capturedByThinking) {
                metaQuestions[id] = value;
            }
        });

        const beliefInventory = this.beliefInventoryService.getBeliefInventory();
        const thinkingStyle = this.thinkingStyleService.getThinkingStyle();

        const questionnaireScore: QuestionnaireScore = {
            ...beliefInventory,
            ...thinkingStyle,
            ...metaQuestions,
            userId,
            sessionId,
            timestamp: Date.now()
        };

        this.lastScore = questionnaireScore;
        return questionnaireScore;
    }

    async saveQuestions(data: { id: string; value: string }[]): Promise<void> {
        await this.ensureUserAndSession();
        const score = this.getScore(data);
        await writeStandaloneQuestionnaireScore(score);
    }
}
