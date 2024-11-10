<script lang="ts">
	import type {
		IQuestionBattery,
		IQuestionConfigLikert,
		IQuestionConfigSelect,
		IQuestionConfigText,
		ITimestampQuestionService
	} from '$lib/interfaces/IQuestion';
	import { _ } from 'svelte-i18n';
	import QuestionManager from './QuestionManager.svelte';

	export let questions: { id: string; type: string; options?: string[]; required: boolean }[] = [];
	export let questionsService: ITimestampQuestionService;

	const questionConfig: IQuestionBattery = questions.map((question) => {
		switch (question.type) {
			case 'likert':
				return {
					...question,
					headingText: $_(`questions.${question.id}.question`),
					label: {
						min: $_(`questions.${question.id}.options.1`),
						avg: $_(`questions.${question.id}.options.3`),
						max: $_(`questions.${question.id}.options.5`)
					}
				} as IQuestionConfigLikert;
			case 'select':
				if (!question.options) {
					throw new Error('Question options are not set');
				}
				return {
					...question,
					headingText: $_(`questions.${question.id}.question`),
					options: question.options.map((option, index) => {
						return {
							id: option,
							label: $_(`questions.${question.id}.options.${index + 1}`)
						};
					})
				} as IQuestionConfigSelect;
			case 'text':
			case 'email':
			case 'number':
				return {
					...question,
					confirmText: $_(`questionnaire.submitValue`),
					headingText: $_(`questions.${question.id}.question`)
				} as IQuestionConfigText;
			default:
				throw new Error('Invalid question type');
		}
	});
</script>

<QuestionManager
	{questionsService}
	questions={questionConfig}
	showSkip={true}
	on:questionnaireDone
	on:questionnaireError
/>
