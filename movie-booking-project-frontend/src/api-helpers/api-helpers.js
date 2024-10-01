import axios from "axios";

// Function to get all movies
export const getAllMovies = async () => {
  try {
    const res = await axios.get("/movie");
    if (res.status !== 200) throw new Error("No Data");
    return res.data;
  } catch (err) {
    console.log(err.message || "Error fetching movies");
  }
};

// Function to handle user authentication (sign up / login)
export const sendUserAuthRequest = async (data, signup) => {
  try {
    const res = await axios.post(`/user/${signup ? "signup" : "login"}`, {
      name: signup ? data.name : "",
      email: data.email,
      password: data.password,
    });
    if (![200, 201].includes(res.status)) throw new Error("Unexpected Error");
    return res.data;
  } catch (err) {
    console.log(err.message || "Error with authentication");
  }
};

// Function to handle admin login
export const sendAdminAuthRequest = async (data) => {
  try {
    const res = await axios.post("/admin/login", {
      email: data.email,
      password: data.password,
    });
    if (res.status !== 200) throw new Error("Unexpected Error");
    return res.data;
  } catch (err) {
    console.log(err.message || "Error with admin authentication");
  }
};

// Function to get movie details by ID
export const getMovieDetails = async (id) => {
  try {
    const res = await axios.get(`/movie/${id}`);
    if (res.status !== 200) throw new Error("Unexpected Error");
    return res.data;
  } catch (err) {
    console.log(err.message || "Error fetching movie details");
  }
};

// Function to create a new booking
export const newBooking = async (data) => {
  try {
    const res = await axios.post("/booking", {
      movie: data.movie,
      seatNumber: data.seatNumber,
      date: data.date,
      user: localStorage.getItem("userId"),
    });
    if (res.status !== 201) throw new Error("Unexpected Error");
    return res.data;
  } catch (err) {
    console.log(err.message || "Error creating booking");
  }
};

// Function to get user bookings
export const getUserBooking = async () => {
  const id = localStorage.getItem("userId");
  try {
    const res = await axios.get(`/user/bookings/${id}`);
    if (res.status !== 200) throw new Error("Unexpected Error");
    return res.data;
  } catch (err) {
    console.log(err.message || "Error fetching user bookings");
  }
};

// Function to delete a booking by ID
export const deleteBooking = async (id) => {
  try {
    const res = await axios.delete(`/booking/${id}`);
    if (res.status !== 200) throw new Error("Unexpected Error");
    return res.data;
  } catch (err) {
    console.log(err.message || "Error deleting booking");
  }
};

// Function to get user details
export const getUserDetails = async () => {
  const id = localStorage.getItem("userId");
  try {
    const res = await axios.get(`/user/${id}`);
    if (res.status !== 200) throw new Error("Unexpected Error");
    return res.data;
  } catch (err) {
    console.log(err.message || "Error fetching user details");
  }
};

// Function to add a new movie
export const addMovie = async (data) => {
  try {
    const res = await axios.post(
      "/movie",
      {
        title: data.title,
        description: data.description,
        releaseDate: data.releaseDate,
        posterUrl: data.posterUrl,
        featured: data.featured, // fixed typo
        actors: data.actors,
        admin: localStorage.getItem("adminId"),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (res.status !== 201) throw new Error("Unexpected Error Occurred");
    return res.data;
  } catch (err) {
    console.log(err.message || "Error adding movie");
  }
};

// Function to get admin by ID
export const getAdminById = async () => {
  const adminId = localStorage.getItem("adminId");
  try {
    const res = await axios.get(`/admin/${adminId}`);
    if (res.status !== 200) throw new Error("Unexpected Error Occurred");
    return res.data;
  } catch (err) {
    console.log(err.message || "Error fetching admin details");
  }
};
