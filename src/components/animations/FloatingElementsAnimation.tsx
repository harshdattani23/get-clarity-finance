"use client";
import { motion, Transition } from "framer-motion";
import { TrendingUp, Home } from "lucide-react";
import { GiGoldBar } from "react-icons/gi";

const iconStyle = "w-8 h-8 md:w-10 md:h-10";

const elements = [
  {
    icon: <TrendingUp className={`${iconStyle} text-green-500`} />,
    initial: { x: "5vw", y: "10vh", scale: 1.2 },
    animate: { x: "20vw", y: "5vh" },
    transition: { duration: 15, ease: "easeInOut" } as Transition,
  },
  {
    icon: <Home className={`${iconStyle} text-blue-500`} />,
    initial: { x: "25vw", y: "15vh", scale: 1.0 },
    animate: { x: "5vw", y: "20vh" },
    transition: { duration: 18, ease: "easeInOut" } as Transition,
  },
  {
    icon: <span className="text-3xl md:text-4xl font-bold text-yellow-500">₹</span>,
    initial: { x: "15vw", y: "25vh", scale: 1.4 },
    animate: { x: "28vw", y: "10vh" },
    transition: { duration: 20, ease: "easeInOut" } as Transition,
  },
  {
    icon: <GiGoldBar className={`${iconStyle} text-yellow-400`} />, // Gold Bar Icon
    initial: { x: "2vw", y: "30vh", scale: 1.1 },
    animate: { x: "15vw", y: "2vh" },
    transition: { duration: 16, ease: "easeInOut" } as Transition,
  },
  {
    icon: <TrendingUp className={`${iconStyle} text-green-500 opacity-50`} />,
    initial: { x: "28vw", y: "30vh", scale: 0.8 },
    animate: { x: "2vw", y: "25vh" },
    transition: { duration: 22, ease: "easeInOut" } as Transition,
  },
  {
    icon: <Home className={`${iconStyle} text-blue-500 opacity-60`} />,
    initial: { x: "10vw", y: "2vh", scale: 1.1 },
    animate: { x: "25vw", y: "28vh" },
    transition: { duration: 19, ease: "easeInOut" } as Transition,
  },
  {
    icon: <span className="text-2xl md:text-3xl font-bold text-yellow-500 opacity-70">₹</span>,
    initial: { x: "2vw", y: "2vh", scale: 1.0 },
    animate: { x: "10vw", y: "28vh" },
    transition: { duration: 25, ease: "easeInOut" } as Transition,
  },
   {
    icon: <GiGoldBar className={`${iconStyle} text-yellow-400 opacity-60`} />,
    initial: { x: "20vw", y: "25vh", scale: 0.9 },
    animate: { x: "8vw", y: "5vh" },
    transition: { duration: 17, ease: "easeInOut" } as Transition,
  },
];

const FloatingElementsAnimation = () => {
  return (
    <div className="relative w-full h-full min-h-[40vh]">
      {elements.map((el, i) => (
        <motion.div
          key={i}
          initial={el.initial}
          animate={el.animate}
          transition={{
            ...el.transition,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="absolute"
        >
          {el.icon}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElementsAnimation;

