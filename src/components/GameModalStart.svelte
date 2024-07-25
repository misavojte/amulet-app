<script lang="ts">
	import RoundedWrapper from './GameModal.svelte';
	import { _ } from 'svelte-i18n';
	import type { GameStateStore } from '../stores/GameState';
	import { getContext } from 'svelte';
	import UIButton from './UIButton.svelte';
	const gameState: GameStateStore = getContext('gameState');

	const startGame = () => {
		gameState.updateState({
			gameStage: 'BoxDecision'
		});
	};
</script>

<RoundedWrapper>
	<h1 class="text-center text-2xl font-bold">
		{$_('app.title')}
	</h1>
	<ol class="text-center max-w-sm mx-auto text-lg">
		<li class="border-b-neutral-300 border-t-neutral-300 p-2 border-solid border-b border-t">
			{$_('rules.1')}
		</li>
		<li class="border-b-neutral-300 p-2 border-solid border-b">
			{$_({
				id: 'rules.2',
				values: { score: $gameState.config.scoreOnWin }
			})}
		</li>
		<li class="border-b-neutral-300 p-2 border-solid border-b">
			{$_({
				id: 'rules.3',
				values: { rounds: $gameState.config.numberOfRounds }
			})}
		</li>
		<li class="border-b-neutral-300 p-2 border-solid border-b">
			{$_('rules.4')}
		</li>
		<li class="border-b-neutral-300 p-2 border-solid border-b">
			{$_({
				id: 'rules.5',
				values: { price: $gameState.config.priceOfAmulet }
			})}
		</li>
	</ol>
	<UIButton on:click={startGame} text={$_('start.start')} />
</RoundedWrapper>
