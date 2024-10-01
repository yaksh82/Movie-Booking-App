import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllMovies } from "../../api-helpers/api-helpers";
import MovieItem from "./MovieItem";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch movies");
      });
  }, []);

  return (
    <Box margin={"auto"} marginTop={4}>
      <Typography
        margin={"auto"}
        variant="h4"
        padding={2}
        width="40%"
        bgcolor={"#900C3F"}
        color="white"
        textAlign={"center"}
      >
        All Movies
      </Typography>
      <Box
        width={"100%"}
        margin="auto"
        marginTop={5}
        display={"flex"}
        justifyContent="flex-start"
        flexWrap={"wrap"}
      >
        {error && (
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        )}
        {movies && movies.length > 0 ? (
          movies.map((movie) => (
            <MovieItem
              key={movie._id}  // Use unique key
              id={movie._id}
              posterUrl={movie.posterUrl}
              releaseDate={movie.releaseDate}
              title={movie.title}
            />
          ))
        ) : (
          !error && <Typography>Loading movies...</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Movies;
