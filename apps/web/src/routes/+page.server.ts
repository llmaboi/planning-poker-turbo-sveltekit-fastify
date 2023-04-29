import { error } from '@sveltejs/kit';
import { ZodRoomMapServer, type RoomMapServer } from 'planning-poker-types';
import { API_URL } from '$lib/apiUrl';

export const load = async ({ fetch }) => {
	const res = await fetch(`http://${API_URL}/rooms`);
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
