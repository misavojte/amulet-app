<script lang="ts">
	import { _ } from 'svelte-i18n';
	import LanguagePick from '../../components/LanguagePick.svelte';
	import Footer from '../../components/Footer.svelte';

	import { questions } from '../../configs/questions';

	// i18n.js
	import { init, addMessages } from 'svelte-i18n';
	import en from '../../locales/en.json';
	import pl from '../../locales/pl.json';
	import cs from '../../locales/cs.json';

	import { StandaloneQuestionnaireService } from '$lib/services/StandaloneQuestionnaireService';
	import AppQuestionnaire from '../../components/AppQuestionnaire.svelte';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';

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

	const service = new StandaloneQuestionnaireService();

	const buildResultUrl = () => {
		const score = service.lastScore;
		if (!score) return `${base}/questionnaire/result`;
		const params = new URLSearchParams({
			a: String(score.activelyOpenMindedThinking ?? 0),
			b: String(score.closeMindedThinking ?? 0),
			c: String(score.preferenceForIntuitiveThinking ?? 0),
			d: String(score.preferenceForRationalThinking ?? 0),
			ibiF1: String(score.beliefInventoryF1 ?? 0),
			ibiF2: String(score.beliefInventoryF2 ?? 0),
			ibiF3: String(score.beliefInventoryF3 ?? 0)
		});
		return `${base}/questionnaire/result?${params.toString()}`;
	};
</script>

{#if stage !== 'Experiment'}
	<div class="max-w-screen-md flex flex-col justify-between items-center mx-auto h-screen">
		<main class="h-full flex flex-col justify-center items-center w-full overflow-auto">
			{#if stage === 'LanguagePick'}
				<LanguagePick on:localeChange={handleLocaleChange} />
			{:else}
				<AppQuestionnaire
					questionsService={service}
					{questions}
					on:questionnairePreliminaryEnd={() => goto(buildResultUrl())}
					on:questionnaireDone={() => goto(buildResultUrl())}
					on:questionnaireError={(e) => alert('Error ' + e.detail.message)}
				/>
			{/if}
		</main>
		<Footer />
	</div>
{/if}
