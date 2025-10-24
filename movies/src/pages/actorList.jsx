import React from "react";
import { getPopularActors } from "../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import ActorList from '../components/actorList';
import Header from "../components/headerMovieList";
import Grid from "@mui/material/Grid";

const ActorsPage = (props) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['popular_actors'],
    queryFn: getPopularActors,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const actors = data.results;

  return (
    <Grid container>
      <Grid size={12}>
        <Header title="Popular Actors" />
      </Grid>
      <Grid container sx={{ flex: "1 1 500px" }}>
        <ActorList 
          actors={actors} 
          action={(actor) => null} // You can add an action icon here if needed
        />
      </Grid>
    </Grid>
  );
};

export default ActorsPage;