<script lang="ts">
	import QuestionnaireProgress from './QuestionnaireFillProgress.svelte';
	import QuestionnaireSelect from './QuestionnaireFillQuestionSelect.svelte';
	import { writable } from 'svelte/store';
	import { _ } from 'svelte-i18n';
	import { fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import QuestionnaireQuestionText from './QuestionnaireFillQuestionText.svelte';
	import { type IQuestionConfig } from '$lib/interfaces/IConfig';

	export let questionConfig: IQuestionConfig;

	const progressStore = writable(0);
	const dispatch = createEventDispatcher();

	$: questionSingleArray = questionConfig[$progressStore] ? [questionConfig[$progressStore]] : [];

	const handleOnInput = () => {
		// Dispatch the event of the new value
		dispatch('questionnaireInput', questionValues[$progressStore]);
		// If no more questionConfig, dispatch the event
		if ($progressStore === questionConfig.length - 1) {
			dispatch('questionnaireDone', questionValues);
			return;
		}
		// If there are more questionConfig, update the progress store
		lastChangeDirection = 1;
		progressStore.update((value) => value + 1);
	};

	const handleGoBack = () => {
		lastChangeDirection = -1;
		progressStore.update((value) => value - 1);
	};

	$: lastChangeDirection = 1; // 1 for forward, -1 for backward

	const questionValues = questionConfig.map((question) => {
		return {
			id: question.id,
			value: '',
			required: question.required
		};
	});

	const inAnimationXValue = () => {
		return 100 * lastChangeDirection;
	};

	const outAnimationXValue = () => {
		return -100 * lastChangeDirection;
	};

	const shouldSkipBeDisabledFn = () => {
		if (!questionValues[$progressStore].required) return false;
		return questionValues[$progressStore].value === '';
	};

	let shouldSkipBeDisabled = true;

	progressStore.subscribe((value) => {
		shouldSkipBeDisabled = shouldSkipBeDisabledFn();
	});
</script>

<div class="flex flex-col justify-center items-center row-span-2 w-full">
	<QuestionnaireProgress
		currentQuestionIndex={$progressStore}
		totalQuestions={questionConfig.length}
	/>
</div>
<div class="flex flex-col justify-center items-center row-span-9 relative">
	{#each questionSingleArray as question (question.id)}
		<div
			in:fly={{ delay: 500, x: inAnimationXValue() }}
			out:fly={{ delay: 150, x: outAnimationXValue() }}
			class="absolute w-full top-0 left-0 h-full"
		>
			{#if question.type === 'select'}
				<QuestionnaireSelect
					{question}
					on:input={handleOnInput}
					bind:value={questionValues[$progressStore].value}
				/>
			{:else}
				<QuestionnaireQuestionText
					{question}
					on:input={handleOnInput}
					bind:value={questionValues[$progressStore].value}
				/>
			{/if}
		</div>
	{/each}
</div>
<div class="flex justify-center items-center gap-4">
	<button
		class="border-0 text-neutral-700 text-sm disabled:text-neutral-300 disabled:cursor-not-allowed transition-colors"
		on:click={handleGoBack}
		disabled={$progressStore === 0}
	>
		{$_('questionnaire.back')}
	</button>
	<button
		class="border-0 blue-button text-sm text-neutral-700 disabled:text-neutral-300 disabled:cursor-not-allowed transition-colors"
		on:click={handleOnInput}
		disabled={shouldSkipBeDisabled}
	>
		{$_('questionnaire.next')}
	</button>
</div>
