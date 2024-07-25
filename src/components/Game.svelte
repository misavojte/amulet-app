<script lang="ts">
	import GameFrame from './GameFrame.svelte';

	import type { GameConfig } from '$lib';
	import { setContext, getContext } from 'svelte';
	import { createGameState } from '../stores/GameState';
	import type { ITimestampGameService } from '$lib/interfaces/ITimestampGameService';
	import type { UserStateStore } from '../stores/UserState';
	import UiError from './UIError.svelte';

	export let gameConfig: GameConfig;
	export let timestampService: ITimestampGameService;

	let errorMessage: string[] = [];

	const gameState = createGameState(gameConfig);
	setContext('gameState', gameState);

	const userState = getContext<UserStateStore>('userState');
	if (!userState) {
		errorMessage.push('User state is not set');
	}
	timestampService.init(gameState, userState);
</script>

<div
	class="flex absolute top-0 left-0 flex-col items-center justify-center w-screen h-screen overflow-hidden z-10 bg-white"
>
	{#if errorMessage.length > 0}
		<UiError message={errorMessage.join('< br />')} />
	{:else}
		<GameFrame {timestampService} {gameState} on:gameCompleteEnd />
	{/if}
</div>
