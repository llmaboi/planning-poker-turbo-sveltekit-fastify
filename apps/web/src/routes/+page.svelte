<script lang="ts">
	import { goto } from '$app/navigation';
	import { ZodRoomMapServer } from 'planning-poker-types';
	import RoomList from '../components/RoomList.svelte';
	import { API_URL } from '$lib/apiUrl';

	export let data;

	$: roomName = '';

	async function handleCreateRoom() {
		const res = await fetch(`${API_URL}/rooms`, {
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

<h2>Search for or select your room</h2>

<form
	on:submit|preventDefault={handleCreateRoom}
	class="grid gap-4 justify-items-center text-center"
>
	<label class="label">
		<span>Create or filter rooms:</span>
		<input name="roomName" class="input" required type="text" bind:value={roomName} />
	</label>

	<button class="btn variant-ghost-primary" disabled={!roomName.length} type="submit">
		Create or Join Room
	</button>
</form>

<RoomList rooms={filteredRooms} />
