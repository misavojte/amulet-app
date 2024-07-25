import type { GameScoreEntry, ITimestampGameService } from "$lib/interfaces/ITimestampGameService";
import type { TimestampGameType } from "$lib";
import type { GameStateStore } from "../../stores/GameState";
import type { UserStateStore } from "../../stores/UserState";

export abstract class AbstractTimestampGameService implements ITimestampGameService {
    gameState: GameStateStore | null = null;
    userState: UserStateStore | null = null;

    init = (gameState: GameStateStore, userState: UserStateStore) => {
        this.gameState = gameState;
        this.userState = userState;
    }

    abstract saveTimestampGame(type: TimestampGameType): Promise<void>;
    abstract writeGameScore(): Promise<GameScoreEntry>;
}