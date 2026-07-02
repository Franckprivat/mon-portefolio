/** Parcours professionnel, formation et valeurs — données réelles de Franck. */

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
		period: 'Mars 2024 — Juillet 2024',
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
		title: 'Pré-MSc — Informatique',
		organization: 'EPITECH',
		type: 'Formation',
		period: '2024 — Aujourd’hui',
		description:
			"Apprentissage par projets : développement web fullstack, C, algorithmique, DevOps. Préparation au MSc Pro (alternance).",
		tech: ['TypeScript', 'React', 'NestJS', 'Docker', 'C'],
	},
	{
		title: 'Bachelor Digital Marketing & Social Media',
		organization: 'Digital College',
		type: 'Formation',
		period: '2021 — 2024',
		description:
			'Marketing digital, SEO, stratégie de contenu et design graphique — un socle qui nourrit aujourd’hui ma vision produit.',
		tech: ['SEO', 'Design', 'Stratégie de contenu'],
	},
];

/** Valeurs / qualités mises en avant sur la page À propos. */
export interface Value {
	title: string;
	description: string;
	/** Nom d'icône Lucide. */
	lucide: 'sparkles' | 'target' | 'users' | 'rocket';
}

export const values: Value[] = [
	{
		title: 'Curiosité',
		description:
			"J'apprends vite et en continu : chaque projet est l'occasion d'explorer une techno ou un pattern nouveau.",
		lucide: 'sparkles',
	},
	{
		title: 'Sens du produit',
		description:
			'Mon passé en marketing digital me fait penser utilisateur, référencement et impact — pas seulement code.',
		lucide: 'target',
	},
	{
		title: "Esprit d'équipe",
		description:
			"Habitué au travail en groupe à EPITECH : revues de code, pair programming et communication claire.",
		lucide: 'users',
	},
	{
		title: 'Livraison',
		description:
			"Je vais au bout des choses : un projet n'a de valeur que déployé, documenté et utilisable.",
		lucide: 'rocket',
	},
];
