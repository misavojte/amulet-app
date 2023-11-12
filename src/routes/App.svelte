<script lang="ts">
	import Game from "./Game.svelte";
  
    type GameState = 'AlwaysWin' | 'AlwaysLose' | 'Random';

    const getGameState = (forcedState: GameState | null = null): GameState => {
        if (forcedState) return forcedState;
        // todo: get from server
        return 'Random';
    }

    

</script>

<Game gameState={getGameState()} />

