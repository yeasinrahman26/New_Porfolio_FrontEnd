"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed font-syne   top-0 left-0 w-full z-1000 transition-all duration-300 ${
        scrolled
          ? "bg-bg/80 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent border-white/10"
      }`}
    >
      {/* MAIN CONTAINER (THIS FIXES EVERYTHING) */}
      <div className=" max-w-7xl mx-auto  px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-bold bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          {"< YRS. />"}
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-gray-400 hover:text-white transition relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-purple-500 hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Hire Me Button */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold hover:scale-105 active:scale-95 transition-all duration-300"
        >
          Hire Me
        </a>

        {/* Mobile Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1"
        >
          <span
            className={`w-6 h-0.5 bg-white transition ${
              mobileOpen ? "rotate-45 translate-y-[6px]" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition ${
              mobileOpen ? "-rotate-45 -translate-y-[6px]" : ""
            }`}
          />
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden px-6 pb-6 bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-white/10">
          <div className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-gray-400 hover:text-white transition"
              >
                {link.label}
              </a>
            ))}

            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-4 inline-flex justify-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold"
            >
              Hire Me
            </a>
          </div>
        </div>
      )}
    </motion.nav>
  );
}
