<script lang="ts">
    export let xLength: number = 200;
    export let zLength: number = 100;
    export let yLength: number = 50;  
    export let bottomColor: string = '#00f';
    export let sideAColor: string = '#f00';
    export let sideBColor: string = '#0f0';
    export let sideCColor: string = '#ff0';
    export let sideDColor: string = '#0ff';
    export let topColor: string = '#f0f';
    export let topColorB: string = '#0ff';

    export let zRotation: number = 0;

    export let xRotaionOfParent: number = 0;
    export let zRotaionOfParent: number = 0;

    export let hasCurrentlyWon = writable(false);

    let xRotationCompensation = -1 * xRotaionOfParent;
    let zRotationCompensation = -1 * zRotaionOfParent - zRotation;
    import { createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';
    import { tick } from 'svelte';
	import Coin from './Coin.svelte';

	const dispatch = createEventDispatcher();

    let cssVarStyles = `--xLength:${xLength}px;--zLength:${zLength}px;--yLength:${yLength}px;--bottomColor:${bottomColor};--sideAColor:${sideAColor};--sideBColor:${sideBColor};--sideCColor:${sideCColor};--sideDColor:${sideDColor};--topColor:${topColor};--topColorB:${topColorB};`;
    cssVarStyles += `transform:rotateZ(${zRotation}deg);`;

    export let openTop = false;

    let showContent = false;
    let blockInteraction = false;
    let isReadyToOpen = true;


    const triggerOpenTop = async () => {
        if (blockInteraction) {
            return;
        }
        blockInteraction = true;
        if (!openTop) {
            dispatch('openTopEvent');
            openTop = !openTop;
            isReadyToOpen = false;
            await tick();
            if ($hasCurrentlyWon.valueOf()) {
                showContent = true;
            }
            const onTransitionEnd = () => {
                blockInteraction = false;
                topElement.removeEventListener('transitionend', onTransitionEnd);
            };
            topElement.addEventListener('transitionend', onTransitionEnd);
        } else {
            blockInteraction = true;
            openTop = !openTop;
            const onTransitionEnd = () => {
                showContent = false;
                blockInteraction = false;
                isReadyToOpen = true;
                topElement.removeEventListener('transitionend', onTransitionEnd);
            };
            topElement.addEventListener('transitionend', onTransitionEnd);
        }
    }
    let topElement: HTMLDivElement;

</script>

<div class="box" style={cssVarStyles} on:click={triggerOpenTop}> 
    <div class="bottom"></div>
    <div class="side-a"></div>
    <div class="side-b"></div>
    <div class="side-c"></div>
    <div class="side-d"></div>
    <div class="top" class:open={openTop} class:ready={isReadyToOpen} bind:this={topElement}></div>
    <div class="content" class:show={showContent} style="transform:translateZ({zLength / 2}px) rotateZ({zRotationCompensation}deg) rotateX({xRotationCompensation}deg)">
        <Coin />
    </div>
    <div class="shadow"></div>
</div>


<style>
    .box {
        position: relative;
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
        transform: translateZ(1px); 
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

    .box:hover .top.ready {
        transform: translateZ( var(--zLength)) rotateX(2deg);
    }

    .top.open {
        transform: translateZ( var(--zLength)) rotateX(155deg) !important;
    }

    .top::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--topColorB);
        transform: translateZ(-1px); /* Slight adjustment to create 3D effect */
    }

    .content {
        position: absolute;
        display: none;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        /* transformation in style tag */
        justify-content: center;
        align-items: center;
        font-size: 2rem;
        font-weight: bold;
        color: white;
        text-shadow: 0 0 10px black;
    }

    .show {
        display: flex;
    }

    .shadow {
        position: absolute;
        width: var(--xLength);
        height: var(--yLength);
        background: rgba(0,0,0,0.5);
        filter: blur(10px);
        top: 0;
    }

</style>