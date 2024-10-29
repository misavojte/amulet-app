<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import UiLoader from './UILoader.svelte';
	import ResultThinkingStylePlot from './ResultPolarPlot.svelte';
	import UiError from './UIError.svelte';
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
		const MAXIMUM_POSSIBLE_SCORE = 30;
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
			a: $_('result.a.title'),
			b: $_('result.b.title'),
			c: $_('result.c.title'),
			d: $_('result.d.title')
		};

		// if does not contain all keys from the score, throw an error
		if (!Object.keys(scoreLabels).every((key) => key in urlSearchParamEntries)) {
			throw new Error('Invalid score data');
		}

		return {
			datasets: [
				{
					data: [
						parseFloatAndNormalize(urlSearchParamEntries.a),
						parseFloatAndNormalize(urlSearchParamEntries.b),
						parseFloatAndNormalize(urlSearchParamEntries.c),
						parseFloatAndNormalize(urlSearchParamEntries.d)
					],
					backgroundColor: [colorPalette.a, colorPalette.b, colorPalette.c, colorPalette.d]
				}
			],
			labels: [scoreLabels.a, scoreLabels.b, scoreLabels.c, scoreLabels.d]
		};
	};

	const getConceptScores = () => {
		const urlSearchParams: URLSearchParams = new URLSearchParams($page.url.search);
		const searchParamEntries = {
			...Object.fromEntries(urlSearchParams.entries())
		};

		return [
			{
				title: $_('result.a.title'),
				description: $_('result.a.description'),
				value: parseFloatAndNormalize(searchParamEntries.a)
			},
			{
				title: $_('result.b.title'),
				description: $_('result.b.description'),
				value: parseFloatAndNormalize(searchParamEntries.b)
			},
			{
				title: $_('result.c.title'),
				description: $_('result.c.description'),
				value: parseFloatAndNormalize(searchParamEntries.c)
			},
			{
				title: $_('result.d.title'),
				description: $_('result.d.description'),
				value: parseFloatAndNormalize(searchParamEntries.d)
			}
		].sort((a, b) => b.value - a.value);
	};

	$: scores = getConceptScores();
</script>

<div class="container mx-auto p-4 flex flex-col items-center w-full my-10">
	<h2 class="text-2xl font-bold">{$_('result.thinkingstyle.title')}</h2>
	<!-- <p class="text-lg mt-4 mb-4 text-center">{$_('result.thinkingstyle.description')}</p> -->
	<div class="aspect-square w-full flex items-center justify-center mb-4">
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
	<ResultConcepts {scores} min={0} max={100} />
</div>
