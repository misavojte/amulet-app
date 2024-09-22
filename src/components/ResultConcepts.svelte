<script lang="ts">
	export let scores: {
		title: string;
		description: string;
		value: number;
	}[] = [];

	// Accept min and max as props
	export let min: number;
	export let max: number;

	/**
	 * Color scale function for interpolation between red and green
	 */
	const colorScaleSequential = (t: number) => {
		const normalizedT = Math.max(0, Math.min(1, t)); // Ensure t is between 0 and 1
		const r = Math.round(255 * (1 - normalizedT));
		const g = Math.round(255 * normalizedT);
		return `rgba(${r},${g},0,0.2)`;
	};

	// Sort scores by value in descending order
	$: sortedScores = [...scores].sort((a, b) => b.value - a.value);
</script>

<ul class="w-full text-center">
	{#each sortedScores as score (score.title)}
		<li
			class="concept p-6 m-2 rounded-xl flex flex-col justify-center items-center gap-2"
			style="background-color: {colorScaleSequential((score.value - min) / (max - min))}"
			aria-label={`Score for ${score.title}`}
		>
			<div class="score mb-2">
				<p class="text-xl font-bold">{score.value.toFixed(2)}</p>
				<p>{score.title}</p>
			</div>
			<p class="small text-left text-sm leading-tight">
				{score.description}
			</p>
		</li>
	{/each}
</ul>
