import { ZodRoomMapServer } from 'planning-poker-types';
import { API_URL } from '../../../../../apiUrl';

export const load = async ({ fetch, params }) => {
	const res = await fetch(`${API_URL}/api/rooms/${params.roomId}`);
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
