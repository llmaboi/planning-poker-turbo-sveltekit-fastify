<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { Room } from 'planning-poker-types';

	export let data: { room: Room; isHost: boolean };

	let roomLabel = data.room.label;

	function handleLogout() {
		goto(`/`);
	}
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

		<button class="btn variant-soft-tertiary" on:click={handleLogout}>Change Room</button>
	</div>
{:else}
	<div class="flex gap-4">
		<button class="btn variant-soft-tertiary" on:click={handleLogout}>Change Room</button>
	</div>
{/if}
