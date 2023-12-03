<script lang="ts">
	import Game from "./Game.svelte";
    import { resetGameState, gameState } from "./stores/GameState";
    import type { GameState } from "./stores/GameState";
    import { gameConfigStore } from "./stores/GameConfigStore";
    import { getAuthAnonymousUser, writeRoundData } from "../firebase";
    import { Circle3 } from "svelte-loading-spinners";

    const gameConfig = {
        numberOfRounds: 5,
        startScore: 30,
        scenario: 'Random',
        priceOfAmulet: 20,
        scoreOnWin: 30,
    };

    let userId: string = "";

    let currentGameState : GameState | null = null;
    gameState.subscribe(value => {
        currentGameState = value;
    });

    const load = async () => {
        gameConfigStore.set(gameConfig);
        userId = await getAuthAnonymousUser();
        resetGameState();
    };

    load();

</script>

{#if !currentGameState}
    <div class="center">
        <Circle3 />
        <p>
            Hra se načítá
        </p>
    </div>
{:else}
<Game userId={userId} />
{/if}

<style>
    .center {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
        height: 100%;
        width: 100%;
    }
</style>
