<script lang="ts">
	import { _, getLocaleFromNavigator } from 'svelte-i18n';
	import LanguagePick from '../components/LanguagePick.svelte';
	import Intro from '../components/Intro.svelte';
	import App from '../components/Game.svelte';
	import Footer from '../components/Footer.svelte';

	// i18n.js
	import { init, addMessages } from 'svelte-i18n';
	import en from '../locales/en.json';
	import pl from '../locales/pl.json';
	import cs from '../locales/cs.json';
	import type { QuestionnaireScore } from '$lib/interfaces/ITimestampQuestionnaireService';
	import { createUserState } from '../stores/UserState';
	import { setContext } from 'svelte';
	import { getAuthAnonymousUser } from '../firebase';

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

	const gameConfig = {
		numberOfRounds: 11,
		startScore: 100,
		scenario: 'Random',
		priceOfAmulet: 10,
		scoreOnWin: 30
	};

	// const locale = 'cs';

	const createSearchParamResultUrl = (questionnaireResult: QuestionnaireScore) => {
		// 'activelyOpenMindedThinking' | 'closeMindedThinking' | 'preferenceForIntuitiveThinking' | 'preferenceForRationalThinking';
		const searchParams = new URLSearchParams();
		searchParams.append('a', questionnaireResult.activelyOpenMindedThinking.toString());
		searchParams.append('b', questionnaireResult.closeMindedThinking.toString());
		searchParams.append('c', questionnaireResult.preferenceForIntuitiveThinking.toString());
		searchParams.append('d', questionnaireResult.preferenceForRationalThinking.toString());
		return searchParams;
	};

	const createResultUrl = (questionnaireResult: QuestionnaireScore) => {
		// then current locale from svelte-i18n
		const locale = getLocaleFromNavigator();
		if (!locale) {
			throw new Error('Locale not found');
		}
		const searchParams = createSearchParamResultUrl(questionnaireResult);
		return `result/${locale}?${searchParams.toString()}`;
	};

	const userState = createUserState();
	getAuthAnonymousUser().then((userId) => {
		userState.set({ userId, sessionId: 'mock' });
	});
	setContext('userState', userState);
</script>

{#if stage !== 'Experiment'}
	<div class="layout">
		<main>
			{#if stage === 'LanguagePick'}
				<LanguagePick on:localeChange={handleLocaleChange} />
			{/if}

			{#if stage === 'Info'}
				<Intro on:startExperiment={() => (stage = 'Experiment')} />
			{/if}
		</main>
		<Footer />
	</div>
{/if}

{#if stage === 'Experiment' && $userState.userId && $userState.sessionId}
	<App
		user={{
			userId: $userState.userId,
			sessionId: $userState.sessionId
		}}
		{gameConfig}
	/>
{/if}

<style>
	.layout {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 680px;
		align-items: center;
		justify-content: center;
		margin: auto;
		gap: 1rem;
		text-align: left;
	}
	main {
		flex: 1;
		flex-grow: 1;
	}
</style>
