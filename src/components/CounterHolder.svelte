<script lang="ts">
	import Counter from './Counter.svelte';
	import { _ } from 'svelte-i18n';
	import type { GameStateStore } from '../stores/GameState';
	import { getContext } from 'svelte';
	const gameState: GameStateStore = getContext('gameState');
</script>

<div class="counter">
	<Counter count={$gameState?.numberOfRounds} text={$_('counter.rounds')} />
	<Counter count={$gameState?.score} text={$_('counter.score')} />
</div>

<style>
	.counter {
		text-align: center;
		margin-left: auto;
		justify-content: center;
		display: flex;
		flex-direction: column;
		width: 100%;
		align-items: center;
		transition: opacity 0.5s;
	}
</style>
