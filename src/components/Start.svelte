<script>
    import RoundedWrapper from "./RoundedWrapper.svelte";
    import { updateGameState } from "../stores/GameState";
    import { _ } from 'svelte-i18n';
    import { get } from "svelte/store";
    import { gameConfigStore } from "../stores/GameConfigStore";

    let screenTab = 0;

    let name = '';

    const config = get(gameConfigStore);
    if (!config) throw new Error('Game state is not set');

    const startGame = () => {
        updateGameState({ 
            gameStage: 'Game',
            userName: name
        });
    }

</script>

<RoundedWrapper>
    <h1>
        {$_('app.title')}
    </h1>
    {#if screenTab === 0}
    <div class="inner">
        <ul>
            <li>
                {$_('rules.1')}
            </li>
            <li>
                {$_({
                    id: 'rules.2',
                    values: { score: config.scoreOnWin }
                })}
            </li>
            <li>
                {$_({
                    id: 'rules.3',
                    values: { rounds: config.numberOfRounds }
                })}
            </li>
            <li>
                {$_('rules.4')}
            </li>
            <li>
                {$_({
                    id: 'rules.5',
                    values: { price: config.priceOfAmulet }
                })}
            </li>
        </ul>
        <button on:click={() => screenTab = 1}>
            {$_('start.continue')}
        </button>
    </div>
    {:else}
        <form class="inner" on:submit|preventDefault={startGame}>
            <label>
                {$_('start.nameInput')}
                <input type="text" name="name" required bind:value={name} />
            </label>
            <input type="submit" value="{$_('start.start')}" />
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