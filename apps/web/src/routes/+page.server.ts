import { ZodRoomMapServer, type RoomMapServer } from 'planning-poker-types';

export const load = async ({ fetch }) => {
	const res = await fetch('/api/rooms');
	const data = await res.json();

	const rooms: RoomMapServer[] = [];
	data.forEach((room: unknown) => {
		const parsedRoom = ZodRoomMapServer.parse(room);
		rooms.push(parsedRoom);
	});

	return {
		rooms: rooms
	};
};
