<script lang="ts">
	import type { RoomMapClient } from 'planning-poker-types';

	export let rooms: RoomMapClient[];
</script>

<section class="text-center">
	{#if rooms.length > 0}
		<h3>Available rooms:</h3>
	{/if}

	<ul class="list-nav grid grid-flow-col gap-2 justify-items-center">
		{#each rooms as room}
			<li>
				<a class="btn variant-ghost-secondary" href={`room/${room.id}`}>
					{room.name}
				</a>
			</li>
		{/each}
	</ul>
</section>
