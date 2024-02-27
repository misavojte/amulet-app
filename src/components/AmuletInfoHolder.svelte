<script lang="ts">
    import { fade } from 'svelte/transition';
    import { _ } from 'svelte-i18n';
    import type { GameStateStore } from '../stores/GameState';
    import { getContext } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    const gameState: GameStateStore = getContext('gameState');
    const dispatch = createEventDispatcher();

    const handleRefuseAmulet = () => {
        dispatch('refuseAmulet');
    }

    const amuletPrice = $gameState.config.priceOfAmulet;

    let canBuyAmulet = false;

    $: canBuyAmulet = $gameState.score >= amuletPrice;

    $: console.log('gs', $gameState)

</script>

<div class="amulet-info-holder">
    {#if $gameState.gameStage === 'AmuletDecision'}
        <div in:fade={{ duration: 799, delay: 800 }} out:fade={{ duration: 799 }}>
            <div>
                {$_('amulet.isNotActive')}
            </div>
            {#if !canBuyAmulet}
            <div>
                {$_('amulet.cannotBuy')}
            </div>
            {:else}
            <div>
                {$_({
                    id: 'amulet.canBuy',
                    values: { price: amuletPrice }
                })}
            </div>
            <button on:click={handleRefuseAmulet}>
                {$_('amulet.refuse')}
            </button>
            {/if}
        </div>
    {:else if $gameState.gameStage === 'BoxDecision'}
        <div in:fade={{ duration: 799, delay: 800 }} out:fade={{ duration: 799 }}>
            <div>
                {$_('box.whichBox')}
            </div>
        </div>
    {:else if $gameState.gameStage === 'AfterBoxDecision'}
        <div in:fade={{ duration: 799, delay: 800 }} out:fade={{ duration: 600 }}>
            <div>
                {#if $gameState.hasCurrentlyWon}
                    {$_({
                        id: 'box.won',
                        values: { score: $gameState.config.scoreOnWin }
                    })}
                {:else}
                    {$_('box.lost')}
                {/if}
            </div>
        </div>
    {/if}
</div>


<style>
    .amulet-info-holder {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 40px;
        user-select: none;
        text-align: center;
    }
    .amulet-info-holder > div > div:nth-child(2) {
        font-size: 20px;
    }
    button {
        background: none;
        border: none;
        padding: 10px 15px;
        border-radius: 4px;
        border: 2px solid;
        cursor: pointer;
        color: #c23b22;
        margin-bottom: 15px;
        transition: all 0.3s;
        font-size: 1rem;
        &&:hover {
            background-color: #c23b22;
            border: 2px solid #c23b22;
            color: #fff;
        }
    }
</style>