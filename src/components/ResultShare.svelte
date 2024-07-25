<script lang="ts">
	import { _ } from 'svelte-i18n';
	import UiCopyButton from './UICopyButton.svelte';
	import { page } from '$app/stores';

	const toCopy = $page.url.href;
	const textCopyResult = $_('result.share.copyResult');
	const textCopyExperiment = $_('result.share.copyExperiment');
	const textCopied = $_('result.share.copied');
</script>

<div class="container mx-auto p-4 flex flex-col items-center w-full">
	<h2 class="text-2xl font-bold">{$_('result.share.title')}</h2>
	<p class="text-lg mt-4 mb-4">
		{$_('result.share.description')}
	</p>
	<div class="flex gap-2 items-center w-full justify-center mt-4">
		<UiCopyButton {toCopy} textCopy={textCopyResult} {textCopied} />
		<UiCopyButton {toCopy} textCopy={textCopyExperiment} {textCopied} />
	</div>
</div>
