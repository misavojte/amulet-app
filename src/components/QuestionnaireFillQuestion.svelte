<script lang="ts">
	export let questionText: string;
</script>

<div class="flex flex-col text-neutral-700 justify-center items-center gap-8 h-full">
	<div class="text-2xl font-bold text-center">
		{questionText}
	</div>
	<slot />
</div>
