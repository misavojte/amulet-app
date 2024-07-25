<script lang="ts">
	import GameAmuletObject from './GameAmuletObject.svelte';
	import GameAmuletRefuse from './GameAmuletRefuse.svelte';
	import type { GameStateStore } from '../stores/GameState';
	import { getContext } from 'svelte';

	const gameState: GameStateStore = getContext('gameState');

	$: console.log($gameState.gameStage);
</script>

<div class="relative w-96 h-96 flex justify-center items-center">
	<GameAmuletObject length={200} on:buyAmulet />
	<GameAmuletRefuse isShown={$gameState.gameStage === 'AmuletDecision'} on:refuseAmulet />
</div>

<style>
	div {
		transform-style: preserve-3d;
	}
</style>
