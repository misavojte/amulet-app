<script>
    import RoundedWrapper from "./RoundedWrapper.svelte";
    import { updateGameState } from "./stores/GameState";

    let screenTab = 0;

    let name = '';

    const startGame = () => {
        updateGameState({ 
            gameStage: 'Game',
            userName: name
        });
    }
</script>

<RoundedWrapper>
    <h1>
        <span>
            Hra
        </span>
        <span>
            Amulet
        </span>
    </h1>
    {#if screenTab === 0}
    <div class="inner">
        <ul>
            <li>
                Cílem hry je získat co největší skóre.
            </li>
            <li>
                V každém kole můžete získát 30 bodů tím, že uhodnete, v které ze dvou krabic je poklad.
            </li>
            <li>
                Hra má 5 kol.
            </li>
            <li>
                Pro každé kolo lze zakoupit amulet, který může zvýšit vaše šance na výhru.
            </li>
            <li>
                Amulet stojí 20 bodů.
            </li>
            <li>
                Hra končí po 5 kolech nebo vyčerpáním bodů.
            </li>
        </ul>
        <button on:click={() => screenTab = 1}>
            Pokračovat
        </button>
    </div>
    {:else}
        <form class="inner" on:submit|preventDefault={startGame}>
            <label>
                Zadejte své jméno:
                <input type="text" name="name" required bind:value={name} />
            </label>
            <input type="submit" value="Začít hru" />
        </form>
    {/if}
    <div class="tabIndicator">
        <div class="tabIndicatorItem active"></div>
        <div class="tabIndicatorItem" class:active={screenTab === 1}></div>
    </div>
</RoundedWrapper>

<style>
    h1 {
        margin-bottom: 0;
        font-size:25px;
    }
    .tabIndicator {
        display: flex;
        justify-content: center;
        gap: 4px;
    }
    .tabIndicatorItem {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: none;
        border: 1px solid #000;
    }
    .tabIndicatorItem.active {
        background: #000;
    }
    .inner {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        height: 100%;
    }
    label {
        display: flex;
        flex-direction: column;
        gap: 6px;
        text-align: center;
    }
    button, input[type="submit"] {
        background: #efeeed;
        border: none;
        padding: 10px 15px;
        border-radius: 4px;
        border: 1px solid;
        cursor: pointer;
    }
    button:hover, input[type="submit"]:hover {
        background: #d0cecd;
    }
    ul {
        line-height: 1.25;
    }
    li {
        margin-bottom: 6px;
    }

</style>