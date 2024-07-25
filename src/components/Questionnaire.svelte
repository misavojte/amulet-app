<script lang="ts">
	import { type ITimestampQuestionnaireService } from '$lib';
	import { type IQuestionConfig } from '$lib/interfaces/IConfig';
	import type { QuestionnaireScore } from '$lib/interfaces/ITimestampQuestionnaireService';
	import QuestionnaireFill from './QuestionnaireFill.svelte';
	import UiLoader from './UILoader.svelte';

	import { createEventDispatcher } from 'svelte';

	export let questionnaireInterface: ITimestampQuestionnaireService;
	export let questionConfig: IQuestionConfig;

	const dispatch = createEventDispatcher();

	const handleQuestionnaireDone = (
		event: CustomEvent<
			{
				id: string;
				value: string;
				required: boolean;
			}[]
		>
	) => {
		promise = questionnaireInterface.saveQuestionnaire(event.detail);
		promise
			.then((data: QuestionnaireScore) => {
				console.info('Questionnaire saved');
				dispatch('questionnaireSaved', data);
			})
			.catch((e: Error) => {
				console.warn(e);
				dispatch('questionnaireError', e);
			});
	};

	let promise: Promise<QuestionnaireScore> | null = null;
</script>

<div class="w-full h-full grid grid-rows-12 grow overflow-hidden">
	{#if promise}
		<div class="flex justify-center items-center row-span-12">
			<UiLoader />
		</div>
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
