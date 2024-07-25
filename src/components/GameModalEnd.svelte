<script lang="ts">
	import RoundedWrapper from './GameModal.svelte';
	import { _ } from 'svelte-i18n';
	import type { GameStateStore } from '../stores/GameState';
	import { getContext } from 'svelte';
	import GameModalEndScore from './GameModalEndScore.svelte';
	import UiButton from './UIButton.svelte';
	import type { ITimestampGameService } from '$lib';

	export let timestampService: ITimestampGameService;
	console.warn(timestampService, 'timestampService in GME');

	const gameStateStore: GameStateStore = getContext('gameState');
</script>

<RoundedWrapper>
	<h1 class="text-center text-2xl font-bold">
		{$_('end.title')}
	</h1>
	<GameModalEndScore {gameStateStore} {timestampService} />
	{#if $gameStateStore.allowRepeat}
		<UiButton on:click={() => gameStateStore.repeat()} text={$_('end.repeat')} />
	{:else}
		<todo></todo>
	{/if}
</RoundedWrapper>
