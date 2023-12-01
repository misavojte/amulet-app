<script lang="ts">
    import RoundedWrapper from './RoundedWrapper.svelte';
    import { gameState, repeatGameState } from './stores/GameState';
    import { get } from 'svelte/store';
    const gameStateValue = get(gameState);
    if (!gameStateValue) throw new Error('Game state is not set');
    const finalScore = gameStateValue.score;
</script>

<RoundedWrapper>
    <h1>
        Konec hry
    </h1>
    <div class="inner">
        <p>
            Vaše skóre je: {finalScore}
        </p>
        <div class="score-comparison-table">

        </div>
        <button on:click={() => repeatGameState()}>
            Znovu hrát
        </button>
    </div>
</RoundedWrapper>

<style>
    .inner {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        height: 100%;
    }
</style>