<script>
	import { PolarArea } from 'svelte-chartjs';

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

<PolarArea
	{data}
	options={{
		responsive: true,
		aspectRatio: 1,
		scales: { r: { suggestedMin: 0, suggestedMax: 100 } }
	}}
/>
