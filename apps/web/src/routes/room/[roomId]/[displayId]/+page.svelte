<script lang="ts">
	import { enhance } from '$app/forms';
	import { API_URL } from '$lib/apiUrl';
	import Card from '@components/Card.svelte';
	import DisplayHeading from '@components/DisplayHeading.svelte';
	import VotingPieChart from '@components/VotingPieChart.svelte';
	import VotingResults from '@components/VotingResults.svelte';
	import { ZodRoomMapServer } from 'planning-poker-types';
	import { onMount } from 'svelte';

	export let data;

	const cards = [1, 2, 3, 5, 8, 13, 21, 34, 55];
	let currentDisplay = data.currentDisplay;
	let room = data.room;

	onMount(() => {
		let socketUrl = `${API_URL.replace('http', 'ws')}/rooms/${room.id}/${
			data.currentDisplay.name
		}/socket`;

		if (import.meta.env.DEV) {
			socketUrl = `ws://localhost:4040/api/rooms/${room.id}/${data.currentDisplay.name}/socket`;
		}

		const socket = new WebSocket(socketUrl);

		// Connection opened
		socket.addEventListener('open', function (event) {
			//
		});

		// Listen for messages
		socket.addEventListener('message', function (event) {
			const newData = JSON.parse(event.data);

			const updatedRoom = ZodRoomMapServer.parse(newData);
			const updatedDisplay = updatedRoom.displays.find(
				(display) => display.name === data.currentDisplay.name
			);

			if (typeof updatedDisplay !== 'undefined') {
				currentDisplay = updatedDisplay;
			}

			room = updatedRoom;
		});
	});
</script>

<h2>{room.name}</h2>

{#if typeof room === 'object'}
	<DisplayHeading data={{ room: room, isHost: currentDisplay?.isHost }} />
{/if}

<form class="ResetSelection" method="POST" action="?/reset" use:enhance>
	<button
		type="submit"
		class="btn variant-filled-primary"
		disabled={currentDisplay?.cardValue === 0}
	>
		Reset Selection
	</button>
</form>

<section class="grid gap-4 grid-cols-3">
	{#key currentDisplay?.cardValue}
		{#each cards as card}
			<Card number={card} selectedNumber={currentDisplay?.cardValue} />
		{/each}
	{/key}
</section>

{#key room?.displays}
	{#if room?.showVotes}
		<VotingResults displays={room.displays} />
	{/if}

	{#if room?.showVotes && Array.isArray(room?.displays)}
		<VotingPieChart displays={room.displays} />
	{/if}
{/key}
