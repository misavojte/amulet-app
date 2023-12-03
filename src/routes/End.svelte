<script lang="ts">
    import RoundedWrapper from './RoundedWrapper.svelte';
    import { repeatGameState } from './stores/GameState';
    import Leaderboard from './Leaderboard.svelte';
    
    export let userName: string | undefined;
    export let score: number;
    export let userId: string;
</script>

<RoundedWrapper>
    <h1>
        Konec hry
    </h1>
    <div class="inner">
        {#if userName}
        <Leaderboard userName={userName} score={score} userId={userId} />
        {/if}
        <button on:click={() => repeatGameState()}>
            Znovu hrát
        </button>
    </div>
</RoundedWrapper>

<style>
    h1 {
        margin-bottom: 0;
        font-size:25px;
    }
    .inner {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        height: 100%;
        width: 100%;
    }
    p {
        margin-top: 0;
    }
    button {
        background: #efeeed;
        border: none;
        padding: 10px 15px;
        border-radius: 4px;
        border: 1px solid;
        cursor: pointer;
        margin-bottom: 15px;
    }
    button:hover {
        background: #d0cecd;
    }
</style>