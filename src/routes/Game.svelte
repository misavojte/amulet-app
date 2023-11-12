<script lang="ts">

    import { writable } from 'svelte/store';
    import type { GameState } from '$lib';
	import TreasureChest from './TreasureChest.svelte';
	import Counter from './Counter.svelte';
	import { ConfettiCannon } from 'svelte-canvas-confetti';
	import {tick} from 'svelte';

    export let gameState: GameState;

    let numberOfRounds = 5;

    const hasCurrentlyWon = writable(false);

    const playWithAmulet = (state: GameState): (() => boolean) => {
        switch (state) {
            case 'AlwaysWin':
                return () => true;
            case 'AlwaysLose':
                return () => false;
            case 'Random':
                return () => Math.random() < 0.5;
        }
    };

    const playWithoutAmulet = () => Math.random() < 0.5;

    const play = (state: GameState, hasAmulet: boolean): boolean => {
        if (hasAmulet) return playWithAmulet(state)();
        return playWithoutAmulet();
    };

    const playRound = (): void => {
        hasCurrentlyWon.set(play(gameState, true));
        numberOfRounds--;
    };

    let score = 0;

    const SCORE_ON_WIN = 30;

    let triggerLeftConfetti = false;
    let triggerRightConfetti = false;

    if ($hasCurrentlyWon) {
        alert("ahoj")
    }

    $: {
        if ($hasCurrentlyWon) {
            score += SCORE_ON_WIN;
            makeLeftConfetti();
            setTimeout(makeRightConfetti, 1000); 
        }
    }

    $ : {
        if (numberOfRounds === 0) {
            //alert(`Konec hry! Skóre: ${score}`);
            numberOfRounds = 5;
            score = 0;
        }
    }

    const makeLeftConfetti = async () => {
		triggerLeftConfetti = false;
		await tick();
		triggerLeftConfetti = true;
	}

    const makeRightConfetti = async () => {
		triggerRightConfetti = false;
		await tick();
		triggerRightConfetti = true;
	}

    let confettiWrap: HTMLDivElement;

</script>

<div class="counter-holder">
    <Counter count={numberOfRounds} text="Zbývající kola" />
    <Counter count={score} text="Skóre" />
</div>

<div>
    <div on:click={playRound}>
        <TreasureChest />
    </div>
</div>

<div class="confetti-wrap" bind:this={confettiWrap}>
    {#if triggerLeftConfetti}
        <ConfettiCannon origin={[0, confettiWrap.clientHeight]} force={30} particleCount={100} />
    {/if}
    {#if triggerRightConfetti}
        <ConfettiCannon origin={[confettiWrap.clientWidth, confettiWrap.clientHeight]} force={30} particleCount={100} />
    {/if}
</div>

<style>
    .counter-holder {
        display: flex;
        justify-content: space-between;
        margin-bottom: 2rem;
        padding: 2rem;
    }
    .confetti-wrap {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 500;
        user-select: none;
        pointer-events: none;
    }
</style>