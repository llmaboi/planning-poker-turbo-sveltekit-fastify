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
		plugins: [sveltekit()],
		define: {
			// Eliminate in-source test code
			'import.meta.vitest': 'undefined'
		},
		test: {
			environment: 'jsdom',
			// Add @testing-library/jest-dom matchers & mocks of SvelteKit modules
			setupFiles: ['./src/setupTest.ts'],
			// Exclude files in c8
			coverage: {
				exclude: ['src/setupTest.ts']
			}
		},
		root: '.'
	};
});
