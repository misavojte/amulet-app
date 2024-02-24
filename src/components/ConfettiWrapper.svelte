<script lang="ts">
    import { ConfettiCannon } from 'svelte-canvas-confetti';
    import { tick } from 'svelte';
    import { getContext } from 'svelte';
	import type { GameStateStore } from '../stores/GameState';

    let confettiActivation: Array<{id: number, type: 'left' | 'right'}> = [];

    let confettiWrap;
    let currentId = 0;

    const gameState: GameStateStore = getContext('gameState');

    // Watch for changes in gameState to trigger confetti
    $: if ($gameState.hasCurrentlyWon) {
        fireBothConfettiInRandomOrderAndDelay();
    }   

    const fireBothConfettiInRandomOrderAndDelay = async () => {
        console.log('fireBothConfettiInRandomOrderAndDelay');
        const delay = 800
        await tick();
        gameState.updateState({ hasCurrentlyWon: false });    // Reset the hasCurrentlyWon flag
        const triggerFirst = Math.random() > 0.5 ? 'left' : 'right';
        triggerConfetti(triggerFirst);
        await new Promise(resolve => setTimeout(resolve, delay));
        triggerConfetti(triggerFirst === 'left' ? 'right' : 'left');

    };

    const triggerConfetti = (side: 'left' | 'right') => {
        if (side === 'left') {
            confettiActivation[0] = {id: currentId++, type: 'left'};
        } else {
            confettiActivation[1] = {id: currentId++, type: 'right'};
        }
    }
</script>

<div class="confetti-wrap" bind:this={confettiWrap}>
    {#each confettiActivation as confetti (confetti.id)}
        <ConfettiCannon origin={[confetti.type === 'left' ? 0 : confettiWrap.clientWidth, confettiWrap.clientHeight]} force={30} particleCount={100} />
    {/each}
</div>

<style>
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