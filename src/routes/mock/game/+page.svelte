<script lang="ts">
	import { _ } from 'svelte-i18n';
	import LanguagePick from '../../../components/LanguagePick.svelte';
	import Footer from '../../../components/Footer.svelte';

	// i18n.js
	import { init, addMessages } from 'svelte-i18n';
	import en from '../../../locales/en.json';
	import pl from '../../../locales/pl.json';
	import cs from '../../../locales/cs.json';

	import { createUserState } from '../../../stores/UserState';
	import { setContext } from 'svelte';
	import { getAuthAnonymousUser } from '../../../firebase';
	import Loader from '../../../components/UILoader.svelte';

	import Game from '../../../components/Game.svelte';
	import type { ITimestampGameService } from '$lib';
	import { MockTimestampGameService } from '$lib/services/MockTimestampGameService';

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
	setContext('userState', userState);

	getAuthAnonymousUser().then((userId) => {
		userState.set({ userId, sessionId: 'mock' });
	});

	const gameConfig = {
		allowRepeat: true,
		numberOfRounds: 11,
		startScore: 100,
		scenario: 'Random',
		priceOfAmulet: 10,
		scoreOnWin: 30
	};

	const mockGameTimestampService: ITimestampGameService = new MockTimestampGameService();
</script>

{#if stage !== 'Experiment'}
	<div class="max-w-screen-md flex flex-col justify-between items-center mx-auto h-screen">
		<main class="h-full flex flex-col justify-center items-center w-full">
			{#if stage === 'LanguagePick'}
				<LanguagePick on:localeChange={handleLocaleChange} />
			{:else if $userState.userId}
				<Game {gameConfig} timestampService={mockGameTimestampService} />
			{:else}
				<Loader />
			{/if}
		</main>
		<Footer />
	</div>
{/if}
