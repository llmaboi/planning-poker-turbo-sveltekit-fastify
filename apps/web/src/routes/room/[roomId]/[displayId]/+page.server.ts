import { API_URL } from '$lib/apiUrl';
import { redirect } from '@sveltejs/kit';
import { ZodRoomMapServer, type Room } from 'planning-poker-types';

export const load = async ({ fetch, params, url }) => {
	const res = await fetch(`${API_URL}/rooms/${params.roomId}`);
	const data = await res.json();

	const room = ZodRoomMapServer.parse(data);
	const currentDisplay = room.displays.find((display) => display.name === params.displayId);

	if (typeof currentDisplay === 'undefined') {
		throw new Error('No display');
	}

	return {
		room,
		currentDisplay
	};
};

export const actions = {
	select: async ({ request, params }) => {
		const data = await request.formData();
		const rawSelected = data.get('selected');
		const maybeNumber = Number(rawSelected);
		let selected = 0;

		if (isNaN(maybeNumber)) {
			selected = 0;
		} else {
			selected = maybeNumber;
		}

		await fetch(`${API_URL}/displays/${params.displayId}`, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				roomId: params.roomId,
				cardValue: selected
			})
		});

		throw redirect(303, `/room/${params.roomId}/${params.displayId}`);
	},
	reset: async ({ params }) => {
		await fetch(`${API_URL}/displays/${params.displayId}`, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				roomId: params.roomId,
				cardValue: 0
			})
		});

		throw redirect(303, `/room/${params.roomId}/${params.displayId}`);
	},
	resetAll: async ({ params }) => {
		await fetch(`${API_URL}/rooms/${params.roomId}/card-reset`, {
			method: 'PATCH',
			headers: {
				Accept: 'application/json'
			}
		});

		throw redirect(303, `/room/${params.roomId}/${params.displayId}`);
	},
	toggleVotes: async ({ params }) => {
		const res = await fetch(`${API_URL}/rooms/${params.roomId}`);
		const roomData = await res.json();
		const oldRoom = ZodRoomMapServer.parse(roomData);

		await fetch(`${API_URL}/rooms/${params.roomId}`, {
			method: 'PATCH',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				...oldRoom,
				showVotes: !oldRoom.showVotes
			})
		});

		throw redirect(303, `/room/${params.roomId}/${params.displayId}`);
	},
	label: async ({ request, params }) => {
		const data = await request.formData();
		const roomLabel = String(data.get('roomLabel')) ?? '';
		const res = await fetch(`${API_URL}/rooms/${params.roomId}`);
		const roomData = await res.json();
		const oldRoom = ZodRoomMapServer.parse(roomData);

		const room: Room = {
			...oldRoom,
			label: roomLabel
		};

		await fetch(`${API_URL}/rooms/${params.roomId}`, {
			method: 'PATCH',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(room)
		});

		throw redirect(303, `/room/${params.roomId}/${params.displayId}`);
	}
};
