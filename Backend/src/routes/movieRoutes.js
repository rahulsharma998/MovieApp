import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie } from "../controllers/movieController.js";

const router = express.Router();

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Get all movies
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by title
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *         description: Filter by genre
 *     responses:
 *       200:
 *         description: List of movies
 */
router.get("/", authMiddleware, getAllMovies);

/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     summary: Get movie by ID
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie details
 *       404:
 *         description: Movie not found
 */
router.get("/:id", authMiddleware, getMovieById);

/**
 * @swagger
 * /api/movies:
 *   post:
 *     summary: Create a new movie (Admin only)
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       201:
 *         description: Movie created
 *       403:
 *         description: Forbidden
 */
router.post("/", authMiddleware, authorizeRoles("admin"), createMovie);

/**
 * @swagger
 * /api/movies/{id}:
 *   put:
 *     summary: Update a movie (Admin only)
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: Movie updated
 *       404:
 *         description: Movie not found
 */
router.put("/:id", authMiddleware, authorizeRoles("admin"), updateMovie);

/**
 * @swagger
 * /api/movies/{id}:
 *   delete:
 *     summary: Delete a movie (Admin only)
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie deleted
 *       404:
 *         description: Movie not found
 */
router.delete("/:id", authMiddleware, authorizeRoles("admin"), deleteMovie);

export default router;
