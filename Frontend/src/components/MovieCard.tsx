"use client";

import Link from "next/link";
import { Movie } from "@/store/movieStore";
import { motion } from "framer-motion";
import { Star, Calendar, Clapperboard, Play, Heart, Share2 } from "lucide-react";
import { useState } from "react";

export default function MovieCard({ movie }: { movie: Movie }) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link
        href={`/movies/${movie._id}`}
        className="relative block bg-base-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-base-content/5"
      >
        <div className="aspect-[2/3] overflow-hidden relative">
          <img
            src={movie.posterUrl || "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=500"}
            alt={movie.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 gap-3">
            {/* Quick Actions */}
            <div className="flex gap-2 mb-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.preventDefault();
                  setIsLiked(!isLiked);
                }}
                className={`btn btn-circle btn-sm ${isLiked ? 'btn-error' : 'btn-ghost bg-white/20'} backdrop-blur-sm border-none`}
              >
                <Heart size={16} className={isLiked ? 'fill-current' : ''} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => e.preventDefault()}
                className="btn btn-circle btn-sm btn-ghost bg-white/20 backdrop-blur-sm border-none"
              >
                <Share2 size={16} />
              </motion.button>
            </div>

            {/* View Details Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-primary btn-sm w-full gap-2 shadow-lg"
            >
              <Play size={16} className="fill-current" />
              View Details
            </motion.button>
          </div>

          {/* Rating Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
            className="absolute top-3 right-3"
          >
            <div className="badge badge-primary gap-1.5 py-3 px-3 shadow-lg font-bold border-none backdrop-blur-sm">
              <Star size={14} className="fill-current" />
              {movie.rating.toFixed(1)}
            </div>
          </motion.div>

          {/* Genre Badge */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute top-3 left-3"
          >
            <div className="badge badge-secondary badge-sm py-2.5 px-3 font-semibold shadow-md backdrop-blur-sm">
              {movie.genre}
            </div>
          </motion.div>
        </div>

        <div className="p-4 space-y-2">
          <h3 className="font-bold text-lg leading-tight line-clamp-1 group-hover:text-primary transition-colors">
            {movie.title}
          </h3>
          <div className="flex items-center justify-between text-xs font-medium opacity-60">
            <span className="flex items-center gap-1.5">
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-primary"
              />
              {movie.genre}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {movie.releaseYear}
            </span>
          </div>

          {/* Progress Bar Animation */}
          <div className="pt-2">
            <div className="h-1 bg-base-300 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(movie.rating / 10) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary to-secondary"
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
