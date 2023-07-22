<script lang="ts">
	import { enhance } from '$app/forms';

	export let number: number;
	export let selectedNumber: number | undefined;

	const selected = typeof selectedNumber === 'number' && selectedNumber === number;
	const isSelectedValid = typeof selectedNumber === 'number' && selectedNumber > 0;
</script>

<form method="POST" action="?/select" use:enhance>
	<input type="hidden" name="selected" value={number} />
	<button class={'card card-hover p-8 variant-filled-surface'} type="submit" disabled={isSelectedValid}>
		<h2 class:text-success-500={selected} class:text-error-500={isSelectedValid}>
			{number}
		</h2>
	</button>
</form>
