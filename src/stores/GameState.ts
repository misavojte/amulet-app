import { get, writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { GameConfig, GameState } from '$lib';
import { updateState } from '$lib/utils/storeUtils';

export interface GameStateStore extends Writable<GameState> {
	reset: () => void;
	updateState: (updates: Partial<GameState>) => void;
	purchaseAmulet: (purchase: boolean) => boolean;
	repeat: () => void;
	progressFromBoxDecision: (win: boolean) => void;
}

/**
 * Purchase the amulet if the player has enough score and does not already own it
 * @param state The game state
 * @returns True if the amulet was purchased, false if not
 */
export const purchaseAmulet = (state: Writable<GameState>, purchase: boolean): boolean => {
	if (!purchase) {
		updateState(state, { gameStage: 'BoxDecision' });
		return false;
	}
	const price = get(state).config.priceOfAmulet;
	if (get(state).hasAmulet || get(state).blockInteraction || get(state).score < price) {
		return false; // No changes if interaction is blocked
	} else {
		updateState(state, {
			score: get(state).score - price,
			hasAmulet: true,
			gameStage: 'BoxDecision'
		});
		return true;
	}
};

export const createGameState = (config: GameConfig): GameStateStore => {
	const store = writable<GameState>(createInitialGameState(config));
	const { subscribe, set, update } = store;
	return {
		subscribe,
		update,
		set,
		reset: () => set(createInitialGameState(config)),
		updateState: (updates: Partial<GameState>) => updateState(store, updates),
		purchaseAmulet: (purchase: boolean) => purchaseAmulet(store, purchase),
		repeat: () => repeatGameState(store, config),
		progressFromBoxDecision: (win: boolean) => progressFromBoxDecision(store, win)
	};
};

const createInitialGameState = (config: GameConfig): GameState => ({
	allowRepeat: false, // todo
	hasAmulet: false,
	numberOfRounds: config.numberOfRounds,
	hasCurrentlyWon: false,
	blockInteraction: false,
	scenario: config.scenario,
	gameStage: 'Start',
	score: config.startScore,
	numberOfRepeats: 0,
	config
});

export const repeatGameState = (state: Writable<GameState>, config: GameConfig) => {
	state.update((state) => {
		return {
			...state,
			hasAmulet: false,
			numberOfRounds: config.numberOfRounds,
			hasCurrentlyWon: false,
			scenario: config.scenario,
			gameStage: 'AmuletDecision',
			score: config.startScore,
			numberOfRepeats: state.numberOfRepeats + 1
		};
	});
};

export const progressFromBoxDecision = (state: Writable<GameState>, win: boolean) => {
	// Choose next game stage based on number of rounds left
	const nextGameStage = get(state).numberOfRounds > 1 ? 'AmuletDecision' : 'End';
	const delayOfNextStage = win ? 3000 : 2000;

	updateState(state, {
		gameStage: 'AfterBoxDecision', // 'AfterBoxDecision' is a temporary stage to show the result of the box decision before moving to the next stage
		hasCurrentlyWon: win,
		blockInteraction: true,
		numberOfRounds: get(state).numberOfRounds - 1,
		hasAmulet: false,
		score: win ? get(state).score + get(state).config.scoreOnWin : get(state).score
	});

	setTimeout(() => {
		updateState(state, {
			gameStage: nextGameStage,
			blockInteraction: false,
			hasCurrentlyWon: false
		});
	}, delayOfNextStage);
};
