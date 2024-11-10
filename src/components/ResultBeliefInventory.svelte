<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import UiLoader from './UILoader.svelte';
	import UiError from './UIError.svelte';
	import ResultPolarPlot from './ResultPolarPlot.svelte';
	import { colorPalette } from '../configs/palette';
	import ResultConcepts from './ResultConcepts.svelte';

	const getData = async () => {
		const urlSearchParams: URLSearchParams = new URLSearchParams($page.url.search);
		const searchParamEntries = {
			...Object.fromEntries(urlSearchParams.entries())
		};

		return getThinkingStyleDataset(searchParamEntries);
	};

	const parseFloatAndNormalize = (value: string) => {
		const parsed = Number.parseFloat(value);
		if (Number.isNaN(parsed)) {
			throw new Error('Invalid score data');
		}
		const MAXIMUM_POSSIBLE_SCORE = 50;
		const MINIMUM_POSSIBLE_SCORE = 0;
		if (parsed < MINIMUM_POSSIBLE_SCORE || parsed > MAXIMUM_POSSIBLE_SCORE) {
			throw new Error('Invalid score data');
		}
		return (parsed / MAXIMUM_POSSIBLE_SCORE) * 100;
	};

	const getThinkingStyleDataset = (urlSearchParamEntries: { [x: string]: string }) => {
		// 1. a is 'activelyOpenMindedThinking'
		// 2. b is 'closeMindedThinking'
		// 3. c is 'preferenceForIntuitiveThinking'
		// 4. d is  'preferenceForRationalThinking'
		const scoreLabels = {
			ibiF1: $_('result.ibiF1.title'),
			ibiF2: $_('result.ibiF2.title'),
			ibiF3: $_('result.ibiF3.title')
		};

		// if does not contain all keys from the score, throw an error
		if (!Object.keys(scoreLabels).every((key) => key in urlSearchParamEntries)) {
			throw new Error('Invalid score data');
		}

		return {
			datasets: [
				{
					data: [
						parseFloatAndNormalize(urlSearchParamEntries.ibiF1),
						parseFloatAndNormalize(urlSearchParamEntries.ibiF2),
						parseFloatAndNormalize(urlSearchParamEntries.ibiF3)
					],
					backgroundColor: [colorPalette.ibiF1, colorPalette.ibiF2, colorPalette.ibiF3]
				}
			],
			labels: [scoreLabels.ibiF1, scoreLabels.ibiF2, scoreLabels.ibiF3]
		};
	};

	const getConceptScores = () => {
		const urlSearchParams: URLSearchParams = new URLSearchParams($page.url.search);
		const searchParamEntries = {
			...Object.fromEntries(urlSearchParams.entries())
		};

		return [
			{
				title: $_('result.ibiF1.title'),
				description: $_('result.ibiF1.description'),
				value: parseFloatAndNormalize(searchParamEntries.ibiF1)
			},
			{
				title: $_('result.ibiF2.title'),
				description: $_('result.ibiF2.description'),
				value: parseFloatAndNormalize(searchParamEntries.ibiF2)
			},
			{
				title: $_('result.ibiF3.title'),
				description: $_('result.ibiF3.description'),
				value: parseFloatAndNormalize(searchParamEntries.ibiF3)
			}
		].sort((a, b) => b.value - a.value);
	};

	$: scores = getConceptScores();
</script>

<div class="container mx-auto p-4 flex flex-col items-center w-full my-10">
	<h2 class="text-2xl xl:text-3xl font-bold mb-4">{$_('result.beliefinventory.title')}</h2>
	<!-- <p class="text-lg mt-4 mb-4 text-center">{$_('result.beliefinventory.description')}</p> -->
	<div class="aspect-square w-full flex items-center justify-center mb-4">
		{#if browser}
			{#await getData()}
				<UiLoader />
			{:then dataset}
				<ResultPolarPlot data={dataset} />
			{:catch error}
				<UiError message={error.message} />
			{/await}
		{:else}
			<UiLoader />
		{/if}
	</div>
	<ResultConcepts {scores} min={0} max={100} />
</div>
