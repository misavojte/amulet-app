<script lang="ts">
	import { GameScoreGetterServiceStore } from '$lib/services/GameScoreGetterService';
	import type { GameStateStore } from '../stores/GameState';
	import ResultScorePlot from './ResultScorePlot.svelte';
	import { _ } from 'svelte-i18n';
	import type { ITimestampGameService } from '$lib';

	export let gameStateStore: GameStateStore;
	export let timestampService: ITimestampGameService;

	const service = new GameScoreGetterServiceStore(gameStateStore);
	console.warn(timestampService);
	timestampService.writeGameScore();
</script>

<div
	class="max-w-screen-md w-96 h-72 flex flex-col justify-between items-center mx-auto aspect-[4/3]"
>
	<ResultScorePlot {service} />
</div>
<p class="text-center text-sm text-neutral-700">
	{$_({
		id: 'result.s.description',
		values: { score: service.getUserScore() }
	})}
</p>
