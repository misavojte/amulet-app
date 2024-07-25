<script lang="ts">
	import Cuboid from './GameCuboid.svelte';
	import CounterHolder from './GameCounter.svelte';
	import GameAmulet from './GameAmulet.svelte';
	import GameInstruction from './GameInstruction.svelte';
</script>

<div class="perspective">
	<CounterHolder />
	<div class="chest-postions">
		<Cuboid
			on:openTopEvent
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
			xRotaionOfParent={30}
			zRotation={15}
			inDelay={0}
			id={1}
		/>

		<GameAmulet on:buyAmulet on:refuseAmulet />

		<Cuboid
			on:openTopEvent
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
			xRotaionOfParent={30}
			zRotation={-10}
			inDelay={0}
			id={2}
		/>
	</div>
	<GameInstruction />
	<div class="pattern" />
</div>

<style>
	.perspective {
		transform: perspective(100vh) rotateX(25deg) translateY(-5%);
		transform-style: preserve-3d;
		/* font-family: 'Parisienne', sans-serif; */
		color: #483d41 !important;
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-width: 1200px;
	}

	.chest-postions {
		display: flex;
		justify-content: space-around;
		padding: 6rem;
		align-items: center;
		transform-style: preserve-3d;
		width: 1200px;
	}

	.pattern {
		background: linear-gradient(
			90deg,
			#deb887 9.8%,
			#8b6914 9.8%,
			#8b6914 10%,
			#cdaa7d 10%,
			#cdaa7d 19.8%,
			#8b6914 19.8%,
			#8b6914 20%,
			#deb887 20%,
			#deb887 29.8%,
			#8b6914 29.8%,
			#8b6914 30%,
			#deb887 30%,
			#deb887 39.8%,
			#8b6914 39.8%,
			#8b6914 40%,
			#cdaa7d 40%,
			#cdaa7d 49.8%,
			#8b6914 49.8%,
			#8b6914 50%,
			#deb887 50%,
			#deb887 59.8%,
			#8b6914 59.8%,
			#8b6914 60%,
			#cdaa7d 60%,
			#cdaa7d 69.8%,
			#8b6914 69.8%,
			#8b6914 70%,
			#deb887 70%,
			#deb887 79.8%,
			#8b6914 79.8%,
			#8b6914 80%,
			#deb887 80%,
			#deb887 89.8%,
			#8b6914 89.8%,
			#8b6914 90%,
			#cdaa7d 90%,
			#cdaa7d 99.8%,
			#8b6914 99.8%,
			#8b6914 100%
		);
		background-size: 700px 700px;
		position: absolute;
		width: 200%;
		height: 200%;
		bottom: 0;
		left: -50%;
		opacity: 0.25;
		z-index: -1;
		pointer-events: none;
		user-select: none;
	}
	@media (max-height: 719px) {
		.perspective {
			transform: scale(0.8) perspective(calc(100vh * 1.2)) rotateX(25deg) translateY(-5%);
			height: calc(100vh * 1.2);
		}
	}
	@media (min-height: 1240px) {
		.perspective {
			transform: scale(1.5) perspective(calc(100vh * 0.666)) rotateX(25deg) translateY(-5%);
			height: calc(100vh * 0.666);
		}
	}
</style>
