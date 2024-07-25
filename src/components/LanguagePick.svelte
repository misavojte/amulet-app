<script lang="ts">
	import { locale } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { createEventDispatcher } from 'svelte';
	const locales = [
		{ code: 'en', name: 'English', flag: 'en.svg', text: 'Continue in English' },
		{ code: 'pl', name: 'Polish', flag: 'pl.svg', text: 'Kontynuuj po polsku' },
		{ code: 'cs', name: 'Czech', flag: 'cz.svg', text: 'Pokračujte v češtině' }
	];

	const dispatch = createEventDispatcher();

	function changeLocale(code: string) {
		locale.set(code);
		dispatch('localeChange', code);
	}
</script>

<div class="flex gap-4">
	{#each locales as { code, name, flag, text }}
		<button class="locale-select" on:click={() => changeLocale(code)}>
			<img
				class="bg-slate-500"
				width="50"
				height="50"
				src={`${base}/flags/${flag}`}
				alt={name + ' flag'}
			/>
			<p>{text}</p>
		</button>
	{/each}
</div>

<style>
	.locale-select {
		align-items: center;
		cursor: pointer;
		display: flex;
		gap: 20px;
		padding: 10px 20px;
		border-radius: 10px;
		transition: background-color 0.3s;
		background-color: #f0f0f0;
		border: none;
	}
	.locale-select:hover {
		background-color: #e0e0e0;
	}
	.locale-select img {
		width: 50px;
		height: 50px;
		object-fit: cover;
		object-position: center;
		border-radius: 100%;
		margin: auto;
	}
	.locale-select p {
		font-size: 18px;
		text-align: center;
		margin: 0;
		margin-top: 5px;
		line-height: 1.1;
	}
</style>
