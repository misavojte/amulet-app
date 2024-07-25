<script>
	import { GameScoreGetterServiceMock } from '$lib/services/GameScoreGetterService';
	import ResultScorePlot from './ResultScorePlot.svelte';
	import { _ } from 'svelte-i18n';

	const service = new GameScoreGetterServiceMock();
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
