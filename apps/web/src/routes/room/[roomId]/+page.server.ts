import { ZodRoomMapServer } from 'planning-poker-types';
import { API_URL } from '../../../lib/apiUrl';

export const load = async ({ fetch, params }) => {
	const res = await fetch(`http://${API_URL}/rooms/${params.roomId}`);
	const room = ZodRoomMapServer.parse(await res.json());

	return {
		room
	};
};
