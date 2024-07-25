<script lang="ts">
	import RoundedWrapper from './GameModal.svelte';
	import { _ } from 'svelte-i18n';
	import type { GameStateStore } from '../stores/GameState';
	import { getContext } from 'svelte';
	const gameState: GameStateStore = getContext('gameState');

	const startGame = () => {
		gameState.updateState({
			gameStage: 'BoxDecision'
		});
	};
</script>

<RoundedWrapper>
	<h1>
		{$_('app.title')}
	</h1>
	<div class="inner">
		<ul>
			<li>
				{$_('rules.1')}
			</li>
			<li>
				{$_({
					id: 'rules.2',
					values: { score: $gameState.config.scoreOnWin }
				})}
			</li>
			<li>
				{$_({
					id: 'rules.3',
					values: { rounds: $gameState.config.numberOfRounds }
				})}
			</li>
			<li>
				{$_('rules.4')}
			</li>
			<li>
				{$_({
					id: 'rules.5',
					values: { price: $gameState.config.priceOfAmulet }
				})}
			</li>
		</ul>
		<button on:click={startGame}>
			{$_('start.start')}
		</button>
	</div>
</RoundedWrapper>
