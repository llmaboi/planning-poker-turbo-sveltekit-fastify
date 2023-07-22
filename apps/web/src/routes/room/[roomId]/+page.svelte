<script lang="ts">
	import { enhance } from '$app/forms';
	import DisplayList from '@components/DisplayList.svelte';
	import { SlideToggle } from '@skeletonlabs/skeleton';

	export let data;
	export let form;

	let roomName = data.room.name;
</script>

<form method="POST" use:enhance class="grid gap-4 justify-items-center text-center">
	<label class="label">
		Your Display Name:
		<input name="displayName" class="input" required type="text" value={form?.displayName ?? ''} />
	</label>

	<SlideToggle name="isHost" checked={form?.isHost}>Room Host</SlideToggle>

	<button class="btn variant-ghost-primary" type="submit">Join room</button>
</form>

<DisplayList displays={data.room.displays} {roomName} />
