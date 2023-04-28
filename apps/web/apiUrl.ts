export const API_URL =
	typeof process?.env?.mode === 'string' && process?.env?.mode === 'development'
		? `localhost`
		: 'http://planning-poker-turbo-sveltekit-api.onrender.com/api/rooms';
