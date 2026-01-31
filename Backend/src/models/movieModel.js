import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    genre: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    rating: { type: Number, min: 0, max: 10, required: true },
    description: { type: String, required: true },
    posterUrl: { type: String },
    director: { type: String },
    durationMinutes: { type: Number },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
)
export default mongoose.model("Movie", movieSchema);