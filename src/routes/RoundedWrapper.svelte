<script>
    export let isDarkTheme = false;
    import { fade } from 'svelte/transition';
</script>

<div class="rounded" class:dark={isDarkTheme} in:fade={{ duration: 300, delay: 1500 }} out:fade={{ duration: 100 }}> 
    <div class="inner">
        <slot></slot>
    </div>
</div>

<style>
    .rounded {
        backdrop-filter: blur(10px);
        padding: 10px;
        -webkit-backdrop-filter: blur(10px);
        z-index: 999;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        color: #000;
        background: rgba(255, 255, 255, 0.75);
        position: absolute;
        top: 0;
        left: 0;
    }

    .inner {
        background: none;
        padding: 10px 20px;
        box-sizing: border-box;
        -moz-background-clip: padding;
        -webkit-background-clip: padding;
        background-clip: padding-box;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;
        border: 15px double rgb(0 0 0 / 6%);
        box-sizing: border-box;
        border-radius: 25px;
        width: 480px;
        height: 480px;
        gap: 20px;
    }

    .rounded.dark {
        color: #fff;
        background: rgba(0, 0, 0, 0.75);
    }
</style>
