<script>
	import { Bar } from 'svelte-chartjs';

	export let data;

	import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

	Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
</script>

<Bar
	{data}
	options={{
		responsive: true,
		aspectRatio: 4 / 3,
		plugins: {
			legend: {
				labels: {
					font: {
						size: 16
					}
				}
			}
		},
		scales: {
			x: {
				ticks: {
					font: {
						size: 14 // Change this to your desired font size for x-axis
					}
				}
			},
			y: {
				min: 0,
				ticks: {
					font: {
						size: 14 // Change this to your desired font size for y-axis
					}
				}
			}
		}
	}}
/>
