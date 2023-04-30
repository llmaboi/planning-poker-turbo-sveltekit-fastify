<script lang="ts">
	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-vintage.css';

	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/all.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.postcss';
</script>

<main class="container">
	<slot />
</main>

<style>
	main {
		background-color: #34495e;
		border-radius: 1rem;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		min-height: 40rem;
		padding: 4rem;
		margin: 2rem;
	}
</style>
