import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import Avatar from '@mui/material/Avatar';
import { Link } from "react-router";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import PlaylistIcon from "@mui/icons-material/PlaylistAdd";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'

export default function MovieCard({ movie, action }) {
  const { favorites, addToFavorites } = useContext(MoviesContext);
  
  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false
  }

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    addToFavorites(movie);
  };
  const handleAddToPlaylist = (e) => {
    e.preventDefault();
    playlistAdd(movie);
  };

  return (
    <Card 
      sx={{ 
        backgroundColor: "#204577ff", 
        color: "#f5f6fa", 
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0 8px 20px rgba(21, 20, 20, 0.4)"
        }
      }}
    >
      <CardHeader
        sx={{ 
          backgroundColor: "#204577ff", 
          color: "#f5f6fa"
        }}
        avatar={
          movie.favorite ? (
            <Avatar sx={{ backgroundColor: '#ff6348' }}> 
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p" sx={{ color: "#f5f6fa" }}>
            {movie.title}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={{ height: 500 }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent sx={{ backgroundColor: "#204577ff" }}>
        <Grid container>
          <Grid size={{xs: 6}}>
            <Typography variant="h6" component="p" sx={{ color: "#f5f6fa" }}>
              <CalendarIcon fontSize="small" sx={{ color: "#4ecdc4" }} />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid size={{xs: 6}}>
            <Typography variant="h6" component="p" sx={{ color: "#f5f6fa" }}>
              <StarRateIcon fontSize="small" sx={{ color: "#ffd700" }} />
              {" "} {movie.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing sx={{ backgroundColor: "#2f3640", padding: 2 }}>
        {action(movie)}
        <Link to={`/movies/${movie.id}`} style={{ textDecoration: "none" }}>
          <Button 
            variant="contained" 
            size="medium"
            sx={{ 
              backgroundColor: "#ff6348",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#ff4757"
              }
            }}
          >
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}