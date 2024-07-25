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
		if (initialLocale) {
			if (initialLocale === 'cs') {
				handleLocaleChange();
			}
			if (initialLocale === 'pl') {
				handleLocaleChange();
			}
			if (initialLocale === 'en') {
				handleLocaleChange();
			}
		}
	});
</script>

<div class="max-w-screen-md flex flex-col justify-between items-center mx-auto min-h-screen">
	<main class="h-full flex flex-col justify-center items-center w-full">
		{#if isReady}
			<Result />
		{:else}
			<LanguagePick on:localeChange={handleLocaleChange} />
		{/if}
	</main>
	<Footer />
</div>
