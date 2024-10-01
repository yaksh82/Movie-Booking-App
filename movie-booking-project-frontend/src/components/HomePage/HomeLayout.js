import { Box, Button, Typography, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllMovies } from "../../helpers/api-helpers";
import CardLayout from "./CardLayout"; // Fixed typo

const HomeLayout = () => {
  const [movies, setMovies] = useState([]); // Initialize to an empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getAllMovies();
        setMovies(data.movies); // Assuming data.movies is the correct structure
      } catch (err) {
        console.error(err);
        setError("Failed to load movies");
      } finally {
        setLoading(false); // End loading regardless of success or failure
      }
    };

    fetchMovies();
  }, []);

  return (
    <Box width="100%" height="100vh" marginTop={2} margin="auto">
      <Box margin={"auto"} width="80%" height="40%" padding={2} display="flex">
        <img
          src="https://i.ytimg.com/vi/yEinBUJG2RI/maxresdefault.jpg"
          alt="Rocketry"
          width="100%"
          height="100%"
        />
      </Box>
      <Box padding={5} margin="auto">
        <Typography variant="h4" textAlign={"center"}>
          Latest Releases
        </Typography>
      </Box>
      <Box
        gap={5}
        margin="auto"
        width="80%"
        flexWrap={"wrap"}
        display="flex"
        justifyContent={"center"}
      >
        {loading && <CircularProgress color="inherit" />}
        {error && <Typography color="error">{error}</Typography>}
        {movies.length > 0 ? (
          movies.slice(0, 4).map((movie) => (
            <CardLayout
              id={movie._id} // Use unique movie ID as key
              title={movie.title}
              releaseDate={movie.releaseDate}
              posterUrl={movie.posterUrl}
              description={movie.description}
              key={movie._id} // Use movie._id for the key
            />
          ))
        ) : (
          !loading && <Typography>No movies available.</Typography> // Handle empty state
        )}
      </Box>
      <Box display={"flex"} padding={5} margin="auto">
        <Button
          variant="outlined"
          LinkComponent={Link}
          to="/movies"
          sx={{ margin: "auto", color: "#2b2d42" }}
        >
          View All Movies
        </Button>
      </Box>
    </Box>
  );
};

export default HomeLayout;
