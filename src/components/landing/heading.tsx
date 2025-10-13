'use client'
import React from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const Heading = ({title, description}: {title: string, description: string}) => {
  return (
    <>
      <motion.h2
        variants={fadeInUp}
        className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-[48px]"
      >
        {title}
      </motion.h2>
      <motion.p
        variants={fadeInUp}
        className="sm:mt-6 mt-2 sm:text-lg text-base text-gray-600 dark:text-gray-300"
      >
        {description}
      </motion.p>
    </>
  );
};

export default Heading;
