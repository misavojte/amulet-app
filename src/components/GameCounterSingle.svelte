<script lang="ts">
	import { spring } from 'svelte/motion';

	export let count = 0;
	export let text = 'Counter';

	const displayed_count = spring();
	$: displayed_count.set(count);
	$: offset = modulo($displayed_count, 1);

	function modulo(n: number, m: number) {
		// handle negative numbers
		return ((n % m) + m) % m;
	}
</script>

<div class="counter">
	<div>{text}:</div>
	<div class="counter-viewport">
		<div class="counter-digits" style="transform: translate(0, {100 * offset}%)">
			<span class="hidden" aria-hidden="true">{Math.floor($displayed_count + 1)}</span>
			<span>{Math.floor($displayed_count)}</span>
		</div>
	</div>
</div>

<style>
	.counter {
		font-size: 30px;
		display: flex;
		align-items: center;
		margin: 0;
		color: #483d41;
	}

	.counter-viewport {
		width: 60px;
		height: 40px;
		overflow: hidden;
		text-align: center;
		position: relative;
	}

	.counter-viewport span {
		position: absolute;
		display: flex;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: center;
	}

	.counter-digits {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.hidden {
		top: -100%;
		user-select: none;
	}
</style>
