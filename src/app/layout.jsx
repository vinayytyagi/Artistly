"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const linkVariants = {
  hover: {
    y: -2,
    color: "#1d4ed8",
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

const logoVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

const mobileMenuVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const menuItemVariants = {
  closed: { opacity: 0, x: -20 },
  open: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
      ease: "easeOut",
    },
  }),
};

const hamburgerVariants = {
  closed: { rotate: 0 },
  open: { rotate: 180 },
};

export default function RootLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/artists", label: "Artists" },
    { href: "/artists/onboard", label: "Onboard" },
    { href: "/artists/dashboard", label: "Dashboard" },
  ];

  return (
    <html lang="en">
      <head>
        <title>Artistly.com</title>
        <meta name="description" content="Performing Artist Booking Platform" />
      </head>
      <body className="bg-white/90 min-h-screen">
        <motion.header 
          className="bg-white/90 sticky top-0 z-20 border-b border-gray-200 shadow-sm mb-8 backdrop-blur"
          variants={navVariants}
          initial="hidden"
          animate="visible"
        >
          <nav className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <motion.div 
                className="text-xl sm:text-2xl font-bold text-blue-700 tracking-tight cursor-pointer"
                variants={logoVariants}
                whileHover="hover"
              >
                Artistly
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex space-x-6">
                {navLinks.map((link) => (
                  <motion.div key={link.href} variants={linkVariants} whileHover="hover">
                    <Link href={link.href} className="text-gray-700 font-medium transition">
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Tablet Navigation - Reduced spacing */}
              <div className="hidden md:flex lg:hidden space-x-4">
                {navLinks.map((link) => (
                  <motion.div key={link.href} variants={linkVariants} whileHover="hover">
                    <Link href={link.href} className="text-gray-700 font-medium transition text-sm">
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-700 hover:bg-gray-100 transition-colors"
                onClick={toggleMobileMenu}
                variants={hamburgerVariants}
                animate={isMobileMenuOpen ? "open" : "closed"}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </motion.button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  className="lg:hidden mt-4 pb-4 border-t border-gray-200"
                  variants={mobileMenuVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  <div className="flex flex-col space-y-3 pt-4">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.href}
                        custom={index}
                        variants={menuItemVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                      >
                        <Link
                          href={link.href}
                          className="block text-gray-700 font-medium py-2 px-3 rounded-md hover:text-blue-700 hover:bg-blue-50 transition-colors"
                          onClick={closeMobileMenu}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </motion.header>
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 pb-10">{children}</main>
      </body>
    </html>
  );
}
