'use client';

import React from 'react';
import { motion, Transition } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'characters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  stepDuration?: number;
}

export function BlurText({
  text = '',
  delay = 50,
  className = '',
  animateBy = 'words',
  direction = 'bottom',
  stepDuration = 0.45,
}: BlurTextProps) {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  const defaultFrom = {
    filter: 'blur(10px)',
    opacity: 0,
    transform: direction === 'top' ? 'translate3d(0,-20px,0)' : 'translate3d(0,20px,0)',
  };

  const defaultTo = {
    filter: 'blur(0px)',
    opacity: 1,
    transform: 'translate3d(0,0,0)',
  };

  return (
    <span className={cn('inline-block', className)}>
      {elements.map((segment, index) => (
        <motion.span
          key={index}
          initial={defaultFrom}
          animate={defaultTo}
          transition={
            {
              duration: stepDuration,
              delay: (index * delay) / 1000,
              ease: [0.25, 0.4, 0.25, 1],
            } as Transition
          }
          className="inline-block whitespace-pre will-change-[transform,filter,opacity]"
        >
          {segment}
          {animateBy === 'words' && index < elements.length - 1 && ' '}
        </motion.span>
      ))}
    </span>
  );
}
