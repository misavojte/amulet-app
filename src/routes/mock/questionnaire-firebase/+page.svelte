<script lang="ts">
	import Questionnaire from '../../../components/Questionnaire.svelte';

	import { _ } from 'svelte-i18n';
	import LanguagePick from '../../../components/LanguagePick.svelte';
	import Footer from '../../../components/Footer.svelte';

	import { mockQuestions } from '../../../configs/questions';

	// i18n.js
	import { init, addMessages } from 'svelte-i18n';
	import en from '../../../locales/en.json';
	import pl from '../../../locales/pl.json';
	import cs from '../../../locales/cs.json';

	import { createUserState } from '../../../stores/UserState';
	import { setContext } from 'svelte';
	import { TimestampQuestionnaireService } from '$lib/services/TimestampQuestionnaireService';
	import { getAuthAnonymousUser } from '../../../firebase';
	import { BeliefInventoryService } from '$lib/services/BeliefInventoryService';
	import { ThinkingStyleService } from '$lib/services/ThinkingStyleService';

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

	const userState = createUserState();
	const beliefInventoryService = new BeliefInventoryService();
	const thinkingStyleService = new ThinkingStyleService();

	setContext('beliefInventoryService', beliefInventoryService);
	setContext('thinkingStyleService', thinkingStyleService);
	setContext('userState', userState);

	getAuthAnonymousUser().then((userId) => {
		userState.set({ userId, sessionId: 'mock' });
	});

	const service = new TimestampQuestionnaireService();
</script>

{#if stage !== 'Experiment'}
	<div class="max-w-screen-md flex flex-col justify-between items-center mx-auto h-screen">
		<main class="h-full flex flex-col justify-center items-center w-full">
			{#if stage === 'LanguagePick'}
				<LanguagePick on:localeChange={handleLocaleChange} />
			{:else if $userState.userId}
				<Questionnaire questionnaireInterface={service} questionConfig={mockQuestions} />
			{:else}
				<p>Loading...</p>
			{/if}
		</main>
		<Footer />
	</div>
{/if}
