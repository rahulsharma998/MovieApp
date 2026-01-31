"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useMovieStore } from "@/store/movieStore";
import { Star, Clock, Calendar, ChevronLeft, Play, Info } from "lucide-react";
import { motion } from "framer-motion";

export default function MovieDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { selectedMovie, loading, fetchMovieById } = useMovieStore();

  useEffect(() => {
    if (id) fetchMovieById(id);
  }, [id, fetchMovieById]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="text-sm font-medium opacity-50">Fetching movie details...</p>
        </div>
      </div>
    );
  }

  if (!selectedMovie) {
    return (
      <ProtectedRoute>
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-bold">Movie not found</h1>
          <button onClick={() => router.back()} className="btn btn-primary mt-4">Go Back</button>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <main className="relative min-h-screen">
        {/* Hero Backdrop */}
        <div className="absolute top-0 left-0 w-full h-[70vh] -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-base-200 via-base-200/80 to-transparent z-10" />
          <img
            src={selectedMovie.posterUrl || "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1200"}
            alt=""
            className="w-full h-full object-cover blur-3xl opacity-20 scale-110"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-10">
          <button
            onClick={() => router.back()}
            className="btn btn-ghost btn-sm gap-2 mb-8 hover:bg-primary/10 transition-colors"
          >
            <ChevronLeft size={18} />
            Back to Library
          </button>

          <div className="grid lg:grid-cols-[400px_1fr] gap-12 items-start">
            {/* Poster Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              <div className="relative glass-card rounded-[2rem] overflow-hidden shadow-2xl">
                <img
                  src={selectedMovie.posterUrl || "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=600"}
                  alt={selectedMovie.title}
                  className="w-full aspect-[2/3] object-cover"
                />
              </div>
            </motion.div>

            {/* Info Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <div className="badge badge-primary font-bold py-3 px-4">
                    <Star size={14} className="fill-current mr-1.5" />
                    {selectedMovie.rating.toFixed(1)} Rating
                  </div>
                  <div className="badge badge-outline border-base-content/20 py-3 px-4">
                    {selectedMovie.genre}
                  </div>
                </div>

                <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight">
                  {selectedMovie.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-base-content/60 font-medium">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} />
                    {selectedMovie.releaseYear}
                  </div>
                  {selectedMovie.durationMinutes && (
                    <div className="flex items-center gap-2">
                      <Clock size={18} />
                      {selectedMovie.durationMinutes} min
                    </div>
                  )}
                  {selectedMovie.director && (
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Dir. {selectedMovie.director}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <button className="btn btn-primary btn-lg shadow-xl shadow-primary/20 px-8 gap-3">
                  <Play size={20} className="fill-current" />
                  Watch Trailer
                </button>
                <button className="btn btn-ghost btn-lg border border-base-content/10 px-8 gap-3">
                  <Info size={20} />
                  More Info
                </button>
              </div>

              <div className="space-y-4 max-w-2xl">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded-full" />
                  Overview
                </h3>
                <p className="text-lg leading-relaxed text-base-content/70">
                  {selectedMovie.description}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
