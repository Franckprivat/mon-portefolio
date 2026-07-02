/**
 * Compétences techniques, groupées par catégorie (issues du CV).
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
			{ name: 'TypeScript', icon: 'typescript', level: 78 },
			{ name: 'React', icon: 'react', level: 78 },
			{ name: 'React Native', icon: 'react', level: 65 },
			{ name: 'Next.js', icon: 'nextdotjs', level: 75 },
			{ name: 'Astro', icon: 'astro', level: 70 },
			{ name: 'Tailwind CSS', icon: 'tailwindcss', level: 85 },
		],
	},
	{
		title: 'Backend',
		lucide: 'server',
		skills: [
			{ name: 'Node.js', icon: 'nodedotjs', level: 78 },
			{ name: 'NestJS', icon: 'nestjs', level: 72 },
			{ name: 'Express.js', icon: 'express', level: 72 },
			{ name: 'Symfony', icon: 'symfony', level: 62 },
			{ name: 'PHP', icon: 'php', level: 60 },
			{ name: 'Python', icon: 'python', level: 60 },
			{ name: 'REST API', icon: null, level: 80 },
		],
	},
	{
		title: 'Base de données',
		lucide: 'database',
		skills: [
			{ name: 'PostgreSQL', icon: 'postgresql', level: 72 },
			{ name: 'MariaDB', icon: 'mariadb', level: 65 },
			{ name: 'MongoDB', icon: 'mongodb', level: 68 },
			{ name: 'Prisma', icon: 'prisma', level: 70 },
		],
	},
	{
		title: 'Outils & DevOps',
		lucide: 'wrench',
		skills: [
			{ name: 'Docker', icon: 'docker', level: 70 },
			{ name: 'Kubernetes', icon: 'kubernetes', level: 50 },
			{ name: 'CI/CD', icon: 'githubactions', level: 60 },
			{ name: 'Git / GitHub', icon: 'git', level: 85 },
			{ name: 'Linux / WSL', icon: 'linux', level: 70 },
			{ name: 'Strapi', icon: 'strapi', level: 62 },
			{ name: 'WordPress', icon: 'wordpress', level: 75 },
			{ name: 'Postman', icon: 'postman', level: 80 },
			{ name: 'Figma', icon: 'figma', level: 75 },
		],
	},
];
