// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// TODO Franck : remplace par ton vrai domaine une fois déployé.
	site: 'https://franck-kiemde.dev',
	integrations: [mdx(), sitemap()],
	prefetch: {
		prefetchAll: true,
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
