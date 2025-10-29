import React, { useState } from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import PlaylistIcon from "../components/cardIcons/playlistAdd";

const HomePage = (props) => {
  const [page, setPage] = useState(1);
  
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['discover', { page: page }],
    queryFn: getMovies,
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

  const movies = data.results;
  const totalPages = data.total_pages > 500 ? 500 : data.total_pages;

  const favorites = movies.filter(m => m.favorite);
  localStorage.setItem('favorites', JSON.stringify(favorites));

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => {
        return (
        <>
          <AddToFavoritesIcon movie={movie} />
          <PlaylistIcon movie={movie} />
        </>
      )
      }}
      page={page}
      totalPages={totalPages}
      onPageChange={handleChange}
    />
  );
};

export default HomePage;