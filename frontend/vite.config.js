import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // 1. Import this

export default defineConfig({
	server: {
    proxy: {
      '/api': 'http://localhost:5001',
    },
	},
	plugins: [
		react(),
		tailwindcss(), // 2. Add this here
	],
});
