import React, { useState } from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import PlaylistIcon from "../components/cardIcons/playlistAdd";

const UpcomingMoviesPage = (props) => {
  const [page, setPage] = useState(1);

  const { data, error, isPending, isError } = useQuery({
    queryKey: ['upcoming', { page: page }],
    queryFn: getUpcomingMovies,
  });

  const handleChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }

  const movies = data.results;
  const totalPages = data.total_pages > 500 ? 500 : data.total_pages;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))

  return (
    <PageTemplate
      title="Upcoming movies"
      movies={movies}
      action={(movie) => {
        return <PlaylistIcon movie={movie} />
      }}
      page={page}
      totalPages={totalPages}
      onPageChange={handleChange}
    />
  );
};

export default UpcomingMoviesPage;