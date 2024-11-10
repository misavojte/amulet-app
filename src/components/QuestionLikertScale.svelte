<script lang="ts">
	import type { IQuestionConfigLikert } from '$lib/interfaces/IQuestion';
	import { createEventDispatcher } from 'svelte';
	import Question from './Question.svelte';

	export let question: IQuestionConfigLikert;

	export let value: string = '';

	const dispatch = createEventDispatcher();

	const handleOptionChange = () => {
		dispatch('input', value);
	};

	$: labelContainerMaxWidth = question.options.length * 4 + 4 + 'rem'; /* 4rem */
</script>

<Question questionText={question.headingText}>
	<div class="flex justify-center flex-col w-full">
		<ul class="flex gap-2 justify-center relative w-fit mx-auto">
			{#each question.options as option}
				<li class="w-16 h-16 shrink aspect-square">
					<input
						type="radio"
						id={question.id + '_' + option}
						name={question.id + '_' + option}
						value={option}
						class="hidden peer"
						required={question.required}
						bind:group={value}
						on:change={handleOptionChange}
					/>
					<label
						for={question.id + '_' + option}
						class="select-none peer w-full flex items-center justify-center border-2 border-gray-300 rounded-lg p-4 mb-4 cursor-pointer {value ===
						option
							? 'bg-blue-500 text-white'
							: 'bg-white hover:bg-neutral-100'} text-xl"
					>
						{option}
					</label>
				</li>
			{/each}
			<div
				class="flex gap-4 justify-between mx-auto w-full text-neutral-500 font-thin text-md absolute -bottom-14"
				style="max-width: {labelContainerMaxWidth};"
			>
				<div class="text-left text-wrap xl:text-lg min-w-min leading-none xl:leading-none">
					{question.label.min}
				</div>
				{#if question.options.length > 3}
					<div class="text-center text-wrap leading-none xl:leading-none xl:text-lg min-w-min">
						{question.label.avg}
					</div>
				{/if}
				<div class="text-right text-wrap leading-none xl:leading-none xl:text-lg min-w-min">
					{question.label.max}
				</div>
			</div>
		</ul>
	</div>
</Question>
