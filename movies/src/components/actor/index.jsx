import React from "react";
import { Link } from "react-router";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png';

export default function ActorCard({ actor, action }) {
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
        title={
          <Typography variant="h5" component="p">
            {actor.name}{" "}
          </Typography>
        }
        sx={{ 
          backgroundColor: "#204577ff", 
          color: "#f5f6fa"
        }}
      />
      <CardMedia
        sx={{ height: 500}}
        image={
          actor.profile_path
            ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {" "} Popularity: {actor.popularity?.toFixed(1)}{" "}
            </Typography>
          </Grid>
          {actor.known_for && actor.known_for.length > 0 && (
            <Grid size={{ xs: 12 }} sx={{ marginTop: 1 }}>
              <Typography variant="body2" color="white">
                Known for: {actor.known_for.slice(0, 2).map(item => item.title || item.name).join(", ")}
              </Typography>
            </Grid>
          )}
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {action && action(actor)}
        <Link to={`/actors/${actor.id}`}>
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