<script lang="ts">
	import Game from './Game.svelte';
	import { getAuthAnonymousUser } from '../firebase';
	import { Circle3 } from 'svelte-loading-spinners';

	import { _, init, addMessages } from 'svelte-i18n';
	import cs from '../locales/cs.json';
	import pl from '../locales/pl.json';
	import type { GameConfig } from '$lib';
	import { setContext } from 'svelte';
	import { createGameState } from '../stores/GameState';
	import { createUserState } from '../stores/UserState';

	export let locale: 'cs' | 'pl' = 'pl';
	export let gameConfig: GameConfig;

	addMessages('cs', cs);
	addMessages('pl', pl);

	const gameState = createGameState(gameConfig);
	setContext('gameState', gameState);

	const userState = createUserState();
	setContext('userState', userState);

	init({
		fallbackLocale: 'cs',
		initialLocale: locale
	});

	let userId: string = '';

	let isReady = false;

	const load = async () => {
		userId = await getAuthAnonymousUser();
		userState.updateState({ id: userId });
		isReady = true;
	};

	load();
</script>

<svelte:head>
	<title>{$_('app.title')}</title>
</svelte:head>

{#if !isReady}
	<div class="overflow-hidden w-screen">
		<div class="center">
			<Circle3 />
			<p>
				{$_('app.load')}
			</p>
		</div>
	</div>
{:else}
	<div class="center">
		<Game {userId} />
	</div>
{/if}

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
	.center {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-flow: column;
		height: 100%;
		width: 100%;
		overflow: auto;
	}
</style>
