<script lang="ts">
    import RoundedWrapper from './RoundedWrapper.svelte';
    import Leaderboard from './Leaderboard.svelte';
    import { _ } from 'svelte-i18n';
    import type { GameStateStore } from '../stores/GameState';
    import { getContext } from 'svelte';
	import type { UserStateStore } from '../stores/UserState';
    const gameState: GameStateStore = getContext('gameState');
    const userState: UserStateStore = getContext('userState');
</script>

<RoundedWrapper>
    <h1>
        {$_('end.title')}
    </h1>
    <div class="inner">
        {#if $userState.id && $userState.name && $gameState.score}
        <Leaderboard userName={$userState.name} score={$gameState.score} userId={$userState.id} />
        {/if}
        <button on:click={() => gameState.repeat()}>
            {$_('end.repeat')}
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