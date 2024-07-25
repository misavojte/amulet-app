<script lang="ts">
	import type { IGameScoreGetterService } from '$lib/interfaces/IGameScoreGetterService';
	import { GameScoreGetterServiceUrl } from '$lib/services/GameScoreGetterService';
	import ResultScorePlot from './ResultScorePlot.svelte';
	import { _ } from 'svelte-i18n';

	const service: IGameScoreGetterService = new GameScoreGetterServiceUrl();

	let score = 0;
	try {
		score = service.getUserScore();
	} catch (error) {
		console.error(error);
		score = 0;
	}
</script>

<div class="container mx-auto p-4 flex flex-col items-center w-full">
	<h2 class="text-2xl font-bold">{$_('result.s.title')}</h2>
	<p class="text-lg mt-4 mb-4 text-center">
		{$_({
			id: 'result.s.description',
			values: { score }
		})}
	</p>
	<ResultScorePlot {service} />
</div>
