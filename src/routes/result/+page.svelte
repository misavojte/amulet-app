<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import LanguagePick from '../../components/LanguagePick.svelte';
	import Footer from '../../components/Footer.svelte';
	import { onMount } from 'svelte';

	// i18n.js
	import { init, addMessages } from 'svelte-i18n';
	import en from '../../locales/en.json';
	import pl from '../../locales/pl.json';
	import cs from '../../locales/cs.json';

	import Result from '../../components/Result.svelte';

	const initialLocale = $locale;
	let isReady = false;
	console.warn('Initial locale', initialLocale, isReady);

	addMessages('en', en);
	addMessages('pl', pl);
	addMessages('cs', cs);
	init({
		fallbackLocale: 'en',
		initialLocale: 'en'
	});
	const handleLocaleChange = () => {
		isReady = true;
	};

	onMount(() => {
		console.warn('Initial locale', initialLocale);
		if (initialLocale) {
			if (initialLocale === 'cs') {
				handleLocaleChange();
				init({
					fallbackLocale: 'en',
					initialLocale: 'cs'
				});
			}
			if (initialLocale === 'pl') {
				handleLocaleChange();
				init({
					fallbackLocale: 'en',
					initialLocale: 'pl'
				});
			}
			if (initialLocale === 'en') {
				handleLocaleChange();
				init({
					fallbackLocale: 'en',
					initialLocale: 'en'
				});
			}
		}
	});
</script>

<div class="max-w-screen-md flex flex-col justify-between items-center mx-auto min-h-screen h-full">
	<main class="h-full flex flex-col justify-center items-center w-full flex-grow">
		{#if isReady}
			<Result />
		{:else}
			<LanguagePick on:localeChange={handleLocaleChange} />
		{/if}
	</main>
	<Footer />
</div>
