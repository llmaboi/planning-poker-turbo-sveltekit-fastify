import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
	if (mode === 'development') {
		return {
			server: {
				proxy: {
					'/api': `http://${process.env.VITE_API_URL}:${process.env.VITE_API_PORT}`
				}
			},
			plugins: [sveltekit()]
		};
	}

	return {
		plugins: [sveltekit()]
	};
});
