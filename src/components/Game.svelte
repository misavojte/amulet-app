<script lang="ts">
	import Start from './Start.svelte';
	import End from './End.svelte';
	import { _ } from 'svelte-i18n';

	import type { TimestampType } from '$lib';

	import ConfettiWrapper from './ConfettiWrapper.svelte';
	import type { GameStateStore } from '../stores/GameState';
	import { getContext } from 'svelte';
	import { TimestampService } from '$lib/services/TimestampService';
	import GamePerspective from './GamePerspective.svelte';
	const gameState: GameStateStore = getContext('gameState');

	export let userId: string;

	let shouldSaveNewRoundTimestamp = true;

	let hasWonPreviousRound = false;

	const timestampService = new TimestampService();
	const createTimestampEntry = (type: TimestampType) => {
		void timestampService.saveTimestamp(type);
	};

	$: {
		if (
			($gameState.gameStage === 'BoxDecision' || $gameState.gameStage === 'AmuletDecision') &&
			shouldSaveNewRoundTimestamp
		) {
			createTimestampEntry('round');
			shouldSaveNewRoundTimestamp = false;
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
		if (!$gameState) throw new Error('Game state is not set');
		const hasWon = play($gameState.scenario, $gameState.hasAmulet);
		hasWonPreviousRound = hasWon;
		const typeOfBox: 'leftBox' | 'rightBox' = e.detail.id === 1 ? 'leftBox' : 'rightBox';
		const type: 'leftBoxWin' | 'leftBoxLoss' | 'rightBoxWin' | 'rightBoxLoss' = hasWon
			? `${typeOfBox}Win`
			: `${typeOfBox}Loss`;
		createTimestampEntry(type);
		gameState.progressFromBoxDecision(hasWon);
		shouldSaveNewRoundTimestamp = true;
	};

	const handleBuyAmulet = () => {
		createTimestampEntry('amuletBuy');
		gameState.purchaseAmulet(true);
	};

	const handleRejectAmulet = () => {
		createTimestampEntry('amuletReject');
		gameState.purchaseAmulet(false);
	};
</script>

<div class="central-holder">
	{#if $gameState?.gameStage === 'Start'}
		<Start />
	{/if}
	{#if $gameState?.gameStage === 'End'}
		<End />
	{/if}
	<!-- Note that position and therefore visibility of boxes and amulet are controlled by the gameState -->
	<GamePerspective
		on:openTopEvent={playRound}
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
		position: relative;
	}
</style>
