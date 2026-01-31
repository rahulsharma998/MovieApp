"use client";

import { Film } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 mt-auto border-t border-base-content/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
          <Film size={18} className="text-primary" />
          <span className="font-bold text-sm">CineManage</span>
        </div>

        <p className="text-sm text-base-content/50">
          &copy; {currentYear} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
