<script lang="ts">
	export let currentQuestionIndex = 0; // 0-based index
	export let totalQuestions = 0; // total number of questions

	$: progress = ((currentQuestionIndex + 1) / totalQuestions) * 100; // progress in percentage

	$: progressStyle = `width: ${progress}%;`;
</script>

<div class="rounded-md bg-neutral-300 h-2 w-full">
	<div class="rounded-md bg-blue-500 h-2 transition-all" style={progressStyle} />
</div>
