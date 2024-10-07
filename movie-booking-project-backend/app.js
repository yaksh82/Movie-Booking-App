import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes.js";
import adminRouter from "./routes/admin-routes.js";
import movieRouter from "./routes/movie-routes.js";
import bookingsRouter from "./routes/booking-routes.js";
import cors from "cors";

dotenv.config(); // Load environment variables

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingsRouter);

// MongoDB URI
const MONGO_URI = `mongodb+srv://yaksh82:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@cluster0.h45tr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Mongoose configuration to avoid deprecation warning
mongoose.set('strictQuery', true); 

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(5000, () => console.log("Connected To Database And Server is running on port 3001"))
  )
  .catch((e) => console.log("Database connection error:", e));
