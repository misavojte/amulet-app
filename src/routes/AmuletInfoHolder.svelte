<script lang="ts">
    import { fade } from 'svelte/transition';

    export let hasAmulet = false;
    export let score = 0;
    export let amuletPrice = 0;

    let canBuyAmulet = false;

    $: canBuyAmulet = score >= amuletPrice;

</script>

<div class="amulet-info-holder">
    {#if hasAmulet}
        <div in:fade={{ duration: 799, delay: 800 }} out:fade={{ duration: 799, delay: 800 }}>
            Amulet je aktivní
        </div>
    {:else}
        <div in:fade={{ duration: 799, delay: 1600 }} out:fade={{ duration: 799 }}>
            <div>
                Amulet není zakoupen
            </div>
            {#if !canBuyAmulet}
            <div>
                Nemáš dostatek bodů pro jeho koupi
            </div>
            {:else}
            <div>
                Kliknutím jej můžeš koupit za {amuletPrice} bodů
            </div>
            {/if}
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
    }
    .amulet-info-holder > div > div:nth-child(2) {
        font-size: 20px;
    }
</style>