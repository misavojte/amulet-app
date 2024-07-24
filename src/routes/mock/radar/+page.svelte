<script>
	import { PolarArea } from 'svelte-chartjs';

	export const data = {
		datasets: [
			{
				data: [4.23, 2.0, 1.5, 15],
				backgroundColor: [
					'rgba(247, 70, 74, 0.5)',
					'rgba(70, 191, 189, 0.5)',
					'rgba(253, 180, 92, 0.5)',
					'rgba(148, 159, 177, 0.5)'
				]
			}
		],
		labels: [
			'Actively Open-minded Thinking',
			'Close-Minded Thinking',
			'Preference for Intuitive Thinking',
			'Preference for Effortful Thinking'
		]
	};

	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		ArcElement,
		RadialLinearScale
	} from 'chart.js';

	ChartJS.register(Title, Tooltip, Legend, ArcElement, RadialLinearScale);
</script>

<main class="container mx-auto p-4 flex flex-col items-center w-full">
	<h1 class="text-4xl font-bold">Polar Area Chart</h1>
	<p class="mt-4 text-lg">
		A polar area chart is similar to a pie chart, but the sectors are equal angles and differ in how
		far they extend from the center of the circle.
	</p>
	<div class="max-w-2xl w-full mt-8">
		<PolarArea
			{data}
			options={{
				responsive: true,
				aspectRatio: 1,
				scales: { r: { suggestedMin: 0, suggestedMax: 30 } }
			}}
		/>
	</div>
</main>
