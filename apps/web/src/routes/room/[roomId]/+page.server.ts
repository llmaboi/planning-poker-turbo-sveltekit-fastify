import type { Room } from 'planning-poker-types';

export const load = async (event) => {
	const room: Room = {
		id: 'test',
		label: 'testing label',
		name: 'testing Name',
		showVotes: false
	};

	return {
		room: room
	};
};
