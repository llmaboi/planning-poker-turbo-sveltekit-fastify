<script lang="ts">
	import { enhance } from '$app/forms';
	import DisplayList from '@components/DisplayList.svelte';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	export let data;

	let roomName = '';
	let displayName = '';
	let isHost = false;

	onMount(() => {
		roomName = data.room.name;
	});
</script>

<form method="POST" use:enhance class="grid gap-4 justify-items-center text-center">
	<label class="label">
		Your Display Name:
		<input name="displayName" class="input" required type="text" bind:value={displayName} />
	</label>

	<SlideToggle name="isHost" bind:checked={isHost}>Room Host</SlideToggle>

	<button class="btn variant-ghost-primary" disabled={!displayName.length} type="submit">
		Join room
	</button>
</form>

<DisplayList displays={data.room.displays} {roomName} />
