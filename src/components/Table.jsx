"use client";
import React from "react";
import { motion } from "framer-motion";

const tableVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  hover: {
    backgroundColor: "rgba(59, 130, 246, 0.05)",
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const Table = ({ columns, data }) => (
  <motion.table 
    className="min-w-full bg-white rounded shadow text-xs sm:text-sm lg:text-base"
    variants={tableVariants}
    initial="hidden"
    animate="visible"
  >
    <thead>
      <motion.tr variants={headerVariants}>
        {columns.map((col) => (
          <motion.th 
            key={col.accessor} 
            className="px-2 sm:px-4 py-2 sm:py-3 text-left bg-gray-50 font-semibold text-gray-700 whitespace-nowrap"
            whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
            transition={{ duration: 0.2 }}
          >
            {col.label}
          </motion.th>
        ))}
      </motion.tr>
    </thead>
    <tbody>
      {data.map((row, i) => (
        <motion.tr 
          key={i} 
          className="border-t border-gray-100"
          variants={rowVariants}
          whileHover="hover"
          initial="hidden"
          animate="visible"
        >
          {columns.map((col) => (
            <motion.td 
              key={col.accessor} 
              className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.1 }}
            >
              <div className="truncate max-w-[120px] sm:max-w-[200px] lg:max-w-none">
                {col.render ? col.render(row[col.accessor], row) : row[col.accessor]}
              </div>
            </motion.td>
          ))}
        </motion.tr>
      ))}
    </tbody>
  </motion.table>
); 