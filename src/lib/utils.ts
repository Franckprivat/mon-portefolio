/** Petites fonctions utilitaires partagées par les pages et composants. */

/** Formate une date en français long : « 12 mars 2026 ». */
export function formatDate(date: Date): string {
	return new Intl.DateTimeFormat('fr-FR', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(date);
}

/** Estime le temps de lecture d'un contenu MDX (~200 mots/min). */
export function readingTime(markdown: string): number {
	const words = markdown
		.replace(/```[\s\S]*?```/g, '') // on ignore les blocs de code
		.split(/\s+/)
		.filter(Boolean).length;
	return Math.max(1, Math.round(words / 200));
}

/** Slugifie un texte pour les ancres et filtres (« Tailwind CSS » → « tailwind-css »). */
export function slugify(text: string): string {
	return text
		.toLowerCase()
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');
}
