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
	import { onMount } from 'svelte';
	import AppQuestionnaire from '../../../components/AppQuestionnaire.svelte';

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
					on:questionnaireDone={(e) => alert(JSON.stringify(e.detail))}
					on:questionnaireError={(e) => alert('Error ' + e.detail.message)}
				/>
			{/if}
		</main>
		<Footer />
	</div>
{/if}
