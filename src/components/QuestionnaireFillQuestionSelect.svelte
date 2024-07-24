<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { createEventDispatcher } from 'svelte';
	import QuestionnaireQuestion from './QuestionnaireFillQuestion.svelte';

	export let question: {
		id: string;
		type: string;
		required: boolean;
		options: readonly string[];
	};
	export let value: string = '';

	const dispatch = createEventDispatcher();

	const handleOptionChange = () => {
		dispatch('input');
	};
</script>

<QuestionnaireQuestion
	questionText={$_('questions.' + question.id + '.question')}
	required={question.required}
>
	<ul class="flex flex-col">
		{#each question.options as option}
			<li>
				<input
					type="radio"
					id={option}
					name={question.id}
					value={option}
					class="hidden peer"
					required
					bind:group={value}
					on:change={handleOptionChange}
					on:click|stopPropagation
				/>
				<label
					for={option}
					class="select-none peer block w-96 border-2 border-gray-300 rounded-lg p-4 mb-4 cursor-pointer {value ===
					option
						? 'bg-blue-500 text-white'
						: 'bg-white'}"
				>
					{$_('questions.' + question.id + '.options.' + option)}
				</label>
			</li>
		{/each}
	</ul>
</QuestionnaireQuestion>
