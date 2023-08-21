<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Room } from 'planning-poker-types';

	export let data: { room: Room; isHost: boolean };

	let roomLabel = data.room.label;
</script>

<form method="POST" action="?/label" use:enhance class="flex gap-4">
	{#if data.isHost === true}
		<label class="label" aria-label="Current Room Label">
			<input
				class="input"
				placeholder={data.room.label}
				type="text"
				bind:value={roomLabel}
				name="roomLabel"
			/>
		</label>

		<button class="btn variant-filled" type="submit">Update label</button>
	{:else}
		<p>Room Label: {data.room.label.length > 0 ? data.room.label : 'No Room Label'}</p>
	{/if}
</form>

{#if data.isHost === true}
	<div class="flex gap-4">
		<form method="POST" action="?/resetAll" use:enhance>
			<button type="submit" class="btn variant-soft-tertiary">Reset cards</button>
		</form>

		<form method="POST" action="?/toggleVotes" use:enhance>
			<button class="btn variant-soft-tertiary">
				{#if data.room.showVotes}
					Hide Votes
				{:else}
					Show Votes
				{/if}
			</button>
		</form>

		<a href="/" class="btn bg-secondary-500 variant-soft-tertiary">Change Room</a>
	</div>
{:else}
	<div class="flex gap-4">
		<a href="/" class="btn bg-secondary-500 variant-soft-tertiary">Change Room</a>
	</div>
{/if}
