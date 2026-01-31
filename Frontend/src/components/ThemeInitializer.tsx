"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/store/themeStore";

export default function ThemeInitializer() {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return null;
}
