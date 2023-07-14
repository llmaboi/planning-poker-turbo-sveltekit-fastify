<script lang="ts">
	import { enhance } from '$app/forms';
	import RoomList from '../components/RoomList.svelte';

	export let data;

	$: roomName = '';

	$: filteredRooms = data.rooms.filter((room) =>
		room.name.toLowerCase().includes(roomName.toLowerCase())
	);
</script>

<h2>Search for or select your room</h2>

<form method="POST" class="grid gap-4 justify-items-center text-center" use:enhance>
	<label class="label">
		<span>Create or filter rooms:</span>
		<input name="roomName" class="input" required type="text" bind:value={roomName} />
	</label>

	<button class="btn variant-ghost-primary" disabled={!roomName.length} type="submit">
		Create or Join Room
	</button>
</form>

<RoomList rooms={filteredRooms} />
