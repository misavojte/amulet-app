<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import UiLoader from './UILoader.svelte';
	import UiError from './UIError.svelte';
	import ResultPolarPlot from './ResultPolarPlot.svelte';

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
						parseFloatAndNormalize(urlSearchParamEntries.a),
						parseFloatAndNormalize(urlSearchParamEntries.b),
						parseFloatAndNormalize(urlSearchParamEntries.c)
					],
					backgroundColor: [
						'rgba(247, 70, 74, 0.5)',
						'rgba(70, 191, 189, 0.5)',
						'rgba(253, 180, 92, 0.5)',
						'rgba(148, 159, 177, 0.5)'
					]
				}
			],
			labels: [scoreLabels.ibiF1, scoreLabels.ibiF2, scoreLabels.ibiF3]
		};
	};
</script>

<div class="container mx-auto p-4 flex flex-col items-center w-full">
	<h2 class="text-2xl font-bold">{$_('result.beliefinventory.title')}</h2>
	<p class="text-lg mt-4 mb-4 text-center">{$_('result.beliefinventory.description')}</p>
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
