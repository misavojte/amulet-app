<script>
	import { Bar } from 'svelte-chartjs';

	export let data;

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

<Bar
	{data}
	options={{
		responsive: true,
		scales: { y: { suggestedMin: 0, suggestedMax: 400 } }
	}}
/>
