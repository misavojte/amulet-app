<script>
	import { _ } from 'svelte-i18n';
	import LanguagePick from '../components/LanguagePick.svelte';
	import Intro from '../components/Intro.svelte';
	import App from '../components/App.svelte';
	import Footer from '../components/Footer.svelte';

	// i18n.js
	import { init, addMessages } from 'svelte-i18n';
	import en from '../locales/en.json';
	import pl from '../locales/pl.json';
	import cs from '../locales/cs.json';

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

	const locale = 'cs';
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

{#if stage === 'Experiment'}
	<App {locale} {gameConfig} />
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
