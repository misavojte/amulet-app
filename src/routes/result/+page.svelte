<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	const getData = async (urlSearchParams: URLSearchParams) => {
		const searchParamEntries = {
			...Object.fromEntries(urlSearchParams.entries())
		};

		return {
			thinkingStyle: getThinkingStyleDataset(searchParamEntries)
		};
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

	$: datasets = browser && getData($page.url.searchParams);
</script>
