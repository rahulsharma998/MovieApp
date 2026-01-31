import { create } from "zustand";
import api from "@/services/api";

export interface Movie {
  _id: string;
  title: string;
  genre: string;
  releaseYear: number;
  rating: number;
  description: string;
  posterUrl?: string;
  director?: string;
  durationMinutes?: number;
}

interface MovieState {
  movies: Movie[];
  selectedMovie: Movie | null;
  loading: boolean;
  page: number;
  totalPages: number;
  search: string;
  genre: string;
  fetchMovies: (params?: Partial<MovieState>) => Promise<void>;
  fetchMovieById: (id: string) => Promise<void>;
  createMovie: (data: Partial<Movie>) => Promise<void>;
  updateMovie: (id: string, data: Partial<Movie>) => Promise<void>;
  deleteMovie: (id: string) => Promise<void>;
}


export const useMovieStore = create<MovieState>((set, get) => ({
  movies: [],
  loading: false,
  page: 1,
  totalPages: 1,
  search: "",
  genre: "",
  selectedMovie: null,

  fetchMovies: async (params = {}) => {
    set({ loading: true, ...params });

    const { page, search, genre } = { ...get(), ...params };

    try {
      const res = await api.get("/api/movies", {
        params: {
          page,
          search,
          genre,
          limit: 8
        }
      });

      set({
        movies: res.data.data || res.data.movies || [],
        totalPages: res.data.meta?.pages || res.data.totalPages || 1,
        loading: false
      });
    } catch (error: any) {
      console.error("Error fetching movies:", error);
      set({ loading: false, movies: [] });
    }
  },
  fetchMovieById: async (id: string) => {
    set({ loading: true, selectedMovie: null });

    try {
      const res = await api.get(`/api/movies/${id}`);
      set({ selectedMovie: res.data.data || res.data, loading: false });
    } catch {
      set({ loading: false });
    }
  },
  createMovie: async (data) => {
    set({ loading: true });
    try {
      await api.post("/api/movies", data);
      set({ loading: false });
    } catch (error: any) {
      set({ loading: false });
      throw error;
    }
  },

  updateMovie: async (id, data) => {
    set({ loading: true });
    try {
      await api.put(`/api/movies/${id}`, data);
      set({ loading: false });
    } catch (error: any) {
      set({ loading: false });
      throw error;
    }
  },

  deleteMovie: async (id) => {
    set({ loading: true });
    try {
      await api.delete(`/api/movies/${id}`);
      set({ loading: false });
    } catch (error: any) {
      set({ loading: false });
      throw error;
    }
  }
}));
