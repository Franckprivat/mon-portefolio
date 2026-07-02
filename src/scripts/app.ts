/**
 * Moteur d'animations et d'interactions du site.
 *
 * Chargé une seule fois (module), il se ré-initialise à chaque navigation
 * via les événements du ClientRouter d'Astro :
 *  - `astro:page-load`   → (re)création des animations de la page
 *  - `astro:before-swap` → nettoyage des ScrollTriggers de la page sortante
 *
 * Tout respecte `prefers-reduced-motion`.
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ------------------------------- Smooth scroll ------------------------------ */

let lenis: Lenis | null = null;

function setupLenis(): void {
	if (reducedMotion || lenis) return;

	lenis = new Lenis({ autoRaf: false, lerp: 0.12 });
	lenis.on('scroll', ScrollTrigger.update);
	gsap.ticker.add((time) => lenis?.raf(time * 1000));
	gsap.ticker.lagSmoothing(0);
}

/** Fait défiler en douceur vers une cible (utilisé par les ancres et le bouton haut de page). */
export function scrollTo(target: string | number | HTMLElement): void {
	if (lenis) lenis.scrollTo(target, { offset: -80 });
	else if (typeof target === 'number') window.scrollTo({ top: target });
	else {
		const el = typeof target === 'string' ? document.querySelector(target) : target;
		el?.scrollIntoView({ behavior: 'smooth' });
	}
}

/* ------------------------------ Reveal au scroll ----------------------------- */

const REVEAL_FROM: Record<string, gsap.TweenVars> = {
	up: { y: 40, opacity: 0 },
	down: { y: -40, opacity: 0 },
	left: { x: -48, opacity: 0 },
	right: { x: 48, opacity: 0 },
	zoom: { scale: 0.92, opacity: 0 },
	fade: { opacity: 0 },
};

function setupReveals(): void {
	const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');

	if (reducedMotion) {
		elements.forEach((el) => (el.style.opacity = '1'));
		return;
	}

	elements.forEach((el) => {
		const kind = el.dataset.reveal || 'up';
		const delay = Number(el.dataset.revealDelay || 0);

		gsap.fromTo(el, REVEAL_FROM[kind] ?? REVEAL_FROM.up, {
			y: 0,
			x: 0,
			scale: 1,
			opacity: 1,
			duration: 0.9,
			delay,
			ease: 'power3.out',
			scrollTrigger: { trigger: el, start: 'top 88%', once: true },
		});
	});

	// Grilles / listes : les enfants directs apparaissent en cascade.
	document.querySelectorAll<HTMLElement>('[data-reveal-stagger]').forEach((group) => {
		const children = Array.from(group.children) as HTMLElement[];
		if (reducedMotion || children.length === 0) return;

		gsap.fromTo(
			children,
			{ y: 36, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 0.8,
				stagger: 0.09,
				ease: 'power3.out',
				scrollTrigger: { trigger: group, start: 'top 85%', once: true },
			}
		);
	});
}

/* ------------------------------- Text reveal -------------------------------- */

/** Découpe un élément en mots masqués, puis les révèle mot à mot. */
function setupTextReveals(): void {
	document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
		if (el.dataset.splitDone) return;
		el.dataset.splitDone = 'true';

		if (reducedMotion) return;

		// background-clip:text ne survit pas aux transforms des enfants :
		// on déplace le dégradé du parent vers chaque mot.
		const gradient = el.classList.contains('text-gradient');
		if (gradient) el.classList.remove('text-gradient');

		// Le texte réel reste lisible par les lecteurs d'écran (sr-only),
		// les mots animés sont décoratifs (aria-hidden).
		const words = (el.textContent ?? '').trim().split(/\s+/);
		el.innerHTML =
			`<span class="sr-only">${words.join(' ')}</span>` +
			words
				.map(
					(w) =>
						`<span class="inline-block overflow-hidden align-bottom" aria-hidden="true"><span class="inline-block will-change-transform${gradient ? ' text-gradient' : ''}" data-word>${w}</span></span>`
				)
				.join(' ');

		gsap.fromTo(
			el.querySelectorAll('[data-word]'),
			{ yPercent: 110 },
			{
				yPercent: 0,
				duration: 0.85,
				stagger: 0.045,
				ease: 'power4.out',
				delay: Number(el.dataset.splitDelay || 0),
				scrollTrigger: { trigger: el, start: 'top 90%', once: true },
			}
		);
	});
}

/* --------------------------- Barres de compétences --------------------------- */

/** Anime les jauges [data-bar="75"] jusqu'à leur niveau quand elles entrent à l'écran. */
function setupBars(): void {
	document.querySelectorAll<HTMLElement>('[data-bar]').forEach((bar) => {
		const level = Number(bar.dataset.bar || 0);

		if (reducedMotion) {
			bar.style.width = `${level}%`;
			return;
		}

		gsap.fromTo(
			bar,
			{ width: '0%' },
			{
				width: `${level}%`,
				duration: 1.1,
				ease: 'power3.out',
				scrollTrigger: { trigger: bar, start: 'top 92%', once: true },
			}
		);
	});
}

/* ----------------------------- Boutons magnétiques --------------------------- */

function setupMagnetic(): void {
	if (!finePointer || reducedMotion) return;

	document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
		const strength = Number(el.dataset.magnetic || 0.35);
		const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' });
		const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' });

		el.addEventListener('mousemove', (e) => {
			const rect = el.getBoundingClientRect();
			xTo((e.clientX - rect.left - rect.width / 2) * strength);
			yTo((e.clientY - rect.top - rect.height / 2) * strength);
		});
		el.addEventListener('mouseleave', () => {
			xTo(0);
			yTo(0);
		});
	});
}

/* ------------------------- Cartes : halo + tilt 3D --------------------------- */

function setupCards(): void {
	if (!finePointer) return;

	// Halo lumineux qui suit la souris (variables --mx / --my lues par .card-premium)
	document.querySelectorAll<HTMLElement>('.card-premium').forEach((card) => {
		card.addEventListener('mousemove', (e) => {
			const rect = card.getBoundingClientRect();
			card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
			card.style.setProperty('--my', `${e.clientY - rect.top}px`);
		});
	});

	if (reducedMotion) return;

	// Légère rotation 3D au survol
	document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((card) => {
		const rx = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power2.out' });
		const ry = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power2.out' });
		gsap.set(card, { transformPerspective: 900 });

		card.addEventListener('mousemove', (e) => {
			const rect = card.getBoundingClientRect();
			ry(((e.clientX - rect.left) / rect.width - 0.5) * 7);
			rx(-((e.clientY - rect.top) / rect.height - 0.5) * 7);
		});
		card.addEventListener('mouseleave', () => {
			rx(0);
			ry(0);
		});
	});
}

/* ------------------------------ Parallaxe souris ----------------------------- */

function setupMouseParallax(): void {
	if (!finePointer || reducedMotion) return;

	const scene = document.querySelector<HTMLElement>('[data-parallax-scene]');
	if (!scene) return;

	const layers = scene.querySelectorAll<HTMLElement>('[data-parallax-layer]');
	const movers = Array.from(layers).map((layer) => ({
		depth: Number(layer.dataset.parallaxLayer || 1),
		x: gsap.quickTo(layer, 'x', { duration: 0.8, ease: 'power2.out' }),
		y: gsap.quickTo(layer, 'y', { duration: 0.8, ease: 'power2.out' }),
	}));

	scene.addEventListener('mousemove', (e) => {
		const { innerWidth, innerHeight } = window;
		const dx = e.clientX / innerWidth - 0.5;
		const dy = e.clientY / innerHeight - 0.5;
		movers.forEach((m) => {
			m.x(dx * m.depth * 22);
			m.y(dy * m.depth * 22);
		});
	});
}

/* ----------------------------- Curseur personnalisé -------------------------- */

let cursorReady = false;

function setupCursor(): void {
	if (!finePointer || reducedMotion || cursorReady) return;

	const dot = document.getElementById('cursor-dot');
	const ring = document.getElementById('cursor-ring');
	if (!dot || !ring) return;

	cursorReady = true;
	document.documentElement.classList.add('custom-cursor');

	const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2.out' });
	const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2.out' });
	const ringX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' });
	const ringY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' });

	window.addEventListener('mousemove', (e) => {
		dotX(e.clientX);
		dotY(e.clientY);
		ringX(e.clientX);
		ringY(e.clientY);
	});

	// Le curseur s'agrandit sur les éléments interactifs (délégation → survit aux navigations)
	const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, [data-cursor]';
	document.addEventListener('mouseover', (e) => {
		const on = (e.target as HTMLElement).closest(INTERACTIVE);
		gsap.to(ring, { scale: on ? 2.2 : 1, opacity: on ? 0.45 : 1, duration: 0.3 });
		gsap.to(dot, { scale: on ? 0.5 : 1, duration: 0.3 });
	});

	document.addEventListener('mouseleave', () => gsap.to([dot, ring], { opacity: 0, duration: 0.2 }));
	document.addEventListener('mouseenter', () => gsap.to([dot, ring], { opacity: 1, duration: 0.2 }));
}

/* ------------------------------- Navbar & ancres ----------------------------- */

function setupNavbar(): void {
	const nav = document.getElementById('site-nav');
	if (!nav) return;

	const onScroll = () => nav.classList.toggle('nav-scrolled', window.scrollY > 24);
	onScroll();
	window.addEventListener('scroll', onScroll, { passive: true });
}

function setupAnchors(): void {
	// Les ancres internes passent par Lenis pour un défilement fluide.
	document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
		a.addEventListener('click', (e) => {
			const id = a.getAttribute('href');
			if (!id || id === '#') return;
			const target = document.querySelector<HTMLElement>(id);
			if (!target) return;
			e.preventDefault();
			scrollTo(target);
		});
	});
}

/* ------------------------------ Bouton haut de page -------------------------- */

function setupScrollTop(): void {
	const btn = document.getElementById('scroll-top');
	if (!btn) return;

	const toggle = () => btn.classList.toggle('is-visible', window.scrollY > 600);
	toggle();
	window.addEventListener('scroll', toggle, { passive: true });
	btn.addEventListener('click', () => scrollTo(0));
}

/* --------------------------------- Easter egg -------------------------------- */

const KONAMI = [
	'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
	'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a',
];
let konamiIndex = 0;
let konamiBound = false;

function setupEasterEgg(): void {
	if (konamiBound) return;
	konamiBound = true;

	document.addEventListener('keydown', (e) => {
		konamiIndex = e.key === KONAMI[konamiIndex] ? konamiIndex + 1 : 0;
		if (konamiIndex < KONAMI.length) return;
		konamiIndex = 0;

		// 🛸 La page fait un tour sur elle-même et une pluie d'étoiles tombe.
		gsap.fromTo('main', { rotation: 0 }, { rotation: 360, duration: 1.2, ease: 'power2.inOut' });
		for (let i = 0; i < 24; i++) {
			const star = document.createElement('span');
			star.textContent = ['✦', '★', '🪐', '✨'][i % 4];
			star.style.cssText = `position:fixed;top:-40px;left:${Math.random() * 100}vw;font-size:${14 + Math.random() * 22}px;z-index:9999;pointer-events:none;`;
			document.body.appendChild(star);
			gsap.to(star, {
				y: window.innerHeight + 80,
				rotation: Math.random() * 540,
				duration: 1.6 + Math.random() * 1.6,
				ease: 'power1.in',
				onComplete: () => star.remove(),
			});
		}
	});
}

/* ---------------------------------- Cycle de vie ----------------------------- */

function initPage(): void {
	setupReveals();
	setupTextReveals();
	setupBars();
	setupMagnetic();
	setupCards();
	setupMouseParallax();
	setupCursor();
	setupNavbar();
	setupAnchors();
	setupScrollTop();
	setupEasterEgg();
	ScrollTrigger.refresh();
}

setupLenis();

document.addEventListener('astro:page-load', initPage);

document.addEventListener('astro:before-swap', () => {
	ScrollTrigger.getAll().forEach((st) => st.kill());
});

document.addEventListener('astro:after-swap', () => {
	lenis?.scrollTo(0, { immediate: true });
});
