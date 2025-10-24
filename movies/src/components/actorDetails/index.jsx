import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import StarRate from "@mui/icons-material/StarRate";
import CakeIcon from "@mui/icons-material/Cake";
import PlaceIcon from "@mui/icons-material/Place";
import MovieIcon from "@mui/icons-material/Movie";
import Typography from "@mui/material/Typography";
import Header from "../headerMovieList";
import { useQuery } from "@tanstack/react-query";
import { getActorMovies } from "../../api/tmdb-api";
import React, { useState } from "react";
import Spinner from "../spinner";
import Grid from "@mui/material/Grid";
import ActorHeader from "../actorHeader"

const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};

const chip = { margin: 0.5 };

const ActorDetails = ({ actor }) => {
  const { data: credits, error, isPending } = useQuery({
    queryKey: ['actorMovies', { id: actor.id }],
    queryFn: getActorMovies,
  });

  return (
    <>
      <Typography variant="h5" component="h3">
        Biography
      </Typography>
      <Typography variant="h6" component="p">
        {actor.biography || "No biography available."}
      </Typography>

      <Paper component="ul" sx={{...root}}>
        <Chip 
          icon={<StarRate />} 
          label={`Popularity: ${actor.popularity?.toFixed(1)}`} 
        />
        {actor.birthday && (
          <Chip 
            icon={<CakeIcon />} 
            label={`Born: ${actor.birthday}`} 
          />
        )}
        {actor.deathday && (
          <Chip 
            icon={<CakeIcon />} 
            label={`Died: ${actor.deathday}`} 
          />
        )}
        {actor.place_of_birth && (
          <Chip 
            icon={<PlaceIcon />} 
            label={actor.place_of_birth} 
          />
        )}
        {actor.known_for_department && (
          <Chip 
            icon={<MovieIcon />} 
            label={`Known for: ${actor.known_for_department}`} 
          />
        )}
      </Paper>

      {actor.also_known_as && actor.also_known_as.length > 0 && (
        <Paper component="ul" sx={{...root}}>
          <li>
            <Chip label="Also Known As" sx={{...chip}} color="primary" />
          </li>
          {actor.also_known_as.slice(0, 5).map((name, index) => (
            <li key={index}>
              <Chip label={name} sx={{...chip}} />
            </li>
          ))}
        </Paper>
      )}

      <Typography variant="h5" component="h3" sx={{ marginTop: 4, marginBottom: 2 }}>
        Movies
      </Typography>

      {isPending ? (
        <Spinner />
      ) : error ? (
        <Typography color="error">Error loading movies</Typography>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px' }}>
          {credits.cast.slice(0, 12).map((movie) => (
            <div key={movie.id} style={{ textAlign: 'center' }}>
              {movie.poster_path ? (
                <img 
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  style={{ width: '100%', borderRadius: '8px', cursor: 'pointer' }}
                  onClick={() => window.location.href = `/movies/${movie.id}`}
                />
              ) : (
                <div style={{ 
                  width: '100%', 
                  height: '225px', 
                  backgroundColor: '#ccc', 
                  borderRadius: '8px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  No Poster
                </div>
              )}
              <Typography variant="body2" style={{ fontWeight: 'bold', marginTop: '8px' }}>
                {movie.title}
              </Typography>
              {movie.character && (
                <Typography variant="caption" style={{ color: '#666' }}>
                  as {movie.character}
                </Typography>
              )}
              {movie.release_date && (
                <Typography variant="caption" style={{ display: 'block', color: '#999' }}>
                  ({movie.release_date.split('-')[0]})
                </Typography>
              )}
              
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ActorDetails;