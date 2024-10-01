import { Button, FormLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, newBooking } from "../../api-helpers/api-helpers";

const Booking = () => {
  const [movie, setMovie] = useState(null);
  const [inputs, setInputs] = useState({ seatNumber: "", date: "" });
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const id = useParams().id;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await getMovieDetails(id);
        setMovie(res.movie);
      } catch (err) {
        setError("Failed to load movie details.");
        console.log(err);
      } finally {
        setLoading(false); // End loading
      }
    };
    fetchMovieDetails();
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!inputs.seatNumber || !inputs.date) {
      setError("Please fill in all fields.");
      return;
    }

    newBooking({ ...inputs, movie: movie._id })
      .then((res) => {
        console.log(res);
        // Optionally navigate to a success page or show a success message
      })
      .catch((err) => {
        setError("Failed to book the movie.");
        console.log(err);
      });
  };

  return (
    <div>
      {loading && <Typography>Loading movie details...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {movie && (
        <Fragment>
          <Typography padding={3} fontFamily="fantasy" variant="h4" textAlign={"center"}>
            Book Tickets for Movie: {movie.title}
          </Typography>
          <Box display={"flex"} justifyContent={"center"}>
            <Box
              display={"flex"}
              justifyContent={"column"}
              flexDirection="column"
              paddingTop={3}
              width="50%"
              marginRight={"auto"}
            >
              <img
                width="80%"
                height={"300px"}
                src={movie.posterUrl}
                alt={movie.title}
              />
              <Box width={"80%"} marginTop={3} padding={2}>
                <Typography paddingTop={2}>{movie.description}</Typography>
                <Typography fontWeight={"bold"} marginTop={1}>
                  Starring: {movie.actors.join(", ")} {/* Join actors for better formatting */}
                </Typography>
                <Typography fontWeight={"bold"} marginTop={1}>
                  Release Date: {new Date(movie.releaseDate).toDateString()}
                </Typography>
              </Box>
            </Box>
            <Box width={"50%"} paddingTop={3}>
              <form onSubmit={handleSubmit}>
                <Box padding={5} margin={"auto"} display="flex" flexDirection={"column"}>
                  <FormLabel>Seat Number</FormLabel>
                  <TextField
                    name="seatNumber"
                    value={inputs.seatNumber}
                    onChange={handleChange}
                    type={"number"}
                    margin="normal"
                    variant="standard"
                    required
                  />
                  <FormLabel>Booking Date</FormLabel>
                  <TextField
                    name="date"
                    type={"date"}
                    margin="normal"
                    variant="standard"
                    value={inputs.date}
                    onChange={handleChange}
                    required
                  />
                  <Button type="submit" sx={{ mt: 3 }}>
                    Book Now
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Fragment>
      )}
    </div>
  );
};

export default Booking;
