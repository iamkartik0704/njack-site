'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

interface SplitTextRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export default function SplitTextReveal({
  text,
  className = '',
  wordClassName = '',
  delay = 0,
  as: Component = 'div',
}: SplitTextRevealProps) {
  const words = text.split(' ');

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.035,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      y: '115%',
      rotateZ: 2,
      opacity: 0,
    },
    visible: {
      y: '0%',
      rotateZ: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 20,
        mass: 0.8,
      },
    },
  };

  return (
    <Component className={className}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="inline-flex flex-wrap items-baseline gap-x-[0.25em]"
      >
        {words.map((word, idx) => (
          <span
            key={`${word}-${idx}`}
            className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em]"
          >
            <motion.span
              variants={wordVariants}
              className={`inline-block origin-bottom-left will-change-transform ${wordClassName}`}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Component>
  );
}
