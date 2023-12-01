<script lang="ts">

	import Counter from './Counter.svelte';
	import { ConfettiCannon } from 'svelte-canvas-confetti';
	import {tick} from 'svelte';
    import Cuboid from './Cuboid.svelte';
	import Amulet from './Amulet.svelte';
    import AmuletInfoHolder from './AmuletInfoHolder.svelte';
    import Start from './Start.svelte';
    import End from './End.svelte';

    import type { GameState } from './stores/GameState';
    import { gameState, updateGameState } from './stores/GameState';

    let hasAmulet = false;
    let currentGameState : GameState;

    gameState.subscribe(value => {
        if (!value) throw new Error('Game state is not set');
        currentGameState = value;
    });


    const playWithAmulet = (state: string): (() => boolean) => {
        switch (state) {
            case 'AlwaysWin':
                return () => true;
            case 'AlwaysLose':
                return () => false;
            default:
                return () => Math.random() < 0.5;
        }
    };

    const playWithoutAmulet = () => Math.random() < 0.5;

    const play = (state: string, hasAmulet: boolean): boolean => {
        if (hasAmulet) return playWithAmulet(state)();
        return playWithoutAmulet();
    };

    const playRound = (): void => {
        if (currentGameState.numberOfRounds === 1) {
            playLastRound();
            return;
        }
        const hasWon = play(currentGameState.scenario, hasAmulet);
        updateGameState({ 
            hasCurrentlyWon: hasWon,
            blockInteraction: true,
            score: currentGameState.score + (hasWon ? SCORE_ON_WIN : 0),
            numberOfRounds: currentGameState.numberOfRounds - 1 
        });
        hasAmulet = false;
        setTimeout(() => {
            animateInRight = 'Out';
        }, 2200);
        setTimeout(() => {
            animateInLeft = 'Out';
        }, 2300);
        setTimeout(() => {
            animateInLeft = 'In';
        }, 4000);
        setTimeout(() => {
            animateInRight = 'In';
            updateGameState({ blockInteraction: false });
        }, 4100);
    };

    const playLastRound = () => {
        const hasWon = play(currentGameState.scenario, hasAmulet);
        updateGameState({ 
            hasCurrentlyWon: hasWon,
            blockInteraction: true,
            score: currentGameState.score + (hasWon ? SCORE_ON_WIN : 0),
            gameStage: 'End'
        });
    }

    const SCORE_ON_WIN = 30;

    let triggerLeftConfetti = false;
    let triggerRightConfetti = false;


    $: {

        if (currentGameState.hasCurrentlyWon) {
            makeLeftConfetti();
            setTimeout(makeRightConfetti, 1000);
            setTimeout( () => {
                updateGameState({ hasCurrentlyWon: false });
            }, 500);
        }
        
        if (currentGameState.gameStage === 'Game' && animateInLeft === 'In') {
            animateInLeft = 'None';
            animateInRight = 'None';
            setTimeout(() => {
                animateInLeft = 'In';
            }, 1000);
            setTimeout(() => {
                animateInRight = 'In';
            }, 1200);
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

    const AMULET_PRICE = 20;

    const buyAmulet = () => {
        if (currentGameState.score >= AMULET_PRICE) {
            currentGameState.score -= AMULET_PRICE;
            hasAmulet = true;
        }
    }

    let animateInLeft: 'In' | 'Out' | 'None' = 'None';
    let animateInRight: 'In' | 'Out' | 'None' = 'None';

    setTimeout(() => {
        animateInLeft = 'In';
    }, 100);

    setTimeout(() => {
        animateInRight = 'In';
    }, 400);

</script>

<div class="central-holder">
    {#if currentGameState.gameStage === 'Start'}
        <Start />
    {/if}
    {#if currentGameState.gameStage === 'End'}
        <End />
    {/if}

    <div class="perspective">
        <div class="counter">
            <Counter count={currentGameState.numberOfRounds} text="Zbývající kola" />
            <Counter count={currentGameState.score} text="Skóre" />
        </div>
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
            animateIn={animateInLeft}
            />

            <Amulet on:click={buyAmulet}
            length={200}
            hasAmulet={hasAmulet}
            />
    
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
            animateIn={animateInRight}
            />
        </div>
        <AmuletInfoHolder hasAmulet={hasAmulet} amuletPrice={AMULET_PRICE} score={currentGameState.score} />
        <div class="pattern"></div>
    
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
        transform: perspective(800px) rotateX(30deg);
        transform-style: preserve-3d;
        /* font-family: 'Parisienne', sans-serif; */
        color: #483d41 !important;
        bottom: 30px;
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
    .counter {
        margin-top: 50px;
        text-align: center;
        margin-left: auto;
        justify-content: center;
        display:flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
    }

</style>