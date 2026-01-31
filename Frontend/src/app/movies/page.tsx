"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import MovieCard from "@/components/MovieCard";
import { useMovieStore } from "@/store/movieStore";
import { Search, Filter, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDebounce } from "@/hooks/useDebounce";

export default function MoviesPage() {
  const {
    movies,
    loading,
    page,
    totalPages,
    search,
    genre,
    fetchMovies
  } = useMovieStore();

  const [searchTerm, setSearchTerm] = useState(search);
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    fetchMovies({ search: debouncedSearch, page: 1 });
  }, [debouncedSearch, fetchMovies]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <ProtectedRoute>
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2 relative"
        >
          <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient">
            Explore Movies
          </h1>
          <p className="text-base-content/60 max-w-2xl text-lg">
            Discover your next favorite film. Filter by genre, search by title, or just browse our curated collection.
          </p>
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 bg-base-100 border border-base-content/10 shadow-lg rounded-2xl"
        >
          <div className="relative w-full md:max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40 group-focus-within:opacity-100 group-focus-within:text-primary transition-all" size={18} />
            <input
              type="text"
              placeholder="Search movies by title..."
              className="input input-bordered input-modern w-full pl-12 h-12 focus:ring-2 focus:ring-primary/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none group">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40 group-focus-within:opacity-100 group-focus-within:text-primary transition-all" size={18} />
              <select
                className="select select-bordered pl-12 h-12 bg-base-100/50 backdrop-blur-sm w-full focus:ring-2 focus:ring-primary/20"
                value={genre}
                onChange={(e) => fetchMovies({ genre: e.target.value, page: 1 })}
              >
                <option value="">All Genres</option>
                <option>Action</option>
                <option>Drama</option>
                <option>Crime</option>
                <option>Sci-Fi</option>
                <option>Thriller</option>
                <option>Animation</option>
              </select>
            </div>

            <motion.button
              whileHover={{ scale: 1.05, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-square h-12 bg-base-100/50 backdrop-blur-sm border-base-300 hover:bg-primary hover:text-primary-content hover:border-primary transition-all"
            >
              <SlidersHorizontal size={18} />
            </motion.button>
          </div>
        </motion.div>

        <div className="min-h-[400px]">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="aspect-[2/3] bg-base-300 animate-pulse rounded-2xl" />
                  <div className="h-4 bg-base-300 animate-pulse rounded w-3/4" />
                  <div className="h-4 bg-base-300 animate-pulse rounded w-1/2 opacity-50" />
                </div>
              ))}
            </div>
          ) : movies.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center space-y-4"
            >
              <div className="p-6 bg-base-300/30 rounded-full">
                <Search size={48} className="opacity-20" />
              </div>
              <div>
                <h3 className="text-xl font-bold">No movies found</h3>
                <p className="text-base-content/50">Try adjusting your filters or search term.</p>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <AnimatePresence mode="popLayout">
                {movies.map((movie) => (
                  <MovieCard key={movie._id} movie={movie} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 pt-8">
            <button
              className="btn btn-ghost border border-base-content/10 hover:bg-primary/10 hover:text-primary gap-2"
              disabled={page <= 1 || loading}
              onClick={() => fetchMovies({ page: page - 1 })}
            >
              <ChevronLeft size={20} />
              Prev
            </button>
            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`w-10 h-10 rounded-xl font-bold transition-all ${page === i + 1
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "hover:bg-primary/10 opacity-50 hover:opacity-100"
                    }`}
                  onClick={() => fetchMovies({ page: i + 1 })}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              className="btn btn-ghost border border-base-content/10 hover:bg-primary/10 hover:text-primary gap-2"
              disabled={page >= totalPages || loading}
              onClick={() => fetchMovies({ page: page + 1 })}
            >
              Next
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </main>
    </ProtectedRoute>
  );
}
