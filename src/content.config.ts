import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

/**
 * Projets — chaque fichier MDX dans src/content/projects devient
 * automatiquement une carte projet + une page /projects/[slug].
 */
const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			/** Image de couverture (affichée sur la carte et la page projet). */
			cover: image(),
			/** Technologies utilisées — sert aussi au filtre de la page projets. */
			tech: z.array(z.string()),
			/** Badges courts affichés sur la carte : « Fullstack », « Design »… */
			badges: z.array(z.string()).default([]),
			github: z.string().url().optional(),
			demo: z.string().url().optional(),
			/** Les projets « featured » remontent sur la page d'accueil. */
			featured: z.boolean().default(false),
			/** Ordre d'affichage (plus petit = plus haut). */
			order: z.number().default(99),
			date: z.coerce.date(),
		}),
});

/**
 * Blog — articles MDX avec calcul du temps de lecture côté page.
 */
const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			cover: image(),
			tags: z.array(z.string()).default([]),
			pubDate: z.coerce.date(),
			draft: z.boolean().default(false),
		}),
});

export const collections = { projects, blog };
