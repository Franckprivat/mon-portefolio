/**
 * Compétences techniques, groupées par catégorie.
 * `icon`  : slug simple-icons (logo de marque, rendu statique en SVG)
 * `level` : maîtrise sur 100 — pilote la barre animée des cartes.
 */

export interface Skill {
	name: string;
	/** Slug simple-icons (ex. "react" → siReact). null = icône générique. */
	icon: string | null;
	level: number;
}

export interface SkillCategory {
	title: string;
	/** Nom d'icône Lucide affiché dans l'en-tête de la catégorie. */
	lucide: 'monitor' | 'server' | 'database' | 'wrench';
	skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
	{
		title: 'Frontend',
		lucide: 'monitor',
		skills: [
			{ name: 'HTML', icon: 'html5', level: 90 },
			{ name: 'CSS', icon: 'css', level: 85 },
			{ name: 'JavaScript', icon: 'javascript', level: 80 },
			{ name: 'TypeScript', icon: 'typescript', level: 75 },
			{ name: 'React', icon: 'react', level: 75 },
			{ name: 'Astro', icon: 'astro', level: 70 },
			{ name: 'Tailwind CSS', icon: 'tailwindcss', level: 85 },
		],
	},
	{
		title: 'Backend',
		lucide: 'server',
		skills: [
			{ name: 'Node.js', icon: 'nodedotjs', level: 75 },
			{ name: 'NestJS', icon: 'nestjs', level: 70 },
			{ name: 'Symfony', icon: 'symfony', level: 60 },
			{ name: 'REST API', icon: null, level: 80 },
		],
	},
	{
		title: 'Base de données',
		lucide: 'database',
		skills: [
			{ name: 'PostgreSQL', icon: 'postgresql', level: 70 },
			{ name: 'MariaDB', icon: 'mariadb', level: 65 },
			{ name: 'MongoDB', icon: 'mongodb', level: 65 },
		],
	},
	{
		title: 'Outils',
		lucide: 'wrench',
		skills: [
			{ name: 'Docker', icon: 'docker', level: 65 },
			{ name: 'Git', icon: 'git', level: 85 },
			{ name: 'GitHub', icon: 'github', level: 85 },
			{ name: 'Linux', icon: 'linux', level: 70 },
			{ name: 'Figma', icon: 'figma', level: 75 },
		],
	},
];
