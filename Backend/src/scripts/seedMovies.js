import mongoose from "mongoose";
import dotenv from "dotenv";
import Movie from "../models/movieModel.js";
import movies from "../data/movies.json" with { type: "json" };

dotenv.config();

const seedMovies = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(` MongoDB Connected: ${conn.connection.host}`);

    console.log(` Starting seeding process for ${movies.length} movies...`);

    let newCount = 0;
    let updateCount = 0;

    for (const movieData of movies) {
      const result = await Movie.findOneAndUpdate(
        { title: movieData.title },
        movieData,
        { upsert: true, new: true, setDefaultsOnInsert: true, includeResultMetadata: true }
      );

      if (result.lastErrorObject?.updatedExisting) {
        updateCount++;
      } else {
        newCount++;
      }
    }

    console.log(` Seeding complete!`);
    console.log(` Stats: ${newCount} added, ${updateCount} updated.`);

    process.exit(0);
  } catch (error) {
    console.error(` Seeding failed: ${error.message}`);
    process.exit(1);
  }
};


seedMovies();

