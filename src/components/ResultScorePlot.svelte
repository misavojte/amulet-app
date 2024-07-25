<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import UiLoader from './UILoader.svelte';
	import ResultThinkingStylePlot from './ResultThinkingStylePlot.svelte';
	import UiError from './UIError.svelte';

	export let userScoreSource: 'URLSearchParams' | 'GameStateStore' = 'URLSearchParams';

	const getData = async () => {
		const userScore =
			userScoreSource === 'URLSearchParams'
				? getUserScoreDatasetFromSearchParam()
				: getScoreDatasetFromGameStateStore();

		const averageScore = 50;
		const bestScore = 80;

		return getScoreDatasetStructure(userScore, averageScore, bestScore);
	};

	const parseFloatAndNormalize = (value: string) => {
		const parsed = Number.parseFloat(value);
		if (Number.isNaN(parsed)) {
			throw new Error('Invalid score data');
		}
		const MAXIMUM_POSSIBLE_SCORE = 30;
		const MINIMUM_POSSIBLE_SCORE = 0;
		if (parsed < MINIMUM_POSSIBLE_SCORE || parsed > MAXIMUM_POSSIBLE_SCORE) {
			throw new Error('Invalid score data');
		}
		return (parsed / MAXIMUM_POSSIBLE_SCORE) * 100;
	};

	const getUserScoreDatasetFromSearchParam = () => {
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

		return parseFloatAndNormalize(urlSearchParamEntries.s);
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
