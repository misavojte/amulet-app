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
	import AppQuestionnaire from '../../../components/AppQuestionnaire.svelte';
	import { goto } from '$app/navigation';

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
</script>

{#if stage !== 'Experiment'}
	<div class="max-w-screen-md flex flex-col justify-between items-center mx-auto h-screen">
		<main class="h-full flex flex-col justify-center items-center w-full overflow-auto">
			{#if stage === 'LanguagePick'}
				<LanguagePick on:localeChange={handleLocaleChange} />
			{:else}
				<AppQuestionnaire
					questionsService={service}
					questions={mockQuestions}
					on:questionnairePreliminaryEnd={(e) => alert(JSON.stringify(service.lastScore))}
					on:questionnaireDone={(e) => {
						alert(JSON.stringify(service.lastScore));
						goto(
							'/result?a=22&b=8&c=12&d=18&s=130&ibiF1=11.756&ibiF2=16.33&ibiF3=6.610999999999999'
						);
					}}
					on:questionnaireError={(e) => alert('Error ' + e.detail.message)}
				/>
			{/if}
		</main>
		<Footer />
	</div>
{/if}
