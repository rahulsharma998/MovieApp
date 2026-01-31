"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Film, LayoutDashboard, LogOut, User as UserIcon, PlusCircle, Search } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";
import { motion } from "framer-motion";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return null;

  const isActive = (path: string) => pathname === path;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 px-4 py-3"
    >
      <div className="mx-auto max-w-7xl glass-nav rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between shadow-lg hover:shadow-xl transition-all border border-base-content/5">
        <div className="flex items-center gap-8">
          <Link href="/movies" className="flex items-center gap-3 group">
            <div className="p-2.5 bg-primary rounded-xl text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
              <Film size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-base-content to-base-content/60 hidden sm:block">
              CineManage
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/movies"
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${isActive("/movies")
                ? "bg-primary/10 text-primary"
                : "hover:bg-base-content/5 text-base-content/70 hover:text-base-content"
                }`}
            >
              <Search size={16} />
              Browse & Filter
            </Link>
            {user?.role === "admin" && (
              <Link
                href="/admin/dashboard"
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${isActive("/admin/dashboard")
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-base-content/5 text-base-content/70 hover:text-base-content"
                  }`}
              >
                <LayoutDashboard size={16} />
                Admin Panel
              </Link>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <div className="flex flex-col items-end hidden md:flex leading-tight">
            <span className="text-sm font-bold">{user?.name}</span>
            <span className="text-[10px] uppercase tracking-wider opacity-50 font-semibold">{user?.role}</span>
          </div>

          <div className="h-8 w-[1px] bg-base-content/10 hidden md:block"></div>

          <ThemeSwitcher />

          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar placeholder hover:bg-base-content/10 transition-colors">
              <div className="bg-neutral text-neutral-content rounded-xl w-10 ring ring-base-content/5 ring-offset-2 ring-offset-base-100 flex items-center justify-center">
                <UserIcon size={20} />
              </div>
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-2xl bg-base-100 rounded-2xl w-60 mt-4 border border-base-content/10">
              <li className="menu-title px-4 py-2 text-xs uppercase opacity-50 font-bold tracking-wider">Account Settings</li>
              {user?.role === "admin" && (
                <div className="px-2 mb-2">
                  <Link href="/admin/add" className="btn btn-primary btn-sm w-full gap-2 shadow-md">
                    <PlusCircle size={16} />
                    Add New Movie
                  </Link>
                </div>
              )}
              <li>
                <Link href="/movies" className="py-3 font-medium">
                  Browse Library
                </Link>
              </li>
              <div className="divider my-0"></div>
              <li>
                <button
                  onClick={() => {
                    logout();
                    router.push("/login");
                  }}
                  className="flex items-center gap-2 py-3 text-error hover:bg-error/10 font-medium"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
