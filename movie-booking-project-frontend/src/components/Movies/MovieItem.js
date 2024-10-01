import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react"; 
import { Link } from "react-router-dom"; // Correct capitalization for Link

const MovieItem = ({ title, releaseDate, posterUrl, id }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={posterUrl} // Dynamically use posterUrl
        title={title} // Dynamically use title for alt text
      />
      <img height={"50"} width="100%" src={posterUrl} alt={title} /> 
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {new Date(releaseDate).toDateString()} {/* Correct Date formatting */}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
        <Button size="small" component={Link} to={`/movies/${id}`}>
          View Details {/* Example usage of Link to navigate to a movie's detail page */}
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieItem;
