<script lang="ts">
    import Cuboid from './Cuboid.svelte';
	import Amulet from './Amulet.svelte';
    import AmuletInfoHolder from './AmuletInfoHolder.svelte';
    import Start from './Start.svelte';
    import End from './End.svelte';
    import { _ } from 'svelte-i18n';

    import type { TimestampType } from '$lib';

	import ConfettiWrapper from './ConfettiWrapper.svelte';
	import type { GameStateStore } from '../stores/GameState';
    import { getContext } from 'svelte';
	import { TimestampService } from '$lib/services/TimestampService';
	import CounterHolder from './CounterHolder.svelte';
    const gameState: GameStateStore = getContext('gameState');

    export let userId: string;

    let hasWonPreviousRound = false;

    const timestampService = new TimestampService();
    const createTimestampEntry = (type: TimestampType) => {
        void timestampService.saveTimestamp(type);
    }
    
    $: {
        if ($gameState?.gameStage === 'BoxDecision') {
            createTimestampEntry('round');
        }
    }

    const playWithAmulet = (state: string): (() => boolean) => {
        if (!$gameState) throw new Error('Game state is not set');
        switch (state) {
            case 'AlwaysWin':
                return () => true;
            case 'AlwaysLose':
                return () => false;
            case 'ZigZag': {
                const round = $gameState.config.numberOfRounds - $gameState.numberOfRounds;
                let hasWon = Math.random() < 0.5;
                if (round !== 0) {
                    hasWon = !hasWonPreviousRound;
                }
                return () => hasWon;
            }
            default:
                return () => Math.random() < 0.5;
        }
    };

    const playWithoutAmulet = () => Math.random() < 0.5;

    const play = (state: string, hasAmulet: boolean): boolean => {
        if (hasAmulet) return playWithAmulet(state)();
        return playWithoutAmulet();
    };

    const playRound = (e: CustomEvent): void => {
        if (!$gameState) throw new Error('Game state is not set');
        const hasWon = play($gameState.scenario, $gameState.hasAmulet);
        hasWonPreviousRound = hasWon;
        const typeOfBox: 'leftBox' | 'rightBox' = e.detail.id === 1 ? 'leftBox' : 'rightBox';
        const type: 'leftBoxWin' | 'leftBoxLoss' | 'rightBoxWin' | 'rightBoxLoss' = hasWon ? `${typeOfBox}Win` : `${typeOfBox}Loss`;
        createTimestampEntry(type);
        gameState.progressFromBoxDecision(hasWon);
    }

</script>

<div class="central-holder">
    {#if $gameState?.gameStage === 'Start'}
        <Start />
    {/if}
    {#if $gameState?.gameStage === 'End'}
        <End />
    {/if}
    <!-- Note that position and therefore visibility of boxes and amulet are controlled by the gameState -->
        <div class="perspective">
            <CounterHolder  />
            <div class="chest-postions">
                <Cuboid on:openTopEvent={playRound}
                xLength={250}
                zLength={220}
                yLength={250}
                bottomColor="#b27500"
                sideAColor="#f4b84f"
                sideBColor="#a96f00"
                sideCColor="#c07d00"
                sideDColor="#cd8606"
                topColor="repeating-linear-gradient(to top,#f6ba52,#f6ba52 10px,#ffd180 10px,#ffd180 20px);"
                topColorB="#dbaa54"
                xRotaionOfParent = {30}
                zRotation={15}
                inDelay={1400}
                id={1}
                />

                <Amulet length={200} on:buyAmulet={() => gameState.purchaseAmulet(true)} />
        
                <Cuboid on:openTopEvent={playRound}
                xLength={250}
                zLength={230}
                yLength={250}
                bottomColor="#e19400"
                sideAColor="#f4b84f"
                sideBColor="#cd8606"
                sideCColor="#d58b00"
                sideDColor="#b97a00"
                topColor="repeating-linear-gradient(to top,#f6ba52,#f6ba52 10px,#ffd180 10px,#ffd180 20px);"
                topColorB="#edad3c"
                xRotaionOfParent = {30}
                zRotation={-10}
                inDelay={1600}
                id={2}
                />
            </div>
            <AmuletInfoHolder on:refuseAmulet={() => gameState.purchaseAmulet(false)} />
            <div class="pattern"></div>
        </div>
</div>
<ConfettiWrapper />





<style>
    @import url('https://fonts.googleapis.com/css2?family=Parisienne&display=swap');
    .central-holder {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 1px;
        flex-grow: 1;
        width: 100%;
        position: relative;
    }
    .perspective {
        transform: perspective(800px) rotateX(25deg);
        transform-style: preserve-3d;
        /* font-family: 'Parisienne', sans-serif; */
        color: #483d41 !important;
        top: 30px;
        position: absolute;
        width: 100%;
        height: 100%;
        }
    
    .chest-postions {
        display: flex;
        justify-content: space-around;
        padding: 6rem;  
        align-items: center;
        transform-style: preserve-3d;
        width: 1200px;
        margin: auto;
    }
    .pattern{
        background: linear-gradient(90deg, #deb887 9.80%, #8b6914 9.80%, #8b6914 10%, #cdaa7d 10%, #cdaa7d 19.80%, #8b6914 19.80%, #8b6914 20%, #deb887 20%, #deb887 29.80%, #8b6914 29.80%, #8b6914 30%, #deb887 30%, #deb887 39.80%, #8b6914 39.80%, #8b6914 40%, #cdaa7d 40%, #cdaa7d 49.80%, #8b6914 49.80%, #8b6914 50%, #deb887 50%, #deb887 59.80%, #8b6914 59.80%, #8b6914 60%, #cdaa7d 60%, #cdaa7d 69.80%, #8b6914 69.80%, #8b6914 70%, #deb887 70%, #deb887 79.80%, #8b6914 79.80%, #8b6914 80%, #deb887 80%, #deb887 89.80%, #8b6914 89.80%, #8b6914 90%, #cdaa7d 90%, #cdaa7d 99.80%, #8b6914 99.80%, #8b6914 100%);
background-size: 700.00px 700.00px;
        position: absolute;
        width: 200%;
        height: 200%;
        bottom: 0;
        left: -50%;
        opacity: 0.1;
        z-index: -1;
        pointer-events: none;
        user-select: none;
    }
</style>