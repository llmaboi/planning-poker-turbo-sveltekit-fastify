<script lang="ts">
	import { goto } from '$app/navigation';
	import { ZodRoomMapServer } from 'planning-poker-types';
	import RoomList from '../components/RoomList.svelte';
	import { API_URL } from '$lib/apiUrl';

	export let data;

	$: roomName = '';

	async function handleCreateRoom() {
		const res = await fetch(`http://${API_URL}/rooms`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				label: '',
				name: roomName,
				showVotes: false
			})
		});
		const data = ZodRoomMapServer.parse(await res.json());

		goto(`/room/${data.id}`);
	}

	$: filteredRooms = data.rooms.filter((room) =>
		room.name.toLowerCase().includes(roomName.toLowerCase())
	);
</script>

<section class="RoomLogin">
	<h1 class="Heading">Search for or select your room</h1>
	<form on:submit|preventDefault={handleCreateRoom}>
		<label class="RoomInput">
			Create or filter rooms:
			<input name="roomName" required type="text" bind:value={roomName} />
		</label>

		<button class="RoomCreate" disabled={!roomName.length} type="submit">
			Create or Join Room
		</button>
	</form>
</section>

<RoomList rooms={filteredRooms} />

<style>
	.RoomLogin {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.RoomCreate {
		margin-top: 1rem;
	}

	form,
	.RoomInput {
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	.RoomInput {
		font-size: 2rem;
	}
</style>
