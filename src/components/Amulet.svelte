<script lang="ts">
    import type { GameStateStore } from '../stores/GameState';
    import { getContext } from 'svelte';
    import { createEventDispatcher } from 'svelte';

    export let length: number = 50;  
    export let bottomColor: string = '#896c89';
    export let sideAColor: string = '#b572b5';
    export let sideBColor: string = '#b572b5';
    export let sideCColor: string = '#b572b5';
    export let sideDColor: string = '#b572b5';
    export let topColor: string = '#d995d9';
    export let xRotation: number = 30;
    export let zRotation: number = 0;
    
    const gameState: GameStateStore = getContext('gameState');

    let hoverExtra: boolean = false;

    $ : hoverExtra = $gameState.hasAmulet;


    let xLength = length;
    let zLength = length/10;
    let yLength = length;

    const evaluateTransition = (e: TransitionEvent) => {
        if (e.target === e.currentTarget) {
            if ($gameState.hasAmulet) {
                hoverExtra = !hoverExtra;
                return;
            }
            hoverExtra = false;
        }
    }

    const dispatch = createEventDispatcher();

    const evaluateClick = () => {
        if (!$gameState.hasAmulet && !$gameState.blockInteraction && $gameState.gameStage === 'AmuletDecision') {
            dispatch('buyAmulet');
        }
    }

    let cssVarStyles = `--xLength:${xLength}px;--zLength:${zLength}px;--yLength:${yLength}px;--bottomColor:${bottomColor};--sideAColor:${sideAColor};--sideBColor:${sideBColor};--sideCColor:${sideCColor};--sideDColor:${sideDColor};--topColor:${topColor};`;

    // True if in last BoxDecision round hasAmulet was set to true
    let wasAmuletActiveInThisRound: boolean = false;
    $: if ($gameState.gameStage === 'BoxDecision') {
        wasAmuletActiveInThisRound = $gameState.hasAmulet;
    }

    $: if ($gameState.gameStage === 'AmuletDecision') {
        wasAmuletActiveInThisRound = false;
    }

</script>

<div class="main" style={cssVarStyles} on:click={evaluateClick} class:hidden={!$gameState.hasAmulet && !wasAmuletActiveInThisRound && $gameState.gameStage !== 'AmuletDecision'}>
    <div class="moving-part" class:hover={$gameState.hasAmulet}>
    <div class="animating-part" class:animate={hoverExtra} on:transitionend={evaluateTransition}>
        <div class="box">
            <div class="bottom"></div>
            <div class="side-a"></div>
            <div class="side-b"></div>
            <div class="side-c"></div>
            <div class="side-d"></div>
            <div class="top"></div>
        </div>
        <div class="box">
            <div class="bottom"></div>
            <div class="side-a"></div>
            <div class="side-b"></div>
            <div class="side-c"></div>
            <div class="side-d"></div>
            <div class="top"></div>
        </div>
        <div class="star-top">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g class="inner" transform="translate(-28.911 -23.54) scale(1.26436)"><path fill="#00000087" d="M58.33 41.38c-1.57 2.08-3.05 4.18-4.97 5.97q-2.97 2.76-5.77 5.79-.38.41-.26.94.28 1.21.92 2.27a1.12 1.12 0 0 0 1.58.35c5.78-3.87 11.1-4.19 15.48 1.95q1.45 2.04 1.57 4.3a1.06 1.06 0 0 1-.52.98q-1.04.63-2.33.54c-2.47-.18-2.55-3.51-4.37-4.78-3.54-2.49-7.64 1.62-10.14 3.91a2.08 2.08 0 0 1-3.43-1.02q-.61-2.41-2.1-4.74a.75.75 0 0 0-1.21-.08c-1.46 1.77-3.08 3.43-5.62 2.51q-.46-.17-.59-.64c-.74-2.7 2.45-4.88 4.23-6.47a1.06 1.06 0 0 0 .24-1.26L35.6 41.04a1.36 1.35-58 0 1-.15-.66q.02-2.64 1.69-2.91 1.89-.31 2.66 1.45 2.04 4.69 4.93 9.4.5.81.97-.01.85-1.45 2-2.68 4.32-4.61 8.97-8.9c.91-.84 1.31-1.75 1.62-2.94q.18-.68.87-.75 1.82-.19 3.58.33.53.16.59.71c.17 1.64.07 3.21.8 4.75q2.75 5.77 5.19 12.22c1.03 2.74 2.86 4.65 3.28 7.64a.79.79 0 0 0 1.29.49l4.68-3.99a.68.68 0 0 0 .04-.99l-8.49-8.49a2.2 2.19 58 0 1 .84-3.63q2.11-.72 3.26-2.89a.9.89-64 0 0-.42-1.24c-1.62-.74-3.44-2.11-2.94-4.16q.87-3.51 4.34-3.53c1.7 0 4.06.01 5.19 1.51 2.43 3.2-1.73 10.07-3.83 12.38q-.4.45.05.84 4.51 3.9 8.58 9.21a1.89 1.89 0 0 1-.33 2.63l-9.19 7.32q-.46.36-.24.9 1.71 4.19 4.12 8.26 1.15 1.95.17 3.85a1.13 1.11-77.4 0 1-.94.61q-2.39.14-4.54.69-9.37 2.4-20.33 4.12-2.4.37-4.74.02a.89.87-4.8 0 1-.71-.59q-.44-1.3-.14-2.68.1-.47.48-.76l19.5-14.94a1.63 1.61-29.8 0 0 .52-1.88q-4.01-9.9-8.95-20.22-.65-1.34-1.54-.15Zm15.23 32.6a.47.47 0 0 0 .34-.66l-2.37-5.28a.47.47 0 0 0-.71-.18l-10.34 7.82a.47.47 0 0 0 .37.83l12.71-2.53Z"/><ellipse fill="#00000087" transform="rotate(-4 1023.604 -588.283)" rx="3.79" ry="3.31"/></g><g class="outer" transform="translate(206.707 133.509)"/></svg>
        </div>
    </div>
    </div>
    <div class="shadow">
        <div></div>
    </div>
</div>

<style>
    .hidden {
        transform: translateY(-1000px) !important;
    }
    .main {
        transition: transform 1.5s;
    }
    div {
        transform-style: preserve-3d;
    }
    
    .box:first-child {
        transform: rotateZ(45deg);
    }

    .box {
        position: absolute;
        margin: 0 auto;
        transform-style: preserve-3d;
        width: var(--xLength);
        height: var(--yLength);
        cursor: pointer;
    }

    .bottom, .top {
        position: absolute;
        width: var(--xLength);
        height: var(--yLength);
    }

    .bottom {
        background: var(--bottomColor); 
    }

    .side-a, .side-c {
        position: absolute;
        width: var(--xLength);
        height: var(--zLength);
    }

    .side-a {   
        background: var(--sideAColor);
        transform-origin: bottom;
        transform: rotateX(-90deg);
        bottom: 0;
    }

    .side-b, .side-d {
        position: absolute;
        width: var(--zLength);
        height: var(--yLength);
    }

    .side-b {
        background: var(--sideBColor);
        transform-origin: right;
        transform: rotateY(90deg);
        right: 0;
    }

    .side-c {
        background: var(--sideCColor);
        transform-origin: top;
        transform: rotateX(90deg);
        top: 0;
    }

    .side-d {
        background: var(--sideDColor);
        transform-origin: left;
        transform: rotateY(-90deg);
        left: 0;
    }

    .top {
        transform: translateZ( var(--zLength));
        background: var(--topColor);
        transition: transform 1s;
        position: relative;
        transform-style: preserve-3d;
        transform-origin: top;
    }
    .star-top {
        position: absolute;
        top: 0;
        left: 0;
        width: var(--xLength);
        height: var(--yLength);
        background: var(--topColor);
        transform: translateZ(calc(var(--zLength) + 1px));
        transform-origin: top;
        transition: transform 1s;
        transform-style: preserve-3d;
        box-sizing: border-box;
    }
    .star-top svg {
        width: 100%;
        height: 100%;
    }

    path, ellipse {
        transition: all 0.05s;
        transition-delay: 0.15s;
    }

    .main {
        width: var(--xLength);
        height: var(--yLength); 
        cursor: pointer;
    }

    svg {
        pointer-events: none;
    }

    .moving-part.hover svg path, .moving-part:hover svg path, .moving-part.hover svg ellipse, .moving-part:hover svg ellipse {
        filter: drop-shadow(0 0 10px #e7eef3);
        fill: #e7eef3;
    }

    .moving-part {
        transition: 1s ease-in-out all;
        transform: translateZ(0);
    }

    .moving-part.hover {
        transform: translateZ(35px);
    }

    .animating-part {
        transition: transform 1s ease-in-out;
    }

    .animating-part.animate {
        transform: translateZ(10px);
    }


    .shadow {
        position: absolute;
        width: var(--xLength);
        height: var(--yLength);
        background: rgba(0,0,0,0.5);
        filter: blur(10px); 
    }


    @keyframes moving {
        0% {
            transform: translateZ(0px);
        }
        50% {
            transform: translateZ(10px);
        }
        100% {
            transform: translateZ(0px);
        }
    }
</style>