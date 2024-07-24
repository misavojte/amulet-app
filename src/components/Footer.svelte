<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
</script>

<footer>
	<p class="text-sm text-neutral-700">
		{$_('footer.text')}
		<a
			class="decoration-dotted text-neutral-500 hover:text-neutral-700
		
		"
			href="mailto:marketa.muczkova01@upol.cz"
		>
			marketa.muczkova01@upol.cz
		</a>
	</p>
	<img width="1523" height="472" src="{base}/upol.png" alt="Logo Univerzity Palackého" />
</footer>

<style>
	img {
		width: 100%;
		height: auto;
		max-width: 160px;
	}
	footer {
		display: grid;
		grid-template-columns: 1fr 160px;
		gap: 3rem;
		justify-content: center;
		align-items: center;
		text-align: left;
		margin: 2rem auto;
		padding: 1rem 0;
		border-top: 1px solid #ccc;
		font-size: 0.8rem;
		color: #757575;
		width: 100%;
	}
	@media (max-width: 620px) {
		footer {
			grid-template-columns: 1fr;
			gap: 1rem;
		}
	}
</style>
