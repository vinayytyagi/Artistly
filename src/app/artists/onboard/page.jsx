"use client";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";

const categories = ["Singer", "Dancer", "Speaker", "DJ"];
const languages = ["Hindi", "English", "Tamil"];
const feeRanges = [
  "₹5,000 - ₹12,000",
  "₹8,000 - ₹15,000",
  "₹10,000 - ₹20,000",
  "₹15,000 - ₹30,000",
];

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  bio: yup.string().required("Bio is required"),
  category: yup.array().min(1, "Select at least one category"),
  languages: yup.array().min(1, "Select at least one language"),
  feeRange: yup.string().required("Fee range is required"),
  location: yup.string().required("Location is required"),
  image: yup.mixed().notRequired(),
});

const formVariants = {
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

const fieldVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

const successVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.02,
    boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3)",
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  tap: {
    scale: 0.98,
  },
};

export default function OnboardPage() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      bio: "",
      category: [],
      languages: [],
      feeRange: "",
      location: "",
      image: null,
    },
  });

  const onSubmit = (data) => {
    setSubmitted(true);
    console.log("Artist Onboarded:", data);
  };

  return (
    <PageTransition>
      <div className="max-w-lg mx-auto mt-4 sm:mt-8 bg-white/90 px-4 sm:px-0">
        <motion.div 
          className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-lg"
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-blue-700 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Artist Onboarding
          </motion.h1>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
            <motion.div
              variants={fieldVariants}
              custom={0}
              initial="hidden"
              animate="visible"
            >
              <label className="block font-medium mb-1 text-gray-700 text-sm sm:text-base">Name</label>
              <input 
                {...register("name")}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all text-sm sm:text-base" 
              />
              <AnimatePresence>
                {errors.name && (
                  <motion.p 
                    className="text-blue-600 text-xs sm:text-sm mt-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {errors.name.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              variants={fieldVariants}
              custom={1}
              initial="hidden"
              animate="visible"
            >
              <label className="block font-medium mb-1 text-gray-700 text-sm sm:text-base">Bio</label>
              <textarea 
                {...register("bio")}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all text-sm sm:text-base" 
                rows="3"
              />
              <AnimatePresence>
                {errors.bio && (
                  <motion.p 
                    className="text-blue-600 text-xs sm:text-sm mt-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {errors.bio.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              variants={fieldVariants}
              custom={2}
              initial="hidden"
              animate="visible"
            >
              <label className="block font-medium mb-1 text-gray-700 text-sm sm:text-base">Category</label>
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <div className="flex flex-wrap gap-2 sm:gap-3 mt-1">
                    {categories.map((cat, index) => (
                      <motion.label 
                        key={cat} 
                        className="flex items-center gap-2 text-gray-600 cursor-pointer text-sm sm:text-base"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.1 }}
                      >
                        <input
                          type="checkbox"
                          value={cat}
                          checked={field.value.includes(cat)}
                          onChange={e => {
                            if (e.target.checked) {
                              field.onChange([...field.value, cat]);
                            } else {
                              field.onChange(field.value.filter((v) => v !== cat));
                            }
                          }}
                          className="accent-blue-600"
                        />
                        {cat}
                      </motion.label>
                    ))}
                  </div>
                )}
              />
              <AnimatePresence>
                {errors.category && (
                  <motion.p 
                    className="text-blue-600 text-xs sm:text-sm mt-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {errors.category.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              variants={fieldVariants}
              custom={3}
              initial="hidden"
              animate="visible"
            >
              <label className="block font-medium mb-1 text-gray-700 text-sm sm:text-base">Languages Spoken</label>
              <Controller
                control={control}
                name="languages"
                render={({ field }) => (
                  <div className="flex flex-wrap gap-2 sm:gap-3 mt-1">
                    {languages.map((lang, index) => (
                      <motion.label 
                        key={lang} 
                        className="flex items-center gap-2 text-gray-600 cursor-pointer text-sm sm:text-base"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.1 }}
                      >
                        <input
                          type="checkbox"
                          value={lang}
                          checked={field.value.includes(lang)}
                          onChange={e => {
                            if (e.target.checked) {
                              field.onChange([...field.value, lang]);
                            } else {
                              field.onChange(field.value.filter((v) => v !== lang));
                            }
                          }}
                          className="accent-blue-600"
                        />
                        {lang}
                      </motion.label>
                    ))}
                  </div>
                )}
              />
              <AnimatePresence>
                {errors.languages && (
                  <motion.p 
                    className="text-blue-600 text-xs sm:text-sm mt-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {errors.languages.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              variants={fieldVariants}
              custom={4}
              initial="hidden"
              animate="visible"
            >
              <label className="block font-medium mb-1 text-gray-700 text-sm sm:text-base">Fee Range</label>
              <select 
                {...register("feeRange")} 
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all text-sm sm:text-base"
              >
                <option value="">Select Fee Range</option>
                {feeRanges.map(fee => (
                  <option key={fee} value={fee}>{fee}</option>
                ))}
              </select>
              <AnimatePresence>
                {errors.feeRange && (
                  <motion.p 
                    className="text-blue-600 text-xs sm:text-sm mt-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {errors.feeRange.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              variants={fieldVariants}
              custom={5}
              initial="hidden"
              animate="visible"
            >
              <label className="block font-medium mb-1 text-gray-700 text-sm sm:text-base">Profile Image (optional)</label>
              <input 
                type="file" 
                {...register("image")} 
                className="w-full mt-1 cursor-pointer text-sm sm:text-base" 
              />
            </motion.div>

            <motion.div
              variants={fieldVariants}
              custom={6}
              initial="hidden"
              animate="visible"
            >
              <label className="block font-medium mb-1 text-gray-700 text-sm sm:text-base">Location</label>
              <input 
                {...register("location")} 
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all text-sm sm:text-base" 
              />
              <AnimatePresence>
                {errors.location && (
                  <motion.p 
                    className="text-blue-600 text-xs sm:text-sm mt-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {errors.location.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.button 
              type="submit" 
              className="w-full py-3 bg-blue-600 text-white rounded font-semibold transition mt-2 text-sm sm:text-base"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              Submit
            </motion.button>

            <AnimatePresence>
              {submitted && (
                <motion.p 
                  className="text-green-600 font-medium mt-2 text-center text-sm sm:text-base"
                  variants={successVariants}
                  initial="hidden"
                  animate="visible"
                >
                  Artist submitted! (Check console)
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </PageTransition>
  );
} 