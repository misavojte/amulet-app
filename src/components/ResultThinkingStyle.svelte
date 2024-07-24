<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import UiLoader from './UILoader.svelte';
	import ResultThinkingStylePlot from './ResultThinkingStylePlot.svelte';
	import UiError from './UIError.svelte';

	const getData = async () => {
		if (!browser) {
			Promise.reject(new Error('Not running in browser'));
		}
		const urlSearchParams: URLSearchParams = new URLSearchParams($page.url.search);
		const searchParamEntries = {
			...Object.fromEntries(urlSearchParams.entries())
		};

		return getThinkingStyleDataset(searchParamEntries);
	};

	const parseFloat = (value: string) => {
		const parsed = Number.parseFloat(value);
		if (Number.isNaN(parsed)) {
			throw new Error('Invalid score data');
		}
		return parsed;
	};

	const getThinkingStyleDataset = (urlSearchParamEntries: { [x: string]: string }) => {
		// 1. a is 'activelyOpenMindedThinking'
		// 2. b is 'closeMindedThinking'
		// 3. c is 'preferenceForIntuitiveThinking'
		// 4. d is  'preferenceForRationalThinking'
		const scoreLabels = {
			a: $_('result.a.name'),
			b: $_('result.b.name'),
			c: $_('result.c.name'),
			d: $_('result.d.name')
		};

		// if does not contain all keys from the score, throw an error
		if (!Object.keys(scoreLabels).every((key) => key in urlSearchParamEntries)) {
			throw new Error('Invalid score data');
		}

		return {
			datasets: [
				{
					data: [
						parseFloat(urlSearchParamEntries.a),
						parseFloat(urlSearchParamEntries.b),
						parseFloat(urlSearchParamEntries.c),
						parseFloat(urlSearchParamEntries.d)
					],
					backgroundColor: [
						'rgba(247, 70, 74, 0.5)',
						'rgba(70, 191, 189, 0.5)',
						'rgba(253, 180, 92, 0.5)',
						'rgba(148, 159, 177, 0.5)'
					]
				}
			],
			labels: [scoreLabels.a, scoreLabels.b, scoreLabels.c, scoreLabels.d]
		};
	};

	let dataset = getData();
	console.log(dataset);
</script>

<div class="container mx-auto p-4 flex flex-col items-center w-full">
	<h2 class="text-2xl font-bold">{$_('result.thinkingstyle.title')}</h2>
	<p class="text-lg mt-4 mb-4">{$_('result.thinkingstyle.description')}</p>
	<div class="aspect-square w-full flex items-center justify-center">
		{#await dataset}
			<UiLoader />
		{:then dataset}
			<ResultThinkingStylePlot data={dataset} />
		{:catch error}
			<UiError message={error.message} />
		{/await}
	</div>
</div>
