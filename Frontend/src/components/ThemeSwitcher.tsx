"use client";

import { useThemeStore, DAISYUI_THEMES, Theme } from "@/store/themeStore";
import { Palette, Check, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Apply theme on mount
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-xl bg-base-300 animate-pulse" />
    );
  }

  const themeColors: Record<Theme, string> = {
    light: 'bg-gradient-to-br from-white to-gray-200',
    dark: 'bg-gradient-to-br from-slate-900 to-slate-700',
    cupcake: 'bg-gradient-to-br from-pink-200 to-purple-200',
    bumblebee: 'bg-gradient-to-br from-yellow-300 to-orange-400',
    emerald: 'bg-gradient-to-br from-emerald-400 to-teal-500',
    corporate: 'bg-gradient-to-br from-blue-600 to-indigo-700',
    synthwave: 'bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500',
    retro: 'bg-gradient-to-br from-red-400 to-yellow-300',
    cyberpunk: 'bg-gradient-to-br from-yellow-300 via-pink-500 to-purple-600',
    valentine: 'bg-gradient-to-br from-pink-300 to-rose-400',
    halloween: 'bg-gradient-to-br from-orange-500 to-purple-700',
    garden: 'bg-gradient-to-br from-green-400 to-lime-500',
    forest: 'bg-gradient-to-br from-green-700 to-emerald-900',
    aqua: 'bg-gradient-to-br from-cyan-300 to-blue-400',
    lofi: 'bg-gradient-to-br from-gray-400 to-gray-600',
    pastel: 'bg-gradient-to-br from-purple-200 to-pink-200',
    fantasy: 'bg-gradient-to-br from-purple-400 to-pink-500',
    wireframe: 'bg-gradient-to-br from-white to-gray-300',
    black: 'bg-gradient-to-br from-black to-gray-800',
    luxury: 'bg-gradient-to-br from-amber-600 to-yellow-700',
    dracula: 'bg-gradient-to-br from-purple-900 to-pink-800',
    cmyk: 'bg-gradient-to-br from-cyan-400 via-magenta-400 to-yellow-400',
    autumn: 'bg-gradient-to-br from-red-600 to-orange-700',
    business: 'bg-gradient-to-br from-blue-800 to-slate-900',
    acid: 'bg-gradient-to-br from-lime-400 to-pink-500',
    lemonade: 'bg-gradient-to-br from-yellow-200 to-lime-300',
    night: 'bg-gradient-to-br from-blue-900 to-indigo-950',
    coffee: 'bg-gradient-to-br from-amber-800 to-brown-900',
    winter: 'bg-gradient-to-br from-blue-100 to-cyan-200',
    dim: 'bg-gradient-to-br from-slate-700 to-slate-900',
    nord: 'bg-gradient-to-br from-slate-600 to-blue-800',
    sunset: 'bg-gradient-to-br from-orange-400 to-pink-500',
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-ghost btn-circle h-10 w-10 relative overflow-hidden group"
        aria-label="Change theme"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        <Palette size={20} className="relative z-10" />
        <Sparkles size={12} className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />

            {/* Theme Dropdown */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-80 max-h-[70vh] overflow-y-auto z-50 glass-card rounded-2xl shadow-2xl border border-base-content/10 p-4"
            >
              <div className="flex items-center justify-between mb-4 sticky top-0 bg-base-100/80 backdrop-blur-sm pb-2 border-b border-base-content/10">
                <h3 className="font-bold text-sm flex items-center gap-2">
                  <Palette size={16} />
                  Choose Theme
                </h3>
                <span className="text-xs opacity-50">{DAISYUI_THEMES.length} themes</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {DAISYUI_THEMES.map((themeName) => (
                  <motion.button
                    key={themeName}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setTheme(themeName);
                      setIsOpen(false);
                    }}
                    className={`relative p-3 rounded-xl border-2 transition-all group ${theme === themeName
                        ? 'border-primary shadow-lg shadow-primary/20'
                        : 'border-base-content/10 hover:border-primary/50'
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg ${themeColors[themeName]} shadow-sm`} />
                      <div className="flex-1 text-left">
                        <p className="text-xs font-semibold capitalize truncate">
                          {themeName}
                        </p>
                      </div>
                      {theme === themeName && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1 bg-primary text-primary-content rounded-full p-1"
                        >
                          <Check size={12} />
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
