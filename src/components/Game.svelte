<script lang="ts">
	import Game from './GameFrame.svelte';

	import type { GameConfig } from '$lib';
	import { setContext } from 'svelte';
	import { createGameState } from '../stores/GameState';

	export let gameConfig: GameConfig;
	export let user: {
		userId: string;
		sessionId: string;
	};

	const gameState = createGameState(gameConfig);
	setContext('gameState', gameState);
</script>

<div class="flex flex-col items-center justify-center w-full h-full overflow-auto">
	<Game {user} />
</div>

<style>
	:global(html, body) {
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
	}
	:global(body) {
		height: 100vh;
		display: flex;
		flex-direction: column;
		font-family:
			ui-sans-serif,
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			Segoe UI,
			Roboto,
			Helvetica Neue,
			Arial,
			Noto Sans,
			sans-serif,
			'Apple Color Emoji',
			'Segoe UI Emoji',
			Segoe UI Symbol,
			'Noto Color Emoji';
	}
</style>
