<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
</script>

<footer>
	<p>
		{$_('footer.text')}
		<a href="mailto:marketa.muczkova01@upol.cz"> marketa.muczkova01@upol.cz </a>
	</p>
	<img width="1523" height="472" src="{base}/upol.png" alt="Logo Univerzity Palackého" />
</footer>

<style>
	img {
		width: 100%;
		height: auto;
		max-width: 160px;
	}
	a {
		/* gray */
		color: #757575;
		text-decoration: dashed;
		&:hover {
			text-decoration: underline;
		}
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
	p {
		margin: 0;
		line-height: 1.15;
	}
	@media (max-width: 620px) {
		footer {
			grid-template-columns: 1fr;
			gap: 1rem;
		}
	}
</style>
