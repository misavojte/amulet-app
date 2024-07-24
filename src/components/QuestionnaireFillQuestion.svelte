<script lang="ts">
	export let questionText: string;
	export let required: boolean;
</script>

<div class="flex flex-col text-neutral-700 justify-center items-center gap-8 h-full">
	<div class="text-2xl font-bold text-center">
		{questionText}
		<span class="text-red-500" class:invisible={!required}>*</span>
	</div>
	<slot />
</div>
