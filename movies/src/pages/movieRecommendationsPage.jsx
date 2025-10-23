import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getMovieRecommendations, getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import PageTemplate from "../components/templateMoviePage";
import Grid from "@mui/material/Grid";
import MovieCard from "../components/movieCard";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const MovieRecommendationsPage = () => {
  const { id } = useParams();
  
  const { data: movie, error: movieError, isPending: moviePending } = useQuery({
    queryKey: ["movie", { id: id }],
    queryFn: getMovie,
  });

  const { data, error: recsError, isPending: recsPending } = useQuery({
    queryKey: ["recommendations", { id: id }],
    queryFn: getMovieRecommendations,
  });

  if (moviePending || recsPending) {
    return <Spinner />;
  }

  if (movieError) {
    return <h1>{movieError.message}</h1>;
  }

  if (recsError) {
    return <h1>{recsError.message}</h1>;
  }

  const recommendations = data.results || [];

  return (
    <PageTemplate movie={movie}>
      <div style={{ padding: "20px" }}>
        <h2>Recommended Movies</h2>
        {recommendations.length === 0 ? (
          <p>No recommendations available for this movie.</p>
        ) : (
          <Grid container spacing={2}>
            {recommendations.map((movie) => (
              <Grid key={movie.id} item xs={12} sm={6} md={4} lg={3}>
                <MovieCard 
                  movie={movie} 
                  action={(movie) => <AddToFavoritesIcon movie={movie} />}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </PageTemplate>
  );
};

export default MovieRecommendationsPage;