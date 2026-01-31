import Movie from "../models/movieModel.js";

export const getAllMovies = async (req, res) => {
  try {
    const { search, genre, sortBy = "createdAt", order = "desc", page = 1, limit = 10 } = req.query;
    const query = {};

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    if (genre) {
      query.genre = genre;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const movies= await Movie.find(query).sort({[sortBy]:order==="asc"? 1 : -1 }).skip(skip).limit(Number(limit))

    const total = await Movie.countDocuments(query);

    res.json({
      success: true,
      data: movies,
      meta: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch movies" });
  }
};

export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ success: false, message: "Movie not found" });
    }
    res.json({ success: true, data: movie });
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid movie ID" });
  }
};

export const createMovie = async (req, res) => {
  try {
    const { title, genre, releaseYear, rating, description } = req.body;

    if (!title || !genre || !releaseYear || !rating || !description) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: title, genre, releaseYear, rating, description"
      });
    }

    const movie = await Movie.create({ ...req.body, createdBy: req.user.userId });
    res.status(201).json({ success: true, data: movie });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message || "Failed to create movie" });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!movie) {
      return res.status(404).json({ success: false, message: "Movie not found" });
    }
    res.json({ success: true, data: movie });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message || "Failed to update movie" });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) {
      return res.status(404).json({ success: false, message: "Movie not found" });
    }
    res.json({ success: true, message: "Movie deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to delete movie" });
  }
};

