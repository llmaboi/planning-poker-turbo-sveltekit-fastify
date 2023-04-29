export const API_URL = import.meta.env.DEV
	? `localhost:5173/api`
	: 'planning-poker-turbo-sveltekit-api.onrender.com/api';
// : `${import.meta.env.VITE_API_URL}`;
