<script lang="ts">
	import { goto } from '$app/navigation';
	import { API_URL } from '$lib/apiUrl';
	import type { Room } from 'planning-poker-types';

	export let data: { room: Room; isHost: boolean };

	// TODO: I'm not sure how to do this yet...
	// TODO: Fix bug with updating label...
	$: roomLabel = '';

	$: isLoading = false;

	async function handleLabelUpdate() {
		isLoading = true;
		await fetch(`${API_URL}/rooms/${data.room.id}`, {
			method: 'PATCH',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				...data.room,
				label: roomLabel
			})
		});

		roomLabel = '';

		isLoading = false;
	}

	async function handleCardReset() {
		isLoading = true;
		await fetch(`${API_URL}/rooms/${data.room.id}/card-reset`, {
			method: 'PATCH',
			headers: {
				Accept: 'application/json'
			}
		});
		isLoading = false;
	}

	function handleLogout() {
		goto(`/`);
	}

	async function handleShowVotes() {
		isLoading = true;
		await fetch(`${API_URL}/rooms/${data.room.id}`, {
			method: 'PATCH',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				...data.room,
				showVotes: !data.room.showVotes
			})
		});

		isLoading = false;
	}
</script>

<div class="flex gap-4">
	{#if data.isHost === true}
		<label class="label" aria-label="Current Room Label">
			<input
				class="input"
				placeholder={data.room.label}
				type="text"
				disabled={isLoading}
				bind:value={roomLabel}
			/>
		</label>

		<button class="btn variant-filled" disabled={isLoading} on:click={handleLabelUpdate}>
			Update label
		</button>
	{:else}
		<p>Room Label: {data.room.label.length > 0 ? data.room.label : 'No Room Label'}</p>
	{/if}
</div>

{#if data.isHost === true}
	<div class="flex gap-4">
		<button class="btn variant-soft-tertiary" disabled={isLoading} on:click={handleCardReset}>
			Reset cards
		</button>

		{#if data.room.showVotes}
			<button class="btn variant-soft-tertiary" disabled={isLoading} on:click={handleShowVotes}>
				Hide Votes
			</button>
		{:else}
			<button class="btn variant-soft-tertiary" disabled={isLoading} on:click={handleShowVotes}>
				Show Votes
			</button>
		{/if}

		<button class="btn variant-soft-tertiary" on:click={handleLogout}>Change Room</button>
	</div>
{:else}
	<div class="flex gap-4">
		<button class="btn variant-soft-tertiary" on:click={handleLogout}>Change Room</button>
	</div>
{/if}
