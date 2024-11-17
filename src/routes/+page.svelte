<script lang="ts">
	import { _ } from 'svelte-i18n';
	import LanguagePick from '../components/LanguagePick.svelte';
	import Intro from '../components/Intro.svelte';
	import Game from '../components/Game.svelte';
	import Footer from '../components/Footer.svelte';

	// i18n.js
	import { init, addMessages } from 'svelte-i18n';
	import en from '../locales/en.json';
	import pl from '../locales/pl.json';
	import cs from '../locales/cs.json';
	import type { QuestionnaireScore } from '$lib/interfaces/IQuestionAmulet';
	import { createUserState } from '../stores/UserState';
	import { setContext } from 'svelte';
	import { getAuthAnonymousUser } from '../firebase';
	import { TimestampGameService } from '$lib/services/TimestampGameService';
	import { type GameState } from '$lib';
	import { demoQuestions, gameQuestions, questions } from '../configs/questions';
	import { TimestampQuestionnaireService } from '$lib/services/TimestampQuestionnaireService';
	import { goto } from '$app/navigation';
	import { BeliefInventoryService } from '$lib/services/BeliefInventoryService';
	import { ThinkingStyleService } from '$lib/services/ThinkingStyleService';
	import { fisherYatesShuffle } from '$lib/utils/shuffle';
	import AppQuestionnaire from '../components/AppQuestionnaire.svelte';

	/**
	 * Language setup
	 * Using svelte-i18n
	 */
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

	/**
	 * User setup
	 * Using UserState component
	 */
	const userState = createUserState();
	const sessionId = Date.now().toString() + '_' + Math.random().toString();
	getAuthAnonymousUser().then((userId) => {
		userState.set({
			userId,
			sessionId
		});
	});
	setContext('userState', userState);

	/**
	 * Game setup
	 * Using Game component
	 * Game component is responsible for handling the game logic and rendering
	 * We need to pass the game configuration and timestamp service
	 */
	let savedUserScore: number | null = null;

	// decide scenario between 'Random', 'AlwaysWin', 'AlwaysLose'
	// in chances 4 : 1 : 1 by randomly selecting
	const scenarioArray = ['Random', 'AlwaysWin', 'AlwaysLose', 'Random', 'Random', 'Random'];
	const randomScenario = fisherYatesShuffle(scenarioArray)[0];

	const gameConfig = {
		allowRepeat: false,
		numberOfRounds: 15,
		startScore: 100,
		scenario: randomScenario,
		priceOfAmulet: 10,
		scoreOnWin: 30
	};

	const timestampService = new TimestampGameService();

	const handleGameCompleteEnd = (e: CustomEvent<GameState>) => {
		savedUserScore = e.detail.score;
		console.log('Game complete', savedUserScore);
		stage = 'Questionnaire';
	};

	/**
	 * Questionnaire setup
	 * Using Questionnaire component
	 * Questionnaire component is responsible for handling the questionnaire logic and rendering
	 * We need to pass the questionnaire configuration and timestamp service
	 */
	const questionBase = [...gameQuestions, ...fisherYatesShuffle(questions), ...demoQuestions];

	// const questionConfig = mockQuestions;
	const beliefInventoryService = new BeliefInventoryService();
	const thinkingStyleService = new ThinkingStyleService();
	const questionnaireInterface = new TimestampQuestionnaireService(
		userState,
		beliefInventoryService,
		thinkingStyleService
	);

	const createSearchParamResultUrl = (questionnaireResult: QuestionnaireScore) => {
		if (!savedUserScore) {
			throw new Error('Saved user score is not set');
		}
		// 'activelyOpenMindedThinking' | 'closeMindedThinking' | 'preferenceForIntuitiveThinking' | 'preferenceForRationalThinking';
		const searchParams = new URLSearchParams();
		searchParams.append('a', questionnaireResult.activelyOpenMindedThinking.toString());
		searchParams.append('b', questionnaireResult.closeMindedThinking.toString());
		searchParams.append('c', questionnaireResult.preferenceForIntuitiveThinking.toString());
		searchParams.append('d', questionnaireResult.preferenceForRationalThinking.toString());
		searchParams.append('s', savedUserScore.toString());
		searchParams.append('ibiF1', questionnaireResult.beliefInventoryF1.toString());
		searchParams.append('ibiF2', questionnaireResult.beliefInventoryF2.toString());
		searchParams.append('ibiF3', questionnaireResult.beliefInventoryF3.toString());
		return searchParams;
	};

	const createResultUrl = (questionnaireResult: QuestionnaireScore) => {
		const searchParams = createSearchParamResultUrl(questionnaireResult);
		return `result?${searchParams.toString()}`;
	};

	const handleQuestionnaireSaved = () => {
		const score = questionnaireInterface.lastScore;
		if (!score) {
			throw new Error('Score is not set');
		}
		const resultUrl = createResultUrl(score);
		goto(resultUrl);
	};
</script>

{#if stage !== 'Experiment'}
	<div class="max-w-screen-md flex flex-col justify-between items-center mx-auto min-h-screen">
		<main class="h-full flex flex-col justify-center items-center w-full">
			{#if stage === 'LanguagePick'}
				<LanguagePick on:localeChange={handleLocaleChange} />
			{:else if stage === 'Info'}
				<Intro
					on:startExperiment={() => (stage = 'Experiment')}
					rounds={gameConfig.numberOfRounds}
				/>
			{:else if stage === 'Questionnaire'}
				<AppQuestionnaire
					questions={questionBase}
					questionsService={questionnaireInterface}
					on:questionnaireDone={handleQuestionnaireSaved}
					on:questionnairePreliminaryEnd={handleQuestionnaireSaved}
				/>
			{/if}
		</main>
		<Footer />
	</div>
{/if}

{#if stage === 'Experiment' && $userState.userId && $userState.sessionId}
	<Game {gameConfig} {timestampService} on:gameCompleteEnd={handleGameCompleteEnd} />
{/if}

<style>
	main {
		flex: 1;
		flex-grow: 1;
	}
</style>
