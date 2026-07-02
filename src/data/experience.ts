/** Parcours professionnel, formation et valeurs — données réelles du CV de Franck. */

export interface TimelineItem {
	title: string;
	organization: string;
	type: string;
	period: string;
	description: string;
	tasks?: string[];
	tech?: string[];
}

/** Expériences professionnelles (timeline verticale animée). */
export const experiences: TimelineItem[] = [
	{
		title: 'Rédacteur Web SEO',
		organization: 'Événement Animation Artistique / Steve Mind',
		type: 'Stage',
		period: 'Mars 2024 — Juin 2024',
		description:
			'Production de contenus optimisés et intégration directe sur les sites du groupe.',
		tasks: [
			'Rédaction de contenus de 700+ mots optimisés autour de mots-clés ciblés',
			'Création et intégration de pages sur les sites de Steve Mind',
			'Maillage interne et externe pour renforcer le référencement',
		],
		tech: ['WordPress', 'SEO', 'HTML'],
	},
	{
		title: 'Chargé de communication',
		organization: 'Tekk',
		type: 'Stage',
		period: 'Février 2023 — Avril 2023',
		description: 'Animation de la plateforme et production de contenus pour les réseaux.',
		tasks: [
			'Publication et vérification des deals et sorties sur la plateforme',
			'Conception de visuels et de textes pour les réseaux sociaux',
		],
		tech: ['Photoshop', 'Illustrator', 'Réseaux sociaux'],
	},
	{
		title: 'Community Manager',
		organization: 'Kiem',
		type: 'Stage',
		period: 'Avril 2022 — Juin 2022',
		description: "De l'étude de marché à la mise en ligne : stratégie digitale complète.",
		tasks: [
			'Étude de marché et élaboration de la stratégie digitale',
			'Aide à la conception du site web et au SEO',
			'Création et gestion des réseaux sociaux',
		],
		tech: ['SEO', 'Stratégie digitale'],
	},
];

/** Formation (timeline). */
export const education: TimelineItem[] = [
	{
		title: 'Master of Science — 1ère année',
		organization: 'EPITECH Montpellier',
		type: 'Formation',
		period: '2024 — 2027',
		description:
			"Apprentissage par projets : développement fullstack web et mobile, containerisation, bases de données, CI/CD. Rythme alternance : 1 semaine en formation / 9 semaines en entreprise.",
		tech: ['TypeScript', 'React', 'NestJS', 'Docker', 'PostgreSQL'],
	},
	{
		title: 'Bachelor Marketing Digital & Social Media',
		organization: 'Digital College Montpellier',
		type: 'Formation',
		period: '2021 — 2024',
		description:
			'Marketing digital, SEO, stratégie de contenu et design graphique — un socle qui nourrit aujourd’hui ma vision produit.',
		tech: ['SEO', 'Design', 'Stratégie de contenu'],
	},
];

/** Valeurs / qualités mises en avant sur la page À propos (soft skills du CV). */
export interface Value {
	title: string;
	description: string;
	/** Nom d'icône Lucide. */
	lucide: 'sparkles' | 'target' | 'users' | 'rocket';
}

export const values: Value[] = [
	{
		title: 'Adaptabilité',
		description:
			"Du marketing au code, du web au mobile : j'apprends vite et je m'intègre rapidement à de nouveaux environnements.",
		lucide: 'sparkles',
	},
	{
		title: 'Gestion de projet',
		description:
			'Habitué à cadrer, découper et livrer : chaque projet EPITECH est mené du cahier des charges à la mise en production.',
		lucide: 'target',
	},
	{
		title: "Esprit d'équipe",
		description:
			'Revues de code, pair programming, communication claire : je travaille en groupe au quotidien à EPITECH.',
		lucide: 'users',
	},
	{
		title: 'Autonomie & fiabilité',
		description:
			"Je vais au bout des choses : un projet n'a de valeur que déployé, documenté et utilisable.",
		lucide: 'rocket',
	},
];
