<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import UiLoader from './UILoader.svelte';
	import UiError from './UIError.svelte';
	import ResultPolarPlot from './ResultPolarPlot.svelte';
	import { colorPalette } from '../configs/palette';

	const getData = async () => {
		const urlSearchParams: URLSearchParams = new URLSearchParams($page.url.search);
		const searchParamEntries = {
			...Object.fromEntries(urlSearchParams.entries())
		};

		return getThinkingStyleDataset(searchParamEntries);
	};

	const parseFloatAndNormalize = (value: string, min: number, max: number) => {
		const parsed = Number.parseFloat(value);
		if (Number.isNaN(parsed)) {
			throw new Error('Invalid score data');
		}
		if (parsed < min || parsed > max) {
			throw new Error('Invalid score data');
		}
		return (parsed / max) * 100;
	};

	const getThinkingStyleDataset = (urlSearchParamEntries: { [x: string]: string }) => {
		// 1. a is 'activelyOpenMindedThinking'
		// 2. b is 'closeMindedThinking'
		// 3. c is 'preferenceForIntuitiveThinking'
		// 4. d is  'preferenceForRationalThinking'
		const scoreLabels = {
			ibiF1: $_('result.ibiF1.title'),
			ibiF2: $_('result.ibiF2.title'),
			ibiF3: $_('result.ibiF3.title'),
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
						parseFloatAndNormalize(urlSearchParamEntries.ibiF1, 0, 50),
						parseFloatAndNormalize(urlSearchParamEntries.ibiF2, 0, 50),
						parseFloatAndNormalize(urlSearchParamEntries.ibiF3, 0, 50),
						parseFloatAndNormalize(urlSearchParamEntries.a, 0, 30),
						parseFloatAndNormalize(urlSearchParamEntries.b, 0, 30),
						parseFloatAndNormalize(urlSearchParamEntries.c, 0, 30),
						parseFloatAndNormalize(urlSearchParamEntries.d, 0, 30)
					],
					backgroundColor: [
						colorPalette.ibiF1,
						colorPalette.ibiF2,
						colorPalette.ibiF3,
						colorPalette.a,
						colorPalette.b,
						colorPalette.c,
						colorPalette.d
					]
				}
			],
			labels: [
				scoreLabels.ibiF1,
				scoreLabels.ibiF2,
				scoreLabels.ibiF3,
				scoreLabels.a,
				scoreLabels.b,
				scoreLabels.c,
				scoreLabels.d
			]
		};
	};
</script>

<div class="container mx-auto p-4 flex flex-col items-center w-full my-10">
	<h2 class="text-2xl font-bold">{$_('result.combined.title')}</h2>
	<p class="text-lg mt-4 mb-4 text-center">{$_('result.combined.description')}</p>
	<div class="aspect-square w-full flex items-center justify-center">
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
</div>
