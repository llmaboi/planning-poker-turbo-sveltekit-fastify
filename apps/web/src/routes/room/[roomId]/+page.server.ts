import { ZodRoomMapServer, type Room } from 'planning-poker-types';

export const load = async ({ fetch, params }) => {
	const res = await fetch(`/api/rooms/${params.roomId}`);
	const room = ZodRoomMapServer.parse(await res.json());

	return {
		room
	};
};
