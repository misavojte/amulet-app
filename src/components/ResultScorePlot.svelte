<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import UiLoader from './UILoader.svelte';
	import ResultThinkingStylePlot from './ResultThinkingStylePlot.svelte';
	import UiError from './UIError.svelte';
	import { getContext } from 'svelte';
	import type { GameStateStore } from '../stores/GameState';
	import { get } from 'svelte/store';
	import type { IGameScoreService } from '$lib/interfaces/IGameScoreService';

	export let userScoreSource: 'URLSearchParams' | 'GameStateStore' = 'URLSearchParams';

	const getData = async () => {
		const userScore =
			userScoreSource === 'URLSearchParams'
				? getUserScoreFromSearchParam()
				: getUserScoreFromGameStateStore();

		const gameScoreService = getContext<IGameScoreService>('gameScoreService');
		if (!gameScoreService) {
			throw new Error('Game score service is not set through context');
		}
		const { averageScore, bestScore } = await gameScoreService.getGameScores();
		return getScoreDatasetStructure(userScore, averageScore, bestScore);
	};

	const parseInt = (value: string) => {
		const parsed = Number.parseInt(value);
		if (Number.isNaN(parsed)) {
			throw new Error('Invalid score data');
		}
		return parsed;
	};

	const getUserScoreFromSearchParam = () => {
		const urlSearchParams: URLSearchParams = new URLSearchParams($page.url.search);
		const urlSearchParamEntries = {
			...Object.fromEntries(urlSearchParams.entries())
		};
		// 1. s is 'game score'
		const USER_SCORE_LABEL = 's';
		// if does not contain USER_SCORE_LABEL key from the score, throw an error
		if (!Object.keys(urlSearchParamEntries).includes(USER_SCORE_LABEL)) {
			throw new Error('Invalid score data');
		}

		return parseInt(urlSearchParamEntries.s);
	};

	const getUserScoreFromGameStateStore = () => {
		const gameState = getContext<GameStateStore>('gameState');
		if (!gameState) {
			throw new Error('Game state is not set');
		}
		const gameStateValue = get(gameState);
		if (!gameStateValue) {
			throw new Error('Game state is not set');
		}
		return gameStateValue.score;
	};

	const getScoreDatasetStructure = (userScore: number, averageScore: number, bestScore: number) => {
		return {
			datasets: [
				{
					data: [userScore, averageScore, bestScore],
					backgroundColor: [
						'rgba(247, 70, 74, 0.5)',
						'rgba(70, 191, 189, 0.5)',
						'rgba(253, 180, 92, 0.5)'
					]
				}
			],
			labels: [$_('result.s.you'), $_('result.s.average'), $_('result.s.best')]
		};
	};
</script>

<div class="aspect-square w-full flex items-center justify-center">
	{#if browser}
		{#await getData()}
			<UiLoader />
		{:then dataset}
			<ResultThinkingStylePlot data={dataset} />
		{:catch error}
			<UiError message={error.message} />
		{/await}
	{:else}
		<UiLoader />
	{/if}
</div>
