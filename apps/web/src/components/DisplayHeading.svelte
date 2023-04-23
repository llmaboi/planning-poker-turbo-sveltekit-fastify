<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Room } from 'planning-poker-types';
	import { onMount } from 'svelte';

	export let data: { room: Room; isHost: boolean };

	// TODO: I'm not sure how to do this yet...
	// TODO: Fix bug with updating label...
	$: roomLabel = '';

	$: isLoading = false;

	async function handleLabelUpdate() {
		isLoading = true;
		await fetch(`/api/rooms/${data.room.id}`, {
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
		await fetch(`/api/rooms/${data.room.id}/card-reset`, {
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
		await fetch(`/api/rooms/${data.room.id}`, {
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

<section class="DisplayHeading">
	<div class="firstRow">
		{#if data.isHost === true}
			<label id="room-label">
				<input
					placeholder={data.room.label}
					type="text"
					disabled={isLoading}
					bind:value={roomLabel}
				/>
			</label>

			<button disabled={isLoading} on:click={handleLabelUpdate}> Update label </button>
		{:else}
			<p>Room Label: {data.room.label.length > 0 ? data.room.label : 'No Room Label'}</p>
		{/if}
	</div>

	{#if data.isHost === true}
		<div class="secondRow">
			<button disabled={isLoading} on:click={handleCardReset}>Reset cards</button>

			{#if data.room.showVotes}
				<button disabled={isLoading} on:click={handleShowVotes}>Hide Votes</button>
			{:else}
				<button disabled={isLoading} on:click={handleShowVotes}>Show Votes</button>
			{/if}

			<button on:click={handleLogout}>Change Room</button>
		</div>
	{:else}
		<div class="secondRow">
			<button on:click={handleLogout}>Change Room</button>
		</div>
	{/if}
</section>

<style>
	.DisplayHeading {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		margin-bottom: 1rem;
	}

	.firstRow,
	.secondRow {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: center;
		width: 50%;
	}

	.firstRow {
		margin: 1rem auto;
	}

	button {
		width: auto;
	}
</style>
