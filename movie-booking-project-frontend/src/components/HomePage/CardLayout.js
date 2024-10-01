import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const CardLayout = ({ title, description, releaseDate, posterUrl, id }) => {
  return (
    <Card
      sx={{
        width: 250,
        height: 320,
        borderRadius: 5,
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      <img
        height="50%" // Adjusted height
        width="100%"
        src={posterUrl}
        alt={title}
        onError={(e) => {
          e.target.onerror = null; // prevents looping
          e.target.src = "path/to/default/image.jpg"; // Set a default image
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(releaseDate).toDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          LinkComponent={Link}
          to={`/booking/${id}`}
          fullWidth
          variant="contained"
          sx={{
            margin: "auto",
            bgcolor: "#2b2d42",
            ":hover": {
              bgcolor: "#121217",
            },
            borderRadius: 5,
          }}
        >
          Book Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardLayout; // Fixed the export name
