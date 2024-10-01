import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getAllMovies } from "../../helpers/api-helpers";
import CradLayout from "../HomePage/CardLayout"; // Correcting the typo

const AllMovies = () => {
  const [movies, setMovies] = useState([]); // Initialize with an empty array
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies)) // Assuming the API returns movies in data.movies
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch movies.");
      });
  }, []);

  return (
    <Box margin="auto" marginTop={4}>
      <Typography variant="h4" padding={2} textAlign="center">
        All Movies
      </Typography>
      <Box
        margin="auto"
        width="100%"
        display={"flex"}
        justifyContent="center"
        flexWrap={"wrap"}
        gap={4}
      >
        {error && <Typography color="error">{error}</Typography>}
        {movies.length > 0 ? (
          movies.map((movie) => (
            <CardLayout
              key={movie._id} // Use unique key instead of index
              id={movie._id}
              title={movie.title}
              releaseDate={movie.releaseDate}
              posterUrl={movie.posterUrl}
              description={movie.description}
            />
          ))
        ) : (
          <Typography>Loading movies...</Typography>
        )}
      </Box>
    </Box>
  );
};

export default AllMovies;
