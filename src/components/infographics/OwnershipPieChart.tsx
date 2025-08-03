"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const OwnershipPieChart = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger the animation once
    threshold: 0.5, // Trigger when 50% of the element is in view
  });

  const variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring" as const, duration: 2.5, bounce: 0 },
        opacity: { duration: 0.1 },
      },
    },
  };

  const sliceVariants = {
    hidden: { x: 0, y: 0, opacity: 0 },
    visible: {
      x: -15,
      y: -15,
      opacity: 1,
      transition: {
        delay: 1.5,
        duration: 0.5,
      },
    },
  };

  return (
    <div ref={ref} className="text-center my-8 flex flex-col items-center">
      <h4 className="font-bold text-xl text-gray-700 mb-4">Imagine a Company as a Pizza</h4>
      <svg width="200" height="200" viewBox="0 0 100 100" className="transform -rotate-90 drop-shadow-lg">
        {/* Main pizza circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          stroke="#FFC700" // A brighter yellow
          strokeWidth="10"
          fill="transparent"
          variants={variants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        />
        {/* The "slice" or share that is bought */}
        <motion.path
          d="M 50 50 L 50 10 A 40 40 0 0 1 84.64 30.00 Z"
          fill="#FFA500" // A vibrant orange
          stroke="#FFFFFF"
          strokeWidth="1"
          variants={sliceVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        />
      </svg>
      <p className="mt-4 text-gray-600 max-w-md">
        Each slice represents one <strong>share</strong> of the company's stock. When you buy a share, you are buying a slice of that company. You become a part-owner!
      </p>
    </div>
  );
};

export default OwnershipPieChart;
