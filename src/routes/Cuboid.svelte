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

    export let xRotation: number = 0;
    export let yRotation: number = 0;

    let xRotationCompensation = -1 * xRotation;
    let yRotationCompensation = -1 * yRotation;

    import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

    let cssVarStyles = `--xLength:${xLength}px;--zLength:${zLength}px;--yLength:${yLength}px;--bottomColor:${bottomColor};--sideAColor:${sideAColor};--sideBColor:${sideBColor};--sideCColor:${sideCColor};--sideDColor:${sideDColor};--topColor:${topColor};--topColorB:${topColorB};`;
    cssVarStyles += `transform:rotateX(${xRotation}deg) rotateY(${yRotation}deg);`;

    export let openTop = false;

    const triggerOpenTop = () => {
        if (!openTop) dispatch('openTopEvent');
        openTop = !openTop;
    }

</script>


<div class="box" style={cssVarStyles} on:click={triggerOpenTop}>
    <div class="bottom"></div>
    <div class="side-a"></div>
    <div class="side-b"></div>
    <div class="side-c"></div>
    <div class="side-d"></div>
    <div class="top" class:open={openTop}></div>
    <div class="content" style="transform:translateZ({zLength / -2}px) rotateY({yRotationCompensation}deg) rotateX({xRotationCompensation}deg)">
        <slot></slot>
        "A"
    </div>
</div>


<style>
    .box {
        position: relative;
        margin: 0 auto;
        transform-style: preserve-3d;
    }
    .bottom, .top {
        position: absolute;
        width: var(--xLength);
        height: var(--zLength);
    }

    .bottom {
        transform: rotateX(-90deg);
        transform-origin: top;
        top: var(--yLength);
        background: var(--bottomColor); 
    }

    .side-a, .side-c {
        position: absolute;
        width: var(--xLength);
        height: var(--yLength);
    }

    .side-a {   
        background: var(--sideAColor);

    }

    .side-b, .side-d {
        position: absolute;
        width: var(--zLength);
        height: var(--yLength);
    }

    .side-b {
        background: var(--sideBColor);
        transform: rotateY(-90deg);
        transform-origin: right;
        right: 0;
    }

    .side-c {
        background: var(--sideCColor);
        transform: translateZ(calc( -1 * var(--zLength) ) );
    }
    .side-d {
        background: var(--sideDColor);
        transform: rotateY(90deg);
        transform-origin: left;
    }
    .top {
        transform: translateZ(-100px) rotateX(90deg);
        transform-origin: top;
        background: var(--topColor);
        transition: transform 1s;
        position: relative;
        transform-style: preserve-3d;
    }

    .top.open {
        transform: translateZ(-100px) rotateX(220deg);
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
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform: translateZ(-50px);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
        font-weight: bold;
        color: white;
        text-shadow: 0 0 10px black;
    }
</style>