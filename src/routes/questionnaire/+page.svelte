<script lang="ts">
	import { init, addMessages, _ } from 'svelte-i18n';
	import en from '../../locales/en.json';
	import pl from '../../locales/pl.json';
	import cs from '../../locales/cs.json';

	import AppQuestionnaire from '../../components/AppQuestionnaire.svelte';
	import LanguagePick from '../../components/LanguagePick.svelte';
	import Footer from '../../components/Footer.svelte';
	import UIButton from '../../components/UIButton.svelte';
	import { questions } from '../../configs/questions';
	import { StandaloneQuestionnaireService } from '$lib/services/StandaloneQuestionnaireService';
	import type { QuestionnaireScore } from '$lib/interfaces/IQuestionAmulet';

	addMessages('en', en);
	addMessages('pl', pl);
	addMessages('cs', cs);

	init({
		fallbackLocale: 'en',
		initialLocale: 'en'
	});

	let stage: 'language' | 'questionnaire' | 'completed' = 'language';
	let service = new StandaloneQuestionnaireService();
	let finalScore: QuestionnaireScore | null = null;
	let isSubmitting = false;
	let errorMessage = '';

	const handleLocaleChange = () => {
		stage = 'questionnaire';
	};

	const handleDone = async () => {
		isSubmitting = true;
		errorMessage = '';
		try {
			finalScore = service.lastScore;
			stage = 'completed';
		} catch (e: any) {
			errorMessage = e?.message || 'An error occurred while saving the questionnaire.';
		} finally {
			isSubmitting = false;
		}
	};
</script>

<div class="max-w-screen-md flex flex-col justify-between items-center mx-auto min-h-screen h-full p-4">
	<main class="h-full flex flex-col justify-center items-center w-full flex-grow my-8">
		{#if stage === 'language'}
			<div class="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
				<h1 class="text-2xl font-bold mb-4">Standalone Questionnaire</h1>
				<p class="text-sm text-gray-600 dark:text-gray-300 mb-6">
					Select your language to begin the survey. Your responses are saved into an isolated dataset.
				</p>
				<LanguagePick on:localeChange={handleLocaleChange} />
			</div>
		{:else if stage === 'questionnaire'}
			<div class="w-full h-full flex flex-col items-center">
				{#if errorMessage}
					<div class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
						{errorMessage}
					</div>
				{/if}
				<AppQuestionnaire
					questionsService={service}
					{questions}
					on:questionnaireDone={handleDone}
					on:questionnairePreliminaryEnd={handleDone}
					on:questionnaireError={(e) => (errorMessage = e.detail?.message || 'Questionnaire error')}
				/>
			</div>
		{:else if stage === 'completed'}
			<div class="w-full max-w-lg bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center space-y-6">
				<div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full text-green-600 dark:text-green-300 mb-2">
					<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
					</svg>
				</div>
				<h2 class="text-2xl font-bold text-gray-800 dark:text-white">Questionnaire Completed!</h2>
				<p class="text-sm text-gray-600 dark:text-gray-300">
					Thank you for taking the time to fill out the questionnaire. Your answers have been successfully saved to the database.
				</p>

				{#if finalScore}
					<div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-left space-y-2 text-xs font-mono text-gray-700 dark:text-gray-200 overflow-x-auto">
						<div class="font-bold text-sm text-gray-900 dark:text-white mb-2">Score Summary</div>
						<div><span class="text-gray-500">Session ID:</span> {finalScore.sessionId}</div>
						<div><span class="text-gray-500">User ID:</span> {finalScore.userId}</div>
						{#if finalScore.activelyOpenMindedThinking !== undefined}
							<div><span class="text-gray-500">Actively Open-Minded Thinking:</span> {finalScore.activelyOpenMindedThinking}</div>
						{/if}
						{#if finalScore.preferenceForIntuitiveThinking !== undefined}
							<div><span class="text-gray-500">Intuitive Thinking:</span> {finalScore.preferenceForIntuitiveThinking}</div>
						{/if}
						{#if finalScore.preferenceForRationalThinking !== undefined}
							<div><span class="text-gray-500">Rational Thinking:</span> {finalScore.preferenceForRationalThinking}</div>
						{/if}
						{#if finalScore.beliefInventoryF1 !== undefined}
							<div><span class="text-gray-500">Belief Inventory F1:</span> {finalScore.beliefInventoryF1}</div>
						{/if}
					</div>
				{/if}

				<div class="pt-4">
					<UIButton
						text="Take Questionnaire Again"
						on:click={() => {
							stage = 'language';
							service = new StandaloneQuestionnaireService();
							finalScore = null;
						}}
					/>
				</div>
			</div>
		{/if}
	</main>
	<Footer />
</div>
