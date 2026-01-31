"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import ProtectedRoute from "@/components/ProtectedRoute";
import RoleGuard from "@/components/RoleGuard";
import { useMovieStore } from "@/store/movieStore";
import { ChevronLeft, Save, Film, Image as ImageIcon, Star, Calendar, AlignLeft, Tag, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function EditMoviePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { updateMovie, fetchMovieById, selectedMovie, loading } = useMovieStore();

  const [form, setForm] = useState({
    title: "",
    genre: "",
    releaseYear: "",
    rating: "",
    description: "",
    posterUrl: ""
  });

  useEffect(() => {
    if (id) fetchMovieById(id);
  }, [id, fetchMovieById]);

  useEffect(() => {
    if (selectedMovie) {
      setForm({
        title: selectedMovie.title || "",
        genre: selectedMovie.genre || "",
        releaseYear: selectedMovie.releaseYear?.toString() || "",
        rating: selectedMovie.rating?.toString() || "",
        description: selectedMovie.description || "",
        posterUrl: selectedMovie.posterUrl || ""
      });
    }
  }, [selectedMovie]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateMovie(id, {
        ...form,
        releaseYear: Number(form.releaseYear),
        rating: Number(form.rating)
      });
      toast.success("Movie updated successfully");
      router.push("/admin/dashboard");
    } catch {
      toast.error("Failed to update movie");
    }
  };

  const inputs = [
    { name: "title", label: "Movie Title", icon: Film, placeholder: "e.g. Inception" },
    { name: "genre", label: "Genre", icon: Tag, placeholder: "e.g. Sci-Fi", type: "select", options: ["Action", "Drama", "Crime", "Sci-Fi", "Thriller", "Animation"] },
    { name: "releaseYear", label: "Release Year", icon: Calendar, placeholder: "2010", type: "number" },
    { name: "rating", label: "Rating (0-10)", icon: Star, placeholder: "8.8", type: "number" },
    { name: "posterUrl", label: "Poster Image URL", icon: ImageIcon, placeholder: "https://..." },
    { name: "description", label: "Description", icon: AlignLeft, placeholder: "Brief plot summary...", type: "textarea" },
  ];

  return (
    <ProtectedRoute>
      <RoleGuard allowed={["admin"]}>

        <main className="max-w-3xl mx-auto px-6 py-10">
          <button
            onClick={() => router.back()}
            className="btn btn-ghost btn-sm gap-2 mb-6 opacity-50 hover:opacity-100"
          >
            <ChevronLeft size={18} />
            Back to Dashboard
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-[2rem] p-8 md:p-12 shadow-2xl"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="p-4 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20">
                <Save size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-black">Edit Movie</h1>
                <p className="opacity-50">Modify existing details of the film.</p>
              </div>
            </div>

            {loading && !selectedMovie ? (
              <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-primary" size={48} />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                {inputs.map((input) => (
                  <div key={input.name} className={`form-control w-full ${input.type === 'textarea' ? 'md:col-span-2' : ''}`}>
                    <label className="label">
                      <span className="label-text font-bold flex items-center gap-2">
                        <input.icon size={16} className="text-primary" />
                        {input.label}
                      </span>
                    </label>

                    {input.type === "textarea" ? (
                      <textarea
                        name={input.name}
                        placeholder={input.placeholder}
                        className="textarea textarea-bordered h-32 rounded-xl focus:border-primary transition-all bg-base-100/50"
                        value={(form as any)[input.name]}
                        onChange={handleChange}
                        required
                      />
                    ) : input.type === "select" ? (
                      <select
                        name={input.name}
                        className="select select-bordered rounded-xl focus:border-primary transition-all bg-base-100/50"
                        value={(form as any)[input.name]}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Genre</option>
                        {input.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    ) : (
                      <input
                        type={input.type || "text"}
                        name={input.name}
                        placeholder={input.placeholder}
                        className="input input-bordered rounded-xl focus:border-primary transition-all bg-base-100/50"
                        value={(form as any)[input.name]}
                        onChange={handleChange}
                        required
                        step={input.name === "rating" ? "0.1" : "1"}
                      />
                    )}
                  </div>
                ))}

                <div className="md:col-span-2 pt-6">
                  <button
                    className="btn btn-primary w-full h-14 rounded-xl text-lg gap-2 shadow-xl shadow-primary/20"
                    disabled={loading}
                  >
                    {loading ? <span className="loading loading-spinner" /> : <Save size={20} />}
                    Update Movie Details
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </main>
      </RoleGuard>
    </ProtectedRoute>
  );
}
