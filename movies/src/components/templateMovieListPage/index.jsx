import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function MovieListPageTemplate({ movies, title, action, page, totalPages, onPageChange }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else setGenreFilter(value);
  };

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{flex: "1 1 500px"}}>
        <Grid
          key="find"
          size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}}
          sx={{padding: "20px"}}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
          />
        </Grid>
        <MovieList action={action} movies={displayedMovies}></MovieList>
      </Grid>
      {totalPages && totalPages > 1 && (
        <Grid size={12}>
          <Stack spacing={2} alignItems="center" sx={{ marginTop: 3, marginBottom: 3 }}>
            <Pagination 
              count={totalPages} 
              page={page} 
              onChange={onPageChange}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
            />
          </Stack>
        </Grid>
      )}
    </Grid>
  );
}

export default MovieListPageTemplate;