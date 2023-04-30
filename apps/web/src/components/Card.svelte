<script lang="ts">
	export let number: number;
	export let selectedNumber: number | undefined;
	export let buttonDisabled: boolean;
	export let onClick: (number: number) => void;

	function handleCardClick() {
		onClick(number);
	}

	const selected = typeof selectedNumber === 'number' && selectedNumber === number;
</script>

<button
	class={'card card-hover p-8 variant-filled-surface'}
	on:click={handleCardClick}
	disabled={buttonDisabled}
>
	<h2 class={`${selected ? 'text-success-500' : ''} ${buttonDisabled ? 'text-error-500' : ''}`}>
		{number}
	</h2>
</button>
