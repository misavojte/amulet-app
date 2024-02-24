<script lang="ts">
    import { ConfettiCannon } from 'svelte-canvas-confetti';
    import { tick } from 'svelte';
    import { gameState } from '../stores/GameState';

    let triggerLeftConfetti = false;
    let triggerRightConfetti = false;

    let confettiWrap;

    // Watch for changes in gameState to trigger confetti
    $: $gameState?.gameStage === 'Game' && $gameState?.hasCurrentlyWon && fireBothConfettiInRandomOrderAndDelay();

    const getRandomDelay = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
    }

    const fireBothConfettiInRandomOrderAndDelay = async () => {
        const randomDelay = getRandomDelay(300, 800); // Generate a random delay between 300ms and 800ms
        const triggerFirst = Math.random() > 0.5 ? 'left' : 'right';
        triggerConfetti(triggerFirst);
        await new Promise(resolve => setTimeout(resolve, randomDelay));
        triggerConfetti(triggerFirst === 'left' ? 'right' : 'left');
    };

    const triggerConfetti = (side: 'left' | 'right') => {
        if (side === 'left') {
            triggerLeftConfetti = true
            tick().then(() => triggerLeftConfetti = false);
        } else {
            triggerRightConfetti = true
            tick().then(() => triggerRightConfetti = false);
        }
    }
</script>

<div class="confetti-wrap" bind:this={confettiWrap}>
    {#if triggerLeftConfetti}
        <ConfettiCannon origin={[0, confettiWrap.clientHeight]} force={30} particleCount={100} />
    {/if}
    {#if triggerRightConfetti}
        <ConfettiCannon origin={[confettiWrap.clientWidth, confettiWrap.clientHeight]} force={30} particleCount={100} />
    {/if}
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