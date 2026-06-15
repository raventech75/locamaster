/**
 * Locamaster — Système d'animation "luxe"
 * GSAP + ScrollTrigger (reveals, parallaxe, compteurs) + Lenis (smooth scroll)
 * + curseur custom + boutons magnétiques.
 *
 * Compatible Astro View Transitions : (ré)initialisé à chaque `astro:page-load`.
 * Respecte prefers-reduced-motion (tout désactivé, contenu visible).
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;

// Synchronisé avec le bloc CSS .has-luxe de global.css
const REVEAL_SELECTOR = [
  '[data-reveal]',
  'main section:not([data-hero]) h2',
  'main section:not([data-hero]) .section-label',
  'main .card',
  'main .card-surface',
].join(',');

// Singletons (persistent entre navigations View Transitions)
let lenis: Lenis | null = null;
let curtainReady = false;

/* ----------------------------------------------------------------
   Lenis — créé une seule fois (le <html> persiste entre les pages)
   ---------------------------------------------------------------- */
function setupLenisOnce() {
  if (lenis) return;
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis!.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* ----------------------------------------------------------------
   Intro de chargement — animée une fois par session
   ---------------------------------------------------------------- */
function runLoaderOnce() {
  const loader = document.getElementById('luxe-loader');
  if (!loader || document.documentElement.classList.contains('loaded')) return;

  const done = () => {
    document.documentElement.classList.add('loaded');
    try { sessionStorage.setItem('lm-loaded', '1'); } catch {}
    loader.remove();
  };

  if (reduce) { done(); return; }

  const tl = gsap.timeline({ onComplete: done });
  tl.to(loader.querySelector('.loader-bar span'), { width: '100%', duration: 0.85, ease: 'power2.inOut' })
    .to(loader.querySelector('.loader-mark'), { scale: 1.12, duration: 0.25, ease: 'power2.out' }, '-=0.15')
    .to(loader, { yPercent: -100, duration: 0.7, ease: 'power3.inOut' }, '+=0.05');

  // Failsafe : ne jamais bloquer le site si le RAF est gelé
  window.setTimeout(() => { if (document.getElementById('luxe-loader')) done(); }, 2600);
}

/* ----------------------------------------------------------------
   Rideau de transition entre pages (View Transitions)
   ---------------------------------------------------------------- */
function setupCurtainOnce() {
  if (curtainReady || reduce) return;
  curtainReady = true;

  let curtain = document.getElementById('luxe-curtain');
  if (!curtain) {
    curtain = document.createElement('div');
    curtain.id = 'luxe-curtain';
    document.documentElement.appendChild(curtain);
  }

  // Couvre (monte depuis le bas) au départ de la navigation
  document.addEventListener('astro:before-preparation', () => {
    gsap.set(curtain, { transformOrigin: 'bottom center', scaleY: 0 });
    gsap.to(curtain, { scaleY: 1, duration: 0.42, ease: 'power3.inOut' });
  });

  // Découvre (sort par le haut) une fois la nouvelle page prête
  document.addEventListener('astro:page-load', () => {
    gsap.set(curtain, { transformOrigin: 'top center' });
    gsap.to(curtain, { scaleY: 0, duration: 0.55, ease: 'power3.inOut' });
  });
}

/* ----------------------------------------------------------------
   (Ré)initialisation par page
   ---------------------------------------------------------------- */
function initPage() {
  if (reduce) { runLoaderOnce(); return; }

  gsap.registerPlugin(ScrollTrigger);
  setupLenisOnce();
  setupCurtainOnce();
  runLoaderOnce();

  // Repart en haut proprement après une navigation
  lenis?.scrollTo(0, { immediate: true });

  // Nettoie les ScrollTriggers de la page précédente
  ScrollTrigger.getAll().forEach((t) => t.kill());

  // Navigation par ancres fluide
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
    const href = anchor.getAttribute('href');
    if (!href || href.length < 2) return;
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        lenis?.scrollTo(target as HTMLElement, { offset: -90, duration: 1.2 });
      }
    });
  });

  // 1. Hero — timeline d'entrée
  const hero = document.querySelector('[data-hero]');
  if (hero) {
    const heroEls = hero.querySelectorAll('[data-hero-el]');
    gsap.set(heroEls, { opacity: 0, y: 30 });
    gsap.to(heroEls, {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.1, delay: 0.05,
    });
  }

  // 2. Reveals au scroll (batch staggered)
  const revealEls = gsap.utils.toArray<HTMLElement>(REVEAL_SELECTOR);
  if (revealEls.length) {
    gsap.set(revealEls, { y: 40 });
    ScrollTrigger.batch(revealEls, {
      start: 'top 88%',
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08, overwrite: true,
        }),
    });
  }

  // 3. Parallaxe douce
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const strength = parseFloat(el.dataset.parallax || '12');
    gsap.to(el, {
      yPercent: strength, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  // 4. Compteurs animés
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const target = parseFloat(el.dataset.count || '0');
    const suffix = el.dataset.countSuffix || '';
    const prefix = el.dataset.countPrefix || '';
    const counter = { v: 0 };
    el.textContent = prefix + '0' + suffix;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () =>
        gsap.to(counter, {
          v: target, duration: 1.6, ease: 'power2.out',
          onUpdate: () => { el.textContent = prefix + Math.round(counter.v) + suffix; },
        }),
    });
  });

  // 5. Boutons magnétiques
  if (finePointer) {
    document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
      const strength = 0.35;
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        gsap.to(el, {
          x: (e.clientX - r.left - r.width / 2) * strength,
          y: (e.clientY - r.top - r.height / 2) * strength,
          duration: 0.4, ease: 'power2.out',
        });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      });
    });
  }

  // Recalibrage + failsafe (onglet d'arrière-plan → RAF gelé)
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
  window.setTimeout(() => {
    document.querySelectorAll<HTMLElement>('[data-hero-el]').forEach((el) => {
      if (getComputedStyle(el).opacity === '0') {
        el.style.opacity = '1';
        el.style.transform = 'none';
      }
    });
  }, 2000);
}

// Reprise quand l'onglet redevient visible
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) ScrollTrigger.refresh();
});

// astro:page-load se déclenche au 1er chargement ET après chaque navigation VT
document.addEventListener('astro:page-load', initPage);
// Fallback si View Transitions absent
if (!('startViewTransition' in document)) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
  }
}
