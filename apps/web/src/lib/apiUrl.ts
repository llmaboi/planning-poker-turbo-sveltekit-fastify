export const API_URL = import.meta.env.DEV
	? `http://localhost:5173/api`
	: `${import.meta.env.VITE_FULL_API_URL}`;
