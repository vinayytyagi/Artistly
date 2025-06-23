"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Table } from "@/components/Table";
import { PageTransition } from "@/components/PageTransition";

async function fetchArtists() {
  const res = await fetch("/data/artists.json");
  return res.json();
}

const dashboardVariants = {
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

const tableVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3,
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  tap: {
    scale: 0.95,
  },
};

export default function DashboardPage() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    fetchArtists().then(setArtists);
  }, []);

  const columns = [
    { label: "Name", accessor: "name" },
    { label: "Category", accessor: "category", render: (val, row) => val.join(", ") },
    { label: "City", accessor: "location" },
    { label: "Fee", accessor: "priceRange" },
    {
      label: "Action",
      accessor: "action",
      render: (_val, row) => (
        <motion.button 
          className="px-2 sm:px-3 py-1 bg-blue-600 text-white rounded transition text-xs sm:text-sm"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          View
        </motion.button>
      ),
    },
  ];

  return (
    <PageTransition>
      <div className="px-4 sm:px-6">
        <motion.div
          variants={dashboardVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Manager Dashboard
          </motion.h1>
          
          <motion.div 
            className="overflow-x-auto -mx-4 sm:mx-0"
            variants={tableVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="min-w-full px-4 sm:px-0">
              <Table columns={columns} data={artists} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
} 