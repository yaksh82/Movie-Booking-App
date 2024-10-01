import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes";
import adminRouter from "./routes/admin-routes";
import movieRouter from "./routes/movie-routes";
import bookingsRouter from "./routes/booking-routes";
import cors from "cors";

dotenv.config();
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingsRouter);

// MongoDB connection
const MONGO_URI = `mongodb+srv://yaksh82:${process.env.MONGODB_PASSWORD}@cluster0.h45tr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(MONGO_URI)
  .then(() =>
    app.listen(5000, () =>
      console.log("Connected to Database and Server is running on port 5000")
    )
  )
  .catch((e) => console.log(e));
