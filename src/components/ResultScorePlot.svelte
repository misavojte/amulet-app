<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { browser } from '$app/environment';
	import UiLoader from './UILoader.svelte';
	import UiError from './UIError.svelte';
	import type { IGameScoreGetterService } from '$lib/interfaces/IGameScoreGetterService';
	import ResultScorePlotFigure from './ResultScorePlotFigure.svelte';

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
					data: [userScore],
					backgroundColor: ['rgba(247, 70, 74, 0.5)'],
					label: $_('result.s.you')
				},
				{
					data: [averageScore],
					backgroundColor: ['rgba(70, 191, 189, 0.5)'],
					label: $_('result.s.average')
				},
				{
					data: [bestScore],
					backgroundColor: ['rgba(253, 180, 92, 0.5)'],
					label: $_('result.s.best')
				}
			],
			labels: [$_('result.s.title')]
		};
	};
</script>

<div class="aspect-square w-full flex items-center justify-center">
	{#if browser}
		{#await getData()}
			<UiLoader />
		{:then dataset}
			<ResultScorePlotFigure data={dataset} />
		{:catch error}
			<UiError message={error.message} />
		{/await}
	{:else}
		<UiLoader />
	{/if}
</div>
