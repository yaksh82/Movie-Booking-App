import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Admin from "../models/Admin";
import Movie from "../models/Movie";

// Middleware for verifying admin token
const verifyAdminToken = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return res.status(404).json({ message: "Token Not Found" });
  }

  const extractedToken = authorizationHeader.split(" ")[1];
  if (!extractedToken || extractedToken.trim() === "") {
    return res.status(404).json({ message: "Invalid Token" });
  }

  try {
    const decrypted = jwt.verify(extractedToken, process.env.SECRET_KEY);
    req.adminId = decrypted.id; // Attach adminId to request object for later use
    next(); // Proceed to the next middleware/handler
  } catch (err) {
    return res.status(400).json({ message: `Token Verification Failed: ${err.message}` });
  }
};

// Add a new movie
export const addMovie = async (req, res) => {
  const { title, description, releaseDate, posterUrl, featured, actors } = req.body;

  // Check if admin exists
  let adminUser;
  try {
    adminUser = await Admin.findById(req.adminId);
    if (!adminUser) {
      return res.status(404).json({ message: "Admin not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Fetching admin failed" });
  }

  // Validate movie inputs
  if (!title || !description || !posterUrl || title.trim() === "" || description.trim() === "" || posterUrl.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  let movie;
  try {
    movie = new Movie({
      title,
      description,
      releaseDate: new Date(releaseDate),
      posterUrl,
      featured,
      actors,
      admin: req.adminId,
    });

    // Start a transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    await movie.save({ session });
    adminUser.addedMovies.push(movie);
    await adminUser.save({ session });

    await session.commitTransaction();
    session.endSession();
  } catch (err) {
    return res.status(500).json({ message: "Saving movie failed", error: err.message });
  }

  return res.status(201).json({ movie }); // Return the newly created movie
};

// Get all movies
export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    if (!movies || movies.length === 0) {
      return res.status(404).json({ message: "No Movies Found" });
    }
    return res.status(200).json({ movies });
  } catch (err) {
    return res.status(500).json({ message: "Fetching movies failed", error: err.message });
  }
};

// Get movie by ID
export const getMovieById = async (req, res) => {
  const id = req.params.id;

  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "Invalid Movie ID" });
    }
    return res.status(200).json({ movie });
  } catch (err) {
    return res.status(500).json({ message: "Fetching movie failed", error: err.message });
  }
};

// Export the verifyAdminToken middleware for use in routes
export { verifyAdminToken };
