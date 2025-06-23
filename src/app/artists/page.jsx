"use client";
import { useEffect, useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArtistCard } from "@/components/ArtistCard";
import { FilterBlock } from "@/components/FilterBlock";
import { PageTransition } from "@/components/PageTransition";
import { useSearchParams } from "next/navigation";

async function fetchArtists() {
  const res = await fetch("/data/artists.json");
  return res.json();
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

function ArtistsContent() {
  const [artists, setArtists] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    fetchArtists().then(data => {
      setArtists(data);
      setFiltered(data);
    });
  }, []);

  // Handle URL parameters for category filtering
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setCategory(categoryParam);
    }
  }, [searchParams]);

  useEffect(() => {
    let result = artists;
    if (category) result = result.filter(a => a.category.includes(category));
    if (location) result = result.filter(a => a.location === location);
    if (priceRange) result = result.filter(a => a.priceRange === priceRange);
    setFiltered(result);
  }, [artists, category, location, priceRange]);

  const categories = Array.from(new Set(artists.flatMap(a => a.category)));
  const locations = Array.from(new Set(artists.map(a => a.location)));
  const priceRanges = Array.from(new Set(artists.map(a => a.priceRange)));

  return (
    <div className="px-4 sm:px-6">
      <motion.h1 
        className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Browse Artists
        {category && (
          <span className="text-blue-600 text-lg sm:text-xl ml-2">
            - {category}
          </span>
        )}
      </motion.h1>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <FilterBlock
          categories={categories}
          locations={locations}
          priceRanges={priceRanges}
          selectedCategory={category}
          selectedLocation={location}
          selectedPriceRange={priceRange}
          onCategoryChange={setCategory}
          onLocationChange={setLocation}
          onPriceRangeChange={setPriceRange}
        />
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            filtered.map((artist, index) => (
              <motion.div
                key={artist.id}
                variants={itemVariants}
                layout
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <ArtistCard {...artist} />
              </motion.div>
            ))
          ) : (
            <motion.div
              className="col-span-full text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-gray-500 text-lg">
                No artists found for the selected filters.
              </div>
              <button
                onClick={() => {
                  setCategory("");
                  setLocation("");
                  setPriceRange("");
                }}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function ArtistsPage() {
  return (
    <PageTransition>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg">Loading...</div>
        </div>
      }>
        <ArtistsContent />
      </Suspense>
    </PageTransition>
  );
} 