<script lang="ts">
	import { _ } from 'svelte-i18n';
	import UiCopyButton from './UICopyButton.svelte';
	import { page } from '$app/stores';
	import { base } from '$app/paths';

	const toCopy = $page.url.href;
	const textCopyResult = $_('result.share.copyResult');
	const textCopyExperiment = $_('result.share.copyExperiment');
	const textCopied = $_('result.share.copied');

	const toCopyBase = $page.url.origin + base;
</script>

<div class="container mx-auto p-4 flex flex-col items-center w-full my-10 mb-20">
	<h2 class="text-2xl xl:text-3xl font-bold">{$_('result.share.title')}</h2>
	<p class="text-lg mt-4 mb-4 text-center">
		{$_('result.share.description')}
	</p>
	<div class="flex gap-2 items-center w-full justify-center mt-4">
		<UiCopyButton {toCopy} textCopy={textCopyResult} {textCopied} />
		<UiCopyButton toCopy={toCopyBase} textCopy={textCopyExperiment} {textCopied} />
	</div>
</div>
