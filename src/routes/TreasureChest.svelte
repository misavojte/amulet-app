<script>
    import Cuboid from "./Cuboid.svelte";

    import { createEventDispatcher } from 'svelte';

    const brownToDarkGradient = `repeating-linear-gradient(
  to top,
  #f6ba52,
  #f6ba52 10px,
  #ffd180 10px,
  #ffd180 20px
);`

export let openTop = false;

  
</script>

        <Cuboid bind:openTop={openTop} on:openTopEvent
        xLength={120}
        zLength={100}
        yLength={120}
        bottomColor="#b27500"
        sideAColor="#f4b84f"
        sideBColor="#a96f00"
        sideCColor="#c07d00"
        sideDColor="#cd8606"
        topColor={brownToDarkGradient}
        topColorB="#dbaa54"
        xRotation={293}
        yRotation={17}
        />