<script>
	import { PolarArea } from 'svelte-chartjs';

	export let data;

	export let suggestedMax = 100;

	export let suggestedMin = 0;

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

<PolarArea
	{data}
	options={{
		responsive: true,
		aspectRatio: 1,
		scales: {
			r: {
				suggestedMin,
				suggestedMax,
				ticks: {
					font: {
						size: 14 // Change this to your desired font size for y-axis
					}
				}
			}
		},
		plugins: {
			legend: {
				labels: {
					font: {
						size: 16
					}
				}
			}
		}
	}}
/>
