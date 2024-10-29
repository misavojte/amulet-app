<script lang="ts">
	import RoundedWrapper from './GameModal.svelte';
	import { _ } from 'svelte-i18n';
	import type { GameStateStore } from '../stores/GameState';
	import { getContext } from 'svelte';
	import GameModalEndScore from './GameModalEndScore.svelte';
	import UiButton from './UIButton.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { ITimestampGameService } from '$lib';
	import { get } from 'svelte/store';

	export let timestampService: ITimestampGameService;

	const dispatch = createEventDispatcher();

	const gameStateStore: GameStateStore = getContext('gameState');

	const signalEnd = () => {
		dispatch('gameCompleteEnd', get(gameStateStore));
	};
</script>

<RoundedWrapper>
	<h1 class="text-center text-2xl font-bold">
		{$_('end.title')}
	</h1>
	<GameModalEndScore {gameStateStore} {timestampService} />
	{#if $gameStateStore.allowRepeat}
		<UiButton on:click={() => gameStateStore.repeat()} text={$_('end.repeat')} />
	{:else}
		<p class="text-center text-sm text-neutral-700">
			{$_('end.noRepeat')}
		</p>
		<UiButton on:click={signalEnd} text={$_('start.start')} />
	{/if}
</RoundedWrapper>
