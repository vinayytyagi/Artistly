"use client";
import React from "react";
import { motion } from "framer-motion";

const filterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const selectVariants = {
  hover: {
    scale: 1.02,
    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.15)",
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  focus: {
    scale: 1.02,
    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.25)",
  },
};

export const FilterBlock = ({
  categories,
  locations,
  priceRanges,
  selectedCategory,
  selectedLocation,
  selectedPriceRange,
  onCategoryChange,
  onLocationChange,
  onPriceRangeChange,
}) => (
  <motion.div 
    className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-6 bg-white/80 p-4 rounded-lg border border-gray-200 shadow-sm"
    variants={filterVariants}
    initial="hidden"
    animate="visible"
  >
    <motion.select
      className="flex-1 border border-blue-200 rounded px-3 py-2 focus:ring-2 focus:ring-blue-200 bg-gray-50 cursor-pointer text-sm sm:text-base"
      value={selectedCategory}
      onChange={e => onCategoryChange(e.target.value)}
      variants={selectVariants}
      whileHover="hover"
      whileFocus="focus"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1, duration: 0.3 }}
    >
      <option value="">All Categories</option>
      {categories.map(cat => (
        <option key={cat} value={cat}>{cat}</option>
      ))}
    </motion.select>
    
    <motion.select
      className="flex-1 border border-blue-200 rounded px-3 py-2 focus:ring-2 focus:ring-blue-200 bg-gray-50 cursor-pointer text-sm sm:text-base"
      value={selectedLocation}
      onChange={e => onLocationChange(e.target.value)}
      variants={selectVariants}
      whileHover="hover"
      whileFocus="focus"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.3 }}
    >
      <option value="">All Locations</option>
      {locations.map(loc => (
        <option key={loc} value={loc}>{loc}</option>
      ))}
    </motion.select>
    
    <motion.select
      className="flex-1 border border-blue-200 rounded px-3 py-2 focus:ring-2 focus:ring-blue-200 bg-gray-50 cursor-pointer text-sm sm:text-base"
      value={selectedPriceRange}
      onChange={e => onPriceRangeChange(e.target.value)}
      variants={selectVariants}
      whileHover="hover"
      whileFocus="focus"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.3 }}
    >
      <option value="">All Price Ranges</option>
      {priceRanges.map(pr => (
        <option key={pr} value={pr}>{pr}</option>
      ))}
    </motion.select>
  </motion.div>
); 