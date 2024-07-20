<script lang="ts">
	import { type ITimestampQuestionnaireService } from '$lib';
	import { type IQuestionConfig } from '$lib/interfaces/IConfig';
	import QuestionnaireFill from './QuestionnaireFill.svelte';

	export let questionnaireInterface: ITimestampQuestionnaireService;
	export let questionConfig: IQuestionConfig;

	const handleQuestionnaireDone = (data: any) => {
		promise = questionnaireInterface.saveQuestionnaire(data);
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
		<QuestionnaireFill
			{questionConfig}
			on:questionnaireDone={handleQuestionnaireDone}
			on:questionnaireStart={() => questionnaireInterface.startQuestionnaire()}
			on:questionnaireAnswer={(e) =>
				questionnaireInterface.saveTimestampQuestionnaire(e.detail.id, e.detail.value)}
		/>
	{/if}
</div>
