/**
 * Configuration globale du site.
 * Toutes les infos personnelles / réseaux sont centralisées ici.
 */

export const SITE = {
	title: 'Franck Kiemdé — Développeur Web Fullstack',
	name: 'Franck Kiemdé',
	role: 'Développeur Web Fullstack',
	description:
		"Portfolio de Franck Kiemdé — développeur web fullstack en formation à EPITECH (Pré-MSc), avec un parcours en marketing digital et SEO. Next.js, NestJS, Astro, TypeScript.",
	locale: 'fr_FR',
	lang: 'fr',
} as const;

export const CONTACT = {
	email: 'kiemdefranck5@gmail.com',
	github: 'https://github.com/Franck300302',
	// TODO Franck : remplace par l'URL exacte de ton profil LinkedIn.
	linkedin: 'https://www.linkedin.com/in/franck-kiemde',
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
