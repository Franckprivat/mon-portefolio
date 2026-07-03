/**
 * Configuration globale du site.
 * Toutes les infos personnelles / réseaux sont centralisées ici.
 */

export const SITE = {
	title: 'Franck Kiemde — Développeur Fullstack',
	name: 'Franck Kiemde',
	role: 'Développeur Fullstack',
	description:
		"Portfolio de Franck Kiemde — développeur fullstack, étudiant en Master of Science à EPITECH Montpellier, en recherche d'alternance dès septembre 2026. Next.js, NestJS, React Native, TypeScript.",
	locale: 'fr_FR',
	lang: 'fr',
	location: 'Montpellier',
} as const;

export const CONTACT = {
	email: 'franck.kiemde@epitech.eu',
	phone: '06 47 30 72 93',
	github: 'https://github.com/Franckprivat',
	githubHandle: '@Franckprivat',
	linkedin: 'https://www.linkedin.com/in/franck-k-35451418a/',
	/** CV téléchargeable — dépose ton PDF dans public/cv-franck-kiemde.pdf */
	cv: '/cv-franck-kiemde.pdf',
} as const;

/** Liens de navigation principaux (navbar + palette de commandes). */
export const NAV_LINKS = [
	{ label: 'Accueil', href: '/' },
	{ label: 'Projets', href: '/projects' },
	{ label: 'À propos', href: '/about' },
	{ label: 'Blog', href: '/blog' },
	{ label: 'Contact', href: '/contact' },
] as const;
