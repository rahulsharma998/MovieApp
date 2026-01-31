"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Film, ArrowRight, Play, Clapperboard } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-base-200">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-secondary/20 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <main className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 text-primary text-sm font-bold uppercase tracking-widest">
            <Clapperboard size={16} />
            The Future of Movie Management
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
            Organize Your <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Cinematic
            </span> <br />
            World.
          </h1>

          <p className="text-xl text-base-content/60 max-w-lg leading-relaxed font-medium">
            A premium, professional-grade platform to manage, discover, and organize your vast movie library with ease and elegance.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/movies" className="btn btn-premium btn-lg h-16 px-10 rounded-2xl gap-3">
              Browse Movies
              <ArrowRight size={20} />
            </Link>
            <Link href="/login" className="btn btn-ghost btn-lg h-16 px-10 rounded-2xl border border-base-content/10 hover:bg-base-content/5 gap-3">
              <Play size={20} className="fill-current" />
              Sign In
            </Link>
          </div>

          <div className="flex items-center gap-8 pt-8 opacity-40 grayscale group-hover:grayscale-0 transition-all">
            <span className="font-black text-2xl tracking-tighter">NETFLIX</span>
            <span className="font-black text-2xl tracking-tighter">CINEAM</span>
            <span className="font-black text-2xl tracking-tighter">HOLLYWOOD</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative hidden lg:block"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-[3rem] blur-3xl opacity-20 animate-pulse" />
          <div className="relative glass-card rounded-[3rem] p-4 overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=800"
              alt="Cinema experience"
              className="rounded-[2.5rem] w-full h-[600px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-12">
              <div className="badge badge-primary font-bold mb-4">Featured Collection</div>
              <h3 className="text-3xl font-black text-white">Curated by Professionals</h3>
              <p className="text-white/60 font-medium">Everything you need for a perfect night.</p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
