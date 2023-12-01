<script lang="ts">
	import Game from "./Game.svelte";
    import { resetGameState, gameState } from "./stores/GameState";
    import type { GameState } from "./stores/GameState";
    import { gameConfigStore } from "./stores/GameConfigStore";

    const gameConfig = {
        numberOfRounds: 2,
        startScore: 30,
        scenario: 'Random',
        priceOfAmulet: 20,
    };

    let currentGameState : GameState | null;
    gameState.subscribe(value => {
        currentGameState = value;
    });

    const load = async () => {
        gameConfigStore.set(gameConfig);
        await new Promise(resolve => setTimeout(resolve, 1000));
        resetGameState();
    };

    load();

</script>

{#if currentGameState === null}
    <div>
        Loading...
    </div>
{:else}
<Game />
{/if}

