<script>
	import { fade } from 'svelte/transition';
</script>

<div class="rounded" in:fade={{ duration: 300 }} out:fade={{ duration: 300 }}>
	<div class="flex items-center justify-center flex-col gap-8">
		<slot />
	</div>
</div>

<style>
	.rounded {
		backdrop-filter: blur(10px);
		padding: 10px;
		-webkit-backdrop-filter: blur(10px);
		z-index: 999;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		color: #000;
		background: rgba(255, 255, 255, 0.75);
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
