/* =============================================
   ALMIJARA DE MAR — SCRIPT
   ============================================= */

(function () {
  'use strict';

  /* --- HEADER SCROLL --- */
  const header = document.getElementById('header');

  function onScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- MOBILE NAV --- */
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  burger.addEventListener('click', function () {
    const isOpen = nav.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  nav.querySelectorAll('.header__nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      burger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* --- HERO IMAGE KEN BURNS --- */
  const heroImg = document.querySelector('.hero__img');
  if (heroImg) {
    if (heroImg.complete) {
      heroImg.classList.add('loaded');
    } else {
      heroImg.addEventListener('load', function () {
        heroImg.classList.add('loaded');
      });
    }
  }

  /* --- REVEAL ON SCROLL --- */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealEls.forEach(function (el) {
    revealObserver.observe(el);
  });

  /* --- SMOOTH ANCHOR SCROLL --- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const headerH = header.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* --- ACTIVE NAV LINK ON SCROLL --- */
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.header__nav-link');

  function setActiveNav() {
    const scrollY = window.scrollY;
    let current = '';

    sections.forEach(function (section) {
      const top = section.offsetTop - header.offsetHeight - 80;
      if (scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.style.color = '';
      const href = link.getAttribute('href').replace('#', '');
      if (href === current) {
        link.style.color = 'var(--gold-light)';
      }
    });
  }

  window.addEventListener('scroll', setActiveNav, { passive: true });

  /* --- GALLERY LIGHTBOX (simple) --- */
  const galleryItems = document.querySelectorAll('.galeria__item img');

  if (galleryItems.length) {
    const overlay = document.createElement('div');
    overlay.style.cssText = [
      'position:fixed',
      'inset:0',
      'background:rgba(26,24,22,0.95)',
      'z-index:999',
      'display:flex',
      'align-items:center',
      'justify-content:center',
      'opacity:0',
      'pointer-events:none',
      'transition:opacity 0.3s ease',
      'cursor:zoom-out',
    ].join(';');

    const overlayImg = document.createElement('img');
    overlayImg.style.cssText = [
      'max-width:90vw',
      'max-height:88vh',
      'object-fit:contain',
      'border-radius:2px',
      'transform:scale(0.94)',
      'transition:transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
    ].join(';');

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = [
      'position:fixed',
      'top:1.5rem',
      'right:2rem',
      'background:none',
      'border:none',
      'color:rgba(245,240,232,0.7)',
      'font-size:2.5rem',
      'cursor:pointer',
      'line-height:1',
      'z-index:1000',
      'font-family:serif',
    ].join(';');

    overlay.appendChild(overlayImg);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);

    function openLightbox(src, alt) {
      overlayImg.src = src;
      overlayImg.alt = alt || '';
      overlay.style.pointerEvents = 'auto';
      overlay.style.opacity = '1';
      overlayImg.style.transform = 'scale(1)';
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      overlay.style.opacity = '0';
      overlayImg.style.transform = 'scale(0.94)';
      overlay.style.pointerEvents = 'none';
      document.body.style.overflow = '';
    }

    galleryItems.forEach(function (img) {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function () {
        openLightbox(this.src, this.alt);
      });
    });

    overlay.addEventListener('click', closeLightbox);
    closeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  /* --- PARALLAX HERO (subtle) --- */
  function parallaxHero() {
    const heroBg = document.querySelector('.hero__img');
    if (!heroBg) return;
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      heroBg.style.transform = 'scale(1) translateY(' + scrollY * 0.18 + 'px)';
    }
  }

  window.addEventListener('scroll', parallaxHero, { passive: true });

  /* --- CARTA TABS ON MOBILE --- */
  const cartaSecciones = document.querySelectorAll('.carta__seccion');

  if (window.innerWidth < 640 && cartaSecciones.length) {
    cartaSecciones.forEach(function (sec) {
      const title = sec.querySelector('.carta__seccion-title');
      const list = sec.querySelector('.carta__lista');

      list.style.overflow = 'hidden';
      list.style.maxHeight = '0px';
      list.style.transition = 'max-height 0.4s ease';

      title.style.cursor = 'pointer';
      title.style.userSelect = 'none';

      const arrow = document.createElement('span');
      arrow.textContent = ' ↓';
      arrow.style.cssText = 'font-size:0.75rem;color:var(--terracotta);margin-left:0.5rem;display:inline-block;transition:transform 0.3s ease;';
      title.appendChild(arrow);

      title.addEventListener('click', function () {
        const isOpen = list.style.maxHeight !== '0px';
        if (isOpen) {
          list.style.maxHeight = '0px';
          arrow.style.transform = 'rotate(0deg)';
        } else {
          list.style.maxHeight = list.scrollHeight + 'px';
          arrow.style.transform = 'rotate(180deg)';
        }
      });
    });
  }

})();
