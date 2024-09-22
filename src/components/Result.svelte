<script lang="ts">
	import ResultScore from './ResultScore.svelte';
	import ResultShare from './ResultShare.svelte';
	import ResultThinkingStyle from './ResultThinkingStyle.svelte';
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import ResultBeliefInventory from './ResultBeliefInventory.svelte';
</script>

<svelte:head>
	<title>{$_('result.title')}</title>
	<meta name="description" content={$_('result.description')} />
	<meta property="og:image" content="{base}/og-image.png" />
	<meta property="og:image:width" content="633" />
	<meta property="og:image:height" content="527" />
</svelte:head>

<h1 class="text-3xl font-bold mt-8">{$_('result.title')}</h1>
<ResultThinkingStyle />
<ResultBeliefInventory />
<ResultScore />
<ResultShare />
