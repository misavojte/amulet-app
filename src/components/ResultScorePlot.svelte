<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { browser } from '$app/environment';
	import UiLoader from './UILoader.svelte';
	import ResultThinkingStylePlot from './ResultThinkingStylePlot.svelte';
	import UiError from './UIError.svelte';
	import type { IGameScoreGetterService } from '$lib/interfaces/IGameScoreGetterService';

	export let service: IGameScoreGetterService;

	const getData = async () => {
		const userScore = service.getUserScore();
		const { averageScore, bestScore } = await service.getGameScores();
		return getScoreDatasetStructure(userScore, averageScore, bestScore);
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
