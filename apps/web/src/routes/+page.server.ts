import { error, fail, redirect } from '@sveltejs/kit';
import { ZodRoomMapServer, type RoomMapServer } from 'planning-poker-types';
import { API_URL } from '$lib/apiUrl';

export const load = async ({ fetch }) => {
	const res = await fetch(`${API_URL}/rooms`);
	const data = await res.json();

	const rooms: RoomMapServer[] = [];

	if (!Array.isArray(data)) throw error(500, { message: 'Invalid room data' });

	data.forEach((room: unknown) => {
		const parsedRoom = ZodRoomMapServer.parse(room);
		rooms.push(parsedRoom);
	});

	return {
		rooms: rooms
	};
};

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const roomName = data.get('roomName');

		if (roomName === null || (typeof roomName === 'string' && roomName.trim().length === 0)) {
			return fail(400, { roomName, missing: true });
		}

		const trimmedName = String(roomName).trim();

		const res = await fetch(`${API_URL}/rooms`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				label: '',
				name: trimmedName,
				showVotes: false
			})
		});
		const successResponseData = ZodRoomMapServer.parse(await res.json());

		throw redirect(303, `/room/${successResponseData.id}`);
	}
};
