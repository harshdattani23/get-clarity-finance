"use client";

import { motion } from 'framer-motion';

interface AnimatedDivProps {
    children: React.ReactNode;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
    className?: string;
}

const AnimatedDiv = ({ children, delay = 0.2, direction = 'up', className }: AnimatedDivProps) => {
    const variants = {
        hidden: {
            opacity: 0,
            y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0,
            x: direction === 'left' ? 20 : direction === 'right' ? -20 : 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
        },
    };

  return (
    <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        variants={variants}
        className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedDiv;
