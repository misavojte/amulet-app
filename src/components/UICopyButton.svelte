<script lang="ts">
	export let textCopy: string;
	export let textCopied: string;
	export let toCopy: string;

	let copiedActivated = false;

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text).then(() => {
			copiedActivated = true;
			setTimeout(() => {
				copiedActivated = false;
			}, 2000);
		});
	};

	const handleClick = () => {
		copyToClipboard(toCopy);
	};
</script>

<button
	on:click={handleClick}
	class=" relative col-span-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full xl:text-lg text-sm py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 items-center inline-flex justify-center px-7"
>
	<span class:opacity-0={copiedActivated}>{textCopy}</span>
	<span class="inline-flex items-center absolute" class:hidden={!copiedActivated}>
		<svg
			class="w-3 h-3 text-white me-1.5"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 16 12"
		>
			<path
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M1 5.917 5.724 10.5 15 1.5"
			/>
		</svg>
		{textCopied}
	</span>
</button>
