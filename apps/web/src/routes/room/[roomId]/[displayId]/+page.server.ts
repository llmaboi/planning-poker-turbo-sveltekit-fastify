import type { Room } from 'planning-poker-types';

export const load = async () => {
	const room: Room = {
		id: 'test',
		label: 'testing label',
		name: 'testing Name',
		showVotes: false
	};

	// const currentDisplay = room.displays.find((display) => display.name === event.params.displayId);

	return {
		room
		// currentDisplay: {
		// 	...currentDisplay,
		// 	name: event.params.displayId
		// }
	};
};
