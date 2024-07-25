<script lang="ts">
	import GameModalStart from './GameModalStart.svelte';
	import GameModalEnd from './GameModalEnd.svelte';
	import { _ } from 'svelte-i18n';

	import type { TimestampGameType } from '$lib';

	import ConfettiWrapper from './ConfettiWrapper.svelte';
	import type { GameStateStore } from '../stores/GameState';
	import GamePerspective from './GamePerspective.svelte';
	import type { ITimestampGameService } from '$lib/interfaces/ITimestampGameService';

	export let timestampService: ITimestampGameService;
	export let gameState: GameStateStore;

	let shouldSaveNewRoundTimestampGame = true;
	let hasWonPreviousRound = false;

	const createTimestampGameEntry = (type: TimestampGameType) => {
		void timestampService.saveTimestampGame(type);
	};

	$: {
		if (
			($gameState.gameStage === 'BoxDecision' || $gameState.gameStage === 'AmuletDecision') &&
			shouldSaveNewRoundTimestampGame
		) {
			createTimestampGameEntry('round');
			shouldSaveNewRoundTimestampGame = false;
		}
	}

	const playWithAmulet = (state: string): (() => boolean) => {
		if (!$gameState) throw new Error('Game state is not set');
		switch (state) {
			case 'AlwaysWin':
				return () => true;
			case 'AlwaysLose':
				return () => false;
			case 'ZigZag': {
				const round = $gameState.config.numberOfRounds - $gameState.numberOfRounds;
				let hasWon = Math.random() < 0.5;
				if (round !== 0) {
					hasWon = !hasWonPreviousRound;
				}
				return () => hasWon;
			}
			default:
				return () => Math.random() < 0.5;
		}
	};

	const playWithoutAmulet = () => Math.random() < 0.5;

	const play = (state: string, hasAmulet: boolean): boolean => {
		if (hasAmulet) return playWithAmulet(state)();
		return playWithoutAmulet();
	};

	const playRound = (e: CustomEvent): void => {
		console.log('Playing round', e.detail.id);
		if (!$gameState) throw new Error('Game state is not set');
		const hasWon = play($gameState.scenario, $gameState.hasAmulet);
		hasWonPreviousRound = hasWon;
		const typeOfBox: 'leftBox' | 'rightBox' = e.detail.id === 1 ? 'leftBox' : 'rightBox';
		const type: 'leftBoxWin' | 'leftBoxLoss' | 'rightBoxWin' | 'rightBoxLoss' = hasWon
			? `${typeOfBox}Win`
			: `${typeOfBox}Loss`;
		//createTimestampGameEntry(type);
		timestampService.saveTimestampGame(type);
		gameState.progressFromBoxDecision(hasWon);
		shouldSaveNewRoundTimestampGame = true;
	};

	const handleBuyAmulet = () => {
		createTimestampGameEntry('amuletBuy');
		gameState.purchaseAmulet(true);
	};

	const handleRejectAmulet = () => {
		createTimestampGameEntry('amuletReject');
		gameState.purchaseAmulet(false);
	};
</script>

<div class="central-holder">
	{#if $gameState?.gameStage === 'Start'}
		<GameModalStart />
	{/if}
	{#if $gameState?.gameStage === 'End'}
		<GameModalEnd {timestampService} on:gameCompleteEnd />
	{/if}
	<!-- Note that position and therefore visibility of boxes and amulet are controlled by the gameState -->
	<GamePerspective
		on:openTopEvent={(e) => playRound(e)}
		on:buyAmulet={handleBuyAmulet}
		on:refuseAmulet={handleRejectAmulet}
	/>
</div>
<ConfettiWrapper />

<style>
	@import url('https://fonts.googleapis.com/css2?family=Parisienne&display=swap');
	.central-holder {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 1px;
		flex-grow: 1;
		width: 100%;
		min-width: 1200px;
		overflow: hidden;
		position: relative;
	}
</style>
