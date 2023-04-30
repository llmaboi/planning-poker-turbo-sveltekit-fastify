<script lang="ts">
	import { goto } from '$app/navigation';

	export let rooms: { name: string }[];

	function goToRoom(room: string) {
		goto(`room/${room}`);
	}
</script>

<section class="text-center">
	{#if rooms.length > 0}
		<h3>Available rooms:</h3>
	{/if}

	<ul class="list-nav grid grid-flow-col gap-2 justify-items-center">
		{#each rooms as room}
			<li>
				<button
					class="btn variant-ghost-secondary"
					on:click={() => goToRoom(room.name.replace(' ', '-').toLowerCase())}
				>
					{room.name}
				</button>
			</li>
		{/each}
	</ul>
</section>
