<script lang="ts">
    import { fade } from 'svelte/transition';
    import { _ } from 'svelte-i18n';
    import type { GameStateStore } from '../stores/GameState';
    import { getContext } from 'svelte';
    const gameState: GameStateStore = getContext('gameState');

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
</style>