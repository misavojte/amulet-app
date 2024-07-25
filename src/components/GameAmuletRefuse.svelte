<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { createEventDispatcher } from 'svelte';

	export let isShown: boolean = false;
	export let bottomColor: string = '#a76262';
	export let topColor: string = '#ff9191';
	const dispatch = createEventDispatcher();

	const handleRefuseAmulet = () => {
		dispatch('refuseAmulet');
	};
</script>

<button
	class="pushable absolute bottom-0 left-0 w-full"
	on:click={handleRefuseAmulet}
	disabled={!isShown}
	style="background-color: {bottomColor};"
>
	<span class="front" style="background-color: {topColor};">
		<span class="text">
			{$_('amulet.refuse')}
		</span>
	</span>
</button>

<style>
	.pushable {
		border-radius: 12px;
		border: none;
		padding: 0;
		cursor: pointer;
		outline-offset: 4px;
		transition: all 0.6s;
		transition: opacity 0.6s ease 0.2s;
		&&:disabled {
			opacity: 0;
			cursor: default;
			pointer-events: none;
		}
	}
	.front {
		display: block;
		padding: 12px 42px;
		border-radius: 12px;
		font-size: 1.5rem;
		background: #d995d9;
		color: white;
		transform: translateY(-6px);
		transition: all 0.1s;
	}
	.text {
		color: rgba(0, 0, 0, 0.63);
	}

	.pushable:hover .front {
		transform: translateY(-8px);
	}

	.pushable:active .front {
		transform: translateY(-2px);
	}

	/*
	button {
		background: none;
		border: none;
		padding: 10px 15px;
		border-radius: 4px;
		border: 2px solid;
		cursor: pointer;
		color: #c23b22;
		margin-bottom: 15px;
		font-size: 1.5rem;
		width: 100%;
		box-sizing: border-box;
		transition: all 0.6s;
		&&:hover {
			background-color: #c23b22;
			border: 2px solid #c23b22;
			color: #fff;
		}
		&&:disabled {
			opacity: 0;
			cursor: default;
			pointer-events: none;
		}
	}*/
</style>
