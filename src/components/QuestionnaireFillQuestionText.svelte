<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { createEventDispatcher } from 'svelte';
	import QuestionnaireQuestion from './QuestionnaireFillQuestion.svelte';

	export let question: {
		id: string;
		type: 'text' | 'email' | 'number';
		required: boolean;
	};

	export let value: string = '';

	const dispatch = createEventDispatcher();

	const handleOptionChange = () => {
		dispatch('input');
	};
</script>

<QuestionnaireQuestion questionText={$_('questions.' + question.id + '.question')}>
	<form class="flex flex-col gap-4" on:submit|preventDefault={handleOptionChange}>
		{#if question.type === 'text'}
			<input
				type="text"
				id={question.id}
				name={question.id}
				class="border-2 border-gray-300 rounded-lg p-4 w-96"
				required={question.required}
				bind:value
			/>
		{:else if question.type === 'email'}
			<input
				type="email"
				id={question.id}
				name={question.id}
				class="border-2 border-gray-300 rounded-lg p-4 w-96"
				required={question.required}
				bind:value
			/>
		{:else if question.type === 'number'}
			<input
				type="number"
				id={question.id}
				name={question.id}
				class="border-2 border-gray-300 rounded-lg p-4 w-96"
				required={question.required}
				bind:value
			/>
		{/if}
		<input
			type="submit"
			value={$_('questionnaire.submitValue')}
			class="bg-blue-500 text-white rounded-lg p-4 mt-4 cursor-pointer"
		/>
	</form>
</QuestionnaireQuestion>
