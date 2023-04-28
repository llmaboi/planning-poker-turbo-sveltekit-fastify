import { ZodRoomMapServer, type Room } from 'planning-poker-types';
import { API_URL } from '../../../../apiUrl';

export const load = async ({ fetch, params }) => {
	const res = await fetch(`${API_URL}/api/rooms/${params.roomId}`);
	const room = ZodRoomMapServer.parse(await res.json());

	return {
		room
	};
};
