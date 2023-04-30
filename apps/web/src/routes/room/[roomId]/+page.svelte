<script lang="ts">
	import { goto } from '$app/navigation';
	import { ZodRoomMapServer, type Display } from 'planning-poker-types';
	import { onMount } from 'svelte';
	import { API_URL } from '$lib/apiUrl';
	import DisplayList from '@components/DisplayList.svelte';
	import { SlideToggle } from '@skeletonlabs/skeleton';

	export let data;

	let roomName = '';
	let displays: Display[] = [];

	$: displays = [];
	$: displayName = '';
	$: isHost = false;

	onMount(() => {
		displays = data.room.displays;
		roomName = data.room.name;
	});

	async function handleSubmit() {
		const res = await fetch(`${API_URL}/displays`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				roomId: data.room.id,
				name: displayName,
				cardValue: 0,
				isHost
			})
		});

		const room = ZodRoomMapServer.parse(await res.json());

		goto(`/room/${room.id}/${displayName}`);
	}
</script>

<form on:submit|preventDefault={handleSubmit} class="grid gap-4 justify-items-center text-center">
	<label class="label">
		Your Display Name:
		<input class="input" required type="text" bind:value={displayName} />
	</label>

	<SlideToggle name="slider-label" bind:checked={isHost}>Room Host</SlideToggle>

	<button class="btn variant-ghost-primary" disabled={!displayName.length} type="submit">
		Join room
	</button>
</form>

<DisplayList {displays} {roomName} />
