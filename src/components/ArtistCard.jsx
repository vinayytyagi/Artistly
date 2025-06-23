"use client";
import React from "react";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  hover: {
    y: -8,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

const imageVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0 8px 20px rgba(59, 130, 246, 0.3)",
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  tap: {
    scale: 0.95,
  },
};

export const ArtistCard = ({
  name,
  category,
  priceRange,
  location,
  image,
  onQuoteClick,
}) => (
  <motion.div
    className="bg-white rounded-xl shadow border border-gray-200 p-3 sm:p-4 flex flex-col items-center transition-all"
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    whileHover="hover"
    layout
  >
    <motion.img
      src={image}
      alt={`Photo of ${name}`}
      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full mb-2 border-2 border-blue-100"
      width={96}
      height={96}
      variants={imageVariants}
      whileHover="hover"
    />
    <motion.h3 
      className="text-base sm:text-lg font-semibold text-blue-700 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      {name}
    </motion.h3>
    <motion.p 
      className="text-xs sm:text-sm text-gray-500 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      {category.join(", ")}
    </motion.p>
    <motion.p 
      className="text-xs sm:text-sm mt-1 text-gray-600 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      {location}
    </motion.p>
    <motion.p 
      className="text-xs sm:text-sm font-medium mt-1 text-blue-600 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      {priceRange}
    </motion.p>
    <motion.button
      className="mt-3 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded font-semibold shadow text-sm sm:text-base"
      onClick={onQuoteClick}
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.3 }}
    >
      Ask for Quote
    </motion.button>
  </motion.div>
); 