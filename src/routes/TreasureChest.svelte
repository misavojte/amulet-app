<script>
    import Cuboid from "./Cuboid.svelte";

    const brownToDarkGradient = `repeating-linear-gradient(
  to top,
  #f6ba52,
  #f6ba52 10px,
  #ffd180 10px,
  #ffd180 20px
);`

  
</script>

<div class="treasure-chest">
        <Cuboid 
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
        />
</div>

<style>
    .treasure-chest {
        position: relative;
        margin: 0 auto;
        transform-style: preserve-3d;
        transform: rotateX(293deg) rotateY(17deg)
    }


    .bottom {
        transform-style: preserve-3d;
    }
</style>