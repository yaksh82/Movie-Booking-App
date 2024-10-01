import express from "express";
import {
  deleteUser,
  getAllUsers,
  getBookingsOfUser,
  getUserById,
  login,
  signup, // Fixed typo
  updateUser,
} from "../controllers/user-controller";
import { body, param } from "express-validator"; // For validation

const userRouter = express.Router();

// Middleware to validate input for signup
const validateSignup = [
  body("name").notEmpty().withMessage("Name is required."),
  body("email").isEmail().withMessage("Valid email is required."),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long."),
];

// Middleware to validate input for login
const validateLogin = [
  body("email").isEmail().withMessage("Valid email is required."),
  body("password").notEmpty().withMessage("Password is required."),
];

// Route to get all users
userRouter.get("/", getAllUsers); // Fetch all users

// Route to get a user by ID
userRouter.get("/:id", 
  param("id").isMongoId().withMessage("Invalid user ID format."), // Validate ID format
  getUserById
);

// Route to signup a new user
userRouter.post("/signup", validateSignup, signup); // User signup

// Route to update a user
userRouter.put("/:id", 
  param("id").isMongoId().withMessage("Invalid user ID format."), // Validate ID format
  updateUser
);

// Route to delete a user
userRouter.delete("/:id", 
  param("id").isMongoId().withMessage("Invalid user ID format."), // Validate ID format
  deleteUser
);

// Route for user login
userRouter.post("/login", validateLogin, login); // User login

// Route to get bookings of a user
userRouter.get("/bookings/:id", 
  param("id").isMongoId().withMessage("Invalid user ID format."), // Validate ID format
  getBookingsOfUser
);

export default userRouter;
