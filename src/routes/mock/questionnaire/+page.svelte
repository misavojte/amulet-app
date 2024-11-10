<script lang="ts">
	import QuestionManager from '../../../components/QuestionManager.svelte';
	import { _ } from 'svelte-i18n';
	import LanguagePick from '../../../components/LanguagePick.svelte';
	import Footer from '../../../components/Footer.svelte';

	import { mockQuestions } from '../../../configs/questions';

	// i18n.js
	import { init, addMessages } from 'svelte-i18n';
	import en from '../../../locales/en.json';
	import pl from '../../../locales/pl.json';
	import cs from '../../../locales/cs.json';

	import { MockTimestampQuestionnaireService } from '$lib/services/MockTimestampQuestionnaireService';
	import type {
		IQuestionBattery,
		IQuestionConfigLikert,
		IQuestionConfigSelect,
		IQuestionConfigText
	} from '$lib/interfaces/IQuestion';

	addMessages('en', en);
	addMessages('pl', pl);
	addMessages('cs', cs);

	init({
		fallbackLocale: 'en',
		initialLocale: 'en'
	});

	let stage = 'LanguagePick';

	const handleLocaleChange = () => {
		stage = 'Info';
	};

	const service = new MockTimestampQuestionnaireService();

	const questionConfig: IQuestionBattery = mockQuestions.map((question) => {
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

{#if stage !== 'Experiment'}
	<div class="max-w-screen-md flex flex-col justify-between items-center mx-auto h-screen">
		<main class="h-full flex flex-col justify-center items-center w-full">
			{#if stage === 'LanguagePick'}
				<LanguagePick on:localeChange={handleLocaleChange} />
			{:else}
				<QuestionManager
					questionsService={service}
					questions={questionConfig}
					on:questionnaireSaved={(e) => alert(JSON.stringify(e.detail))}
					on:questionnaireError={(e) => alert('Error ' + e.detail.message)}
				/>
			{/if}
		</main>
		<Footer />
	</div>
{/if}
