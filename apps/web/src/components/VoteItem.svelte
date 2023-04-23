<script lang="ts">
	import type { Vote } from 'planning-poker-types';

	export let vote: Vote;
</script>

<p>
	{vote.name}: {vote.value}
</p>

<style>
	p {
		padding: 2rem;
		margin: 0;
	}
</style>
