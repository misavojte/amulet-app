<script lang="ts">
	import QuestionnaireFill from './QuestionnaireFill.svelte';

	export let processDone: (data: any) => Promise<void> = async () => {
		new Promise<void>((resolve) => {
			setTimeout(() => {
				resolve();
			}, 1000);
		});
	};

	const handleQuestionnaireDone = (data: any) => {
		promise = processDone(data);
	};

	let promise: Promise<void> | null = null;
</script>

<div class="w-full h-full grid grid-rows-12 grow overflow-hidden">
	{#if promise}
		{#await promise}
			<div class="center">
				<p>Loading...</p>
			</div>
		{:then x}
			<div>
				<p>Done!</p>
			</div>
		{:catch e}
			<div>
				<p>Error: {e.message}</p>
			</div>
		{/await}
	{:else}
		<QuestionnaireFill on:questionnaireDone={handleQuestionnaireDone} />
	{/if}
</div>
