import express from "express";
import {
  addMovie,
  getAllMovies,
  getMovieById,
} from "../controllers/movie-controller";
import { body, param } from "express-validator"; // For validation

const movieRouter = express.Router();

// Middleware to validate input for adding a movie
const validateAddMovie = [
  body("title").notEmpty().withMessage("Title is required."),
  body("description").notEmpty().withMessage("Description is required."),
  body("releaseDate")
    .isISO8601()
    .withMessage("Release date must be a valid date."),
  body("posterUrl").notEmpty().withMessage("Poster URL is required."),
  body("featured")
    .isBoolean()
    .optional()
    .withMessage("Featured must be a boolean value."),
  body("actors")
    .isArray()
    .withMessage("Actors must be an array of strings.")
    .custom((value) => {
      // Check if all elements in the array are strings
      if (!value.every((actor) => typeof actor === "string")) {
        throw new Error("All actors must be strings.");
      }
      return true; // Indicate success
    }),
];

// Route to get all movies
movieRouter.get("/", getAllMovies); // Fetch all movies

// Route to get a movie by ID
movieRouter.get(
  "/:id",
  param("id").isMongoId().withMessage("Invalid movie ID format."), // Validate ID format
  getMovieById
);

// Route to add a new movie
movieRouter.post("/", validateAddMovie, addMovie); // Add a new movie

export default movieRouter;
