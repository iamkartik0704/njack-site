'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GsapScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    // Delay initialization slightly to let React complete DOM paint
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // 1. Hero Entrance Timeline (Only on routes that have #hero-section)
        const heroSection = document.getElementById('hero-section');
        if (heroSection) {
          const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

          const heroBadge = document.querySelector('.hero-badge');
          const heroTitle = document.querySelector('.hero-title');
          const heroDesc = document.querySelector('.hero-desc');
          const heroCta = document.querySelector('.hero-cta');
          const heroStats = document.querySelector('.hero-stats');

          if (heroBadge) {
            heroTl.fromTo(
              heroBadge,
              { opacity: 0, y: -30, scale: 0.85 },
              { opacity: 1, y: 0, scale: 1, duration: 0.8 }
            );
          }

          if (heroTitle) {
            heroTl.fromTo(
              heroTitle,
              { opacity: 0, y: 50, filter: 'blur(12px)' },
              { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1 },
              '-=0.5'
            );
          }

          if (heroDesc) {
            heroTl.fromTo(
              heroDesc,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.85 },
              '-=0.7'
            );
          }

          if (heroCta) {
            heroTl.fromTo(
              heroCta,
              { opacity: 0, y: 25 },
              { opacity: 1, y: 0, duration: 0.75 },
              '-=0.5'
            );
          }

          if (heroStats) {
            heroTl.fromTo(
              heroStats,
              { opacity: 0, y: 35 },
              { opacity: 1, y: 0, duration: 0.9 },
              '-=0.4'
            );
          }

          // Hero scroll scrub: smoothly shrink, blur and fade hero content as user scrolls down
          gsap.to('.hero-title, .hero-desc, .hero-cta', {
            yPercent: 20,
            opacity: 0.2,
            filter: 'blur(6px)',
            ease: 'none',
            scrollTrigger: {
              trigger: heroSection,
              start: 'top top',
              end: 'bottom 20%',
              scrub: 0.8,
            },
          });
        }

        // 2. Hero Floating Parallax Badges
        const floatingChips = document.querySelectorAll('.floating-chip');
        floatingChips.forEach((chip, i) => {
          // Continuous idle bobbing animation
          gsap.to(chip, {
            y: '+=16',
            rotation: i % 2 === 0 ? 3.5 : -3.5,
            duration: 2.8 + i * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });

          // Scroll-driven parallax scrub
          const speed = parseFloat(chip.getAttribute('data-speed') || '0.3');
          gsap.to(chip, {
            yPercent: -140 * speed,
            ease: 'none',
            scrollTrigger: {
              trigger: '#hero-section',
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });
        });

        // 3. Staggered Reveals for Section Headers
        const sectionHeaders = document.querySelectorAll('.gsap-section-header');
        sectionHeaders.forEach((header) => {
          gsap.fromTo(
            header,
            { opacity: 0, y: 45, filter: 'blur(8px)' },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: header,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        });

        // 4. Staggered Grid Cards Reveal (Department cards, tracks, resources, blog, etc.)
        const staggerContainers = document.querySelectorAll('.gsap-stagger-container');
        staggerContainers.forEach((container) => {
          const cards = container.querySelectorAll('.gsap-card');
          if (cards.length > 0) {
            gsap.fromTo(
              cards,
              {
                opacity: 0,
                y: 55,
                scale: 0.92,
                filter: 'blur(6px)',
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: container,
                  start: 'top 82%',
                  toggleActions: 'play none none none',
                },
              }
            );
          }
        });

        // 5. Parallax Background Gradient Blobs on Scroll
        const blobs = document.querySelectorAll('.gsap-parallax-blob');
        blobs.forEach((blob, i) => {
          const direction = i % 2 === 0 ? 1 : -1;
          gsap.to(blob, {
            yPercent: 40 * direction,
            scale: 1.2,
            ease: 'none',
            scrollTrigger: {
              trigger: document.body,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 1.5,
            },
          });
        });

        // 6. Interactive 3D Card Tilt on Hover
        const tiltCards = document.querySelectorAll<HTMLElement>('.gsap-tilt');
        tiltCards.forEach((card) => {
          const handleMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const rotateX = (-y / (rect.height / 2)) * 9;
            const rotateY = (x / (rect.width / 2)) * 9;

            gsap.to(card, {
              rotateX,
              rotateY,
              transformPerspective: 1000,
              duration: 0.35,
              ease: 'power2.out',
            });
          };

          const handleLeave = () => {
            gsap.to(card, {
              rotateX: 0,
              rotateY: 0,
              duration: 0.65,
              ease: 'elastic.out(1, 0.4)',
            });
          };

          card.addEventListener('mousemove', handleMove);
          card.addEventListener('mouseleave', handleLeave);
        });

        // 7. Magnetic Button Effect
        const magneticButtons = document.querySelectorAll<HTMLElement>('.gsap-magnetic');
        magneticButtons.forEach((btn) => {
          const handleMove = (e: MouseEvent) => {
            const rect = btn.getBoundingClientRect();
            const x = (e.clientX - (rect.left + rect.width / 2)) * 0.35;
            const y = (e.clientY - (rect.top + rect.height / 2)) * 0.35;

            gsap.to(btn, {
              x,
              y,
              duration: 0.3,
              ease: 'power2.out',
            });
          };

          const handleLeave = () => {
            gsap.to(btn, {
              x: 0,
              y: 0,
              duration: 0.6,
              ease: 'elastic.out(1, 0.3)',
            });
          };

          btn.addEventListener('mousemove', handleMove);
          btn.addEventListener('mouseleave', handleLeave);
        });

        // Refresh ScrollTrigger after all elements are bound
        ScrollTrigger.refresh();
      });

      return () => ctx.revert();
    }, 120);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
