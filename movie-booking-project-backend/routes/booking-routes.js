import express from "express";
import {
  deleteBooking,
  getBookingById,
  newBooking,
} from "../controllers/booking-controller";
import { body, param } from "express-validator"; // For validation

const bookingsRouter = express.Router();

// Middleware to validate input
const validateNewBooking = [
  body("movie").notEmpty().withMessage("Movie ID is required."),
  body("seatNumber").isNumeric().withMessage("Seat number must be a number."),
  body("date").isISO8601().withMessage("Date must be in a valid format (YYYY-MM-DD)."),
];

// Route to get a booking by ID
bookingsRouter.get("/:id", 
  param("id").isMongoId().withMessage("Invalid booking ID format."), // Validate ID format
  getBookingById
);

// Route to create a new booking
bookingsRouter.post("/", validateNewBooking, newBooking);

// Route to delete a booking by ID
bookingsRouter.delete("/:id", 
  param("id").isMongoId().withMessage("Invalid booking ID format."), // Validate ID format
  deleteBooking
);

export default bookingsRouter;
