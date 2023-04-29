<script lang="ts">
	import Card from '@components/Card.svelte';
	import DisplayHeading from '@components/DisplayHeading.svelte';
	import VotingResults from '@components/VotingResults.svelte';
	import {
		ZodRoomMapServer,
		type Display,
		type Room,
		type Vote,
		type RoomMapServer
	} from 'planning-poker-types';
	import { onMount } from 'svelte';
	import { API_URL } from '$lib/apiUrl';

	export let data;

	const cards = [1, 2, 3, 5, 8, 13, 21, 34, 55];

	// TODO: Data for cardValue
	let currentDisplay: Display;
	$: currentDisplay;
	let displays: Display[] = [];
	$: displays = displays;
	let room: RoomMapServer;
	$: room;

	let roomVotes: Vote[] = [];

	onMount(() => {
		room = data.room;
		const foundDisplay = room.displays.find((display) => display.name === data.currentDisplay.name);
		if (typeof foundDisplay === 'undefined') {
			throw new Error('No display');
		}

		currentDisplay = foundDisplay;

		const prefix = import.meta.env.DEV ? 'ws' : 'wss';
		const socket = new WebSocket(
			`${prefix}://${API_URL.replace(/http*:\/\//g, '')}/rooms/${data.room.id}/${
				data.currentDisplay.name
			}/socket`
		);

		// Connection opened
		socket.addEventListener('open', function (event) {
			console.log("It's open");
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

	async function resetSelection() {
		await fetch(`${API_URL}/displays`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				...data.currentDisplay,
				cardValue: 0,
				roomId: data.room.id
			})
		});
	}

	async function updateDisplayCard(number: number) {
		await fetch(`${API_URL}/displays`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				...data.currentDisplay,
				cardValue: number,
				roomId: data.room.id
			})
		});
	}
</script>

<section class="Room">
	<h1>{data.room.name}</h1>

	{#if typeof room === 'object'}
		<DisplayHeading data={{ room: room, isHost: currentDisplay?.isHost }} />
	{/if}

	<div class="ResetSelection">
		<button disabled={currentDisplay?.cardValue === 0} on:click={resetSelection}>
			Reset Selection
		</button>
	</div>

	<section class="RoomCards">
		{#key currentDisplay?.cardValue}
			{#each cards as card}
				<Card
					buttonDisabled={currentDisplay?.cardValue > 0}
					number={card}
					onClick={updateDisplayCard}
					selectedNumber={currentDisplay?.cardValue ?? 0}
				/>
			{/each}
		{/key}
	</section>

	{#if room?.showVotes}
		<VotingResults displays={room.displays} />
	{/if}

	<section class="PieChart">
		<!-- TODO: -->
	</section>
</section>

<style>
	.RoomCards {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
	}
	.ResetSelection {
		text-align: center;
		margin: 1rem auto;
	}
</style>
