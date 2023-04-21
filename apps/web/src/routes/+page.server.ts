import type { Room } from 'planning-poker-types';

export const load = async () => {
	const rooms: Room[] = [];
	return {
		rooms: rooms
	};
};
