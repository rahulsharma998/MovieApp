"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ProtectedRoute from "@/components/ProtectedRoute";
import RoleGuard from "@/components/RoleGuard";
import { useMovieStore } from "@/store/movieStore";
import { Plus, Edit2, Trash2, Film, Star, TrendingUp, Users, Search, Filter, Loader2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDashboard() {
  const router = useRouter();
  const { movies, fetchMovies, deleteMovie, loading, search, genre } = useMovieStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchMovies({ page: 1, search: "", genre: "" });
  }, [fetchMovies]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    fetchMovies({ page: 1, search: value, genre: filterGenre });
  };

  const handleGenreFilter = (value: string) => {
    setFilterGenre(value);
    fetchMovies({ page: 1, search: searchQuery, genre: value });
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    setDeleteLoading(id);
    try {
      await deleteMovie(id);
      toast.success("Movie deleted successfully");
      fetchMovies({ page: 1, search: searchQuery, genre: filterGenre });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete movie");
    } finally {
      setDeleteLoading(null);
    }
  };

  const genres = ["Action", "Drama", "Crime", "Sci-Fi", "Thriller", "Animation"];
  const genreCounts = genres.reduce((acc, g) => {
    acc[g] = movies.filter(m => m.genre === g).length;
    return acc;
  }, {} as Record<string, number>);
  const popularGenre = Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  const stats = [
    { label: "Total Movies", value: movies.length, icon: Film, color: "text-blue-500" },
    { label: "Avg Rating", value: movies.length > 0 ? (movies.reduce((acc, m) => acc + m.rating, 0) / movies.length).toFixed(1) : "0.0", icon: Star, color: "text-yellow-500" },
    { label: "Popular Genre", value: popularGenre, icon: TrendingUp, color: "text-green-500" },
    { label: "Total Genres", value: new Set(movies.map(m => m.genre)).size, icon: Users, color: "text-purple-500" },
  ];

  return (
    <ProtectedRoute>
      <RoleGuard allowed={["admin"]}>

        <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-black tracking-tight">Management Dashboard</h1>
              <p className="text-base-content/50">Oversee your movie library and system analytics.</p>
            </div>
            <Link href="/admin/add" className="btn btn-primary gap-2 shadow-lg shadow-primary/20">
              <Plus size={20} />
              Add New Movie
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 rounded-2xl flex items-center gap-4"
              >
                <div className={`p-3 rounded-xl bg-base-300/50 ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium opacity-50">{stat.label}</p>
                  <p className="text-2xl font-black">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="glass-card rounded-2xl overflow-hidden border border-base-content/5">
            <div className="p-6 border-b border-base-content/5 flex justify-between items-center">
              <h3 className="font-bold text-lg">Movie Library</h3>
              <div className="flex gap-2">
                <input type="text" placeholder="Filter table..." className="input input-sm input-bordered rounded-lg" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr className="bg-base-200">
                    <th className="rounded-none">Movie Title</th>
                    <th>Genre</th>
                    <th>Release</th>
                    <th>Rating</th>
                    <th className="text-right rounded-none">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {movies.map((movie) => (
                    <tr key={movie._id} className="hover:bg-base-content/5 transition-colors">
                      <td className="font-bold text-base-content/80">{movie.title}</td>
                      <td>
                        <span className="badge badge-ghost font-medium">{movie.genre}</span>
                      </td>
                      <td className="opacity-60">{movie.releaseYear}</td>
                      <td>
                        <div className="flex items-center gap-1.5 font-bold text-primary">
                          <Star size={14} className="fill-current" />
                          {movie.rating}
                        </div>
                      </td>
                      <td className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/admin/edit/${movie._id}`}
                            className="btn btn-square btn-sm btn-ghost hover:bg-primary/20 hover:text-primary transition-all"
                          >
                            <Edit2 size={16} />
                          </Link>
                          <button
                            className="btn btn-square btn-sm btn-ghost hover:bg-error/20 hover:text-error transition-all"
                            onClick={async () => {
                              if (window.confirm("Delete this movie?")) {
                                await deleteMovie(movie._id);
                                fetchMovies();
                              }
                            }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-base-200/30 text-center text-sm opacity-50 font-medium font-mono">
              Showing {movies.length} entries
            </div>
          </div>
        </main>
      </RoleGuard>
    </ProtectedRoute>
  );
}
