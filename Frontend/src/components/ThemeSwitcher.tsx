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

  const themeColors: Record<string, string> = {
    light: 'bg-white border border-gray-200',
    dark: 'bg-slate-900 border border-slate-700',
  };

  const availableThemes = ["light", "dark"];

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
              className="absolute right-0 mt-2 w-80 max-h-[70vh] overflow-y-auto z-50 bg-base-100 rounded-2xl shadow-2xl border border-base-content/10 p-4"
            >
              <div className="flex items-center justify-between mb-4 sticky top-0 bg-base-100/80 backdrop-blur-sm pb-2 border-b border-base-content/10">
                <h3 className="font-bold text-sm flex items-center gap-2">
                  <Palette size={16} />
                  Choose Theme
                </h3>
                <span className="text-xs opacity-50">{availableThemes.length} themes</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {availableThemes.map((themeName) => (
                  <motion.button
                    key={themeName}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setTheme(themeName as Theme);
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
