"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { useRouter } from "next/navigation";

const categories = [
  { name: "Singers", image: "/images/singer.jpg", category: "Singer" },
  { name: "Dancers", image: "/images/dancer.jpg", category: "Dancer" },
  { name: "Speakers", image: "/images/speaker.jpg", category: "Speaker" },
  { name: "DJs", image: "/images/dj.jpg", category: "DJ" },
];

const heroVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  tap: {
    scale: 0.95,
  },
};

export default function HomePage() {
  const router = useRouter();

  const handleCategoryClick = (category) => {
    // Navigate to artists page with category filter
    router.push(`/artists?category=${encodeURIComponent(category)}`);
  };

  return (
    <PageTransition>
      <div className="flex flex-col items-center text-center bg-white/90">
        <motion.section 
          className="py-8 sm:py-12 px-4 sm:px-6"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-blue-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Welcome to Artistly.com
          </motion.h1>
          <motion.p 
            className="mb-6 text-base sm:text-lg max-w-xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Artistly.com is the platform for Event Planners and Artist Managers to connect, discover, and book top performing artists for any event. Browse artists, shortlist your preferences, and raise booking requests easily!
          </motion.p>
          <motion.div
            variants={buttonVariants}
            // whileHover="hover"
            whileTap="tap"
          >
            <Link href="/artists">
              <button className="px-6 py-3 bg-blue-600 text-white cursor-pointer rounded-lg font-semibold transition shadow text-base sm:text-lg">
                Explore Artists
              </button>
            </Link>
          </motion.div>
        </motion.section>
        
        <motion.section 
          className="w-full max-w-6xl px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-10"
          initial="hidden"
          animate="visible"
        >
          {categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              className="bg-white hover:bg-blue-50 rounded-lg shadow p-4 sm:p-6 flex flex-col items-center transition-colors border border-gray-200 cursor-pointer"
              variants={categoryVariants}
              custom={index}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.2 },
              }}
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.1 },
              }}
              onClick={() => handleCategoryClick(cat.category)}
            >
              <motion.img
                src={cat.image}
                alt={cat.name}
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full mb-3 border-2 border-blue-100"
                width={80}
                height={80}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              />
              <h3 className="text-sm sm:text-lg font-semibold text-blue-700">{cat.name}</h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">Click to explore</p>
            </motion.div>
          ))}
        </motion.section>
      </div>
    </PageTransition>
  );
}
