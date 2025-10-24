import React, { useState } from "react";
import { getPopularActors } from "../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import ActorList from '../components/actorList';
import Header from "../components/headerMovieList";
import Grid from "@mui/material/Grid";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const ActorsPage = (props) => {
  const [page, setPage] = useState(1);
  
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['popular_actors', { page: page }],
    queryFn: getPopularActors,
  });

  const handleChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const actors = data.results;
  const totalPages = data.total_pages > 500 ? 500 : data.total_pages;

  return (
    <Grid container>
      <Grid size={12}>
        <Header title="Popular Actors" />
      </Grid>
      <Grid container sx={{ flex: "1 1 500px" }}>
        <ActorList 
          actors={actors} 
          action={(actor) => null}
        />
      </Grid>
      <Grid size={12}>
        <Stack spacing={2} alignItems="center" sx={{ marginTop: 3, marginBottom: 3 }}>
          <Pagination 
            count={totalPages} 
            page={page} 
            onChange={handleChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ActorsPage;