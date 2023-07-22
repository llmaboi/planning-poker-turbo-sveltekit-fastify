import { ZodRoomMapServer } from 'planning-poker-types';
import { API_URL } from '../../../lib/apiUrl';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ fetch, params }) => {
	const res = await fetch(`${API_URL}/rooms/${params.roomId}`);
	const room = ZodRoomMapServer.parse(await res.json());

	return {
		room
	};
};

export const actions = {
	default: async ({ request, params, url }) => {
		const data = await request.formData();
		const displayName = data.get('displayName');
		const isHost = url.searchParams.get('isHost') === 'true';

		if (
			displayName === null ||
			(typeof displayName === 'string' && displayName.trim().length === 0)
		) {
			return fail(400, { displayName, missing: true });
		}

		const trimmedName = String(displayName).trim();

		const res = await fetch(`${API_URL}/displays`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				roomId: params.roomId,
				name: trimmedName,
				cardValue: 0,
				isHost
			})
		});

		const room = ZodRoomMapServer.parse(await res.json());
		const display = room.displays.find((d) => d.name === trimmedName);

		if (display === undefined) {
			throw new Error('Could not route to this display');
		}

		throw redirect(303, `/room/${room.id}/${display.name}?selected=${display.cardValue}`);
	}
};
