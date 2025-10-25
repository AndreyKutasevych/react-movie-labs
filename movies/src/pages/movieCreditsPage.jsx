import React from "react";
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getMovieCredits, getMovie } from '../api/tmdb-api';
import Spinner from '../components/spinner';
import PageTemplate from "../components/templateMoviePage";

const MovieCreditsPage = () => {
  const { id } = useParams();
  
  const { data: movie, error: movieError, isPending: moviePending } = useQuery({
    queryKey: ['movie', { id: id }],
    queryFn: getMovie,
  });

  const { data: credits, error: creditsError, isPending: creditsPending } = useQuery({
    queryKey: ['credits', { id: id }],
    queryFn: getMovieCredits,
  });

  if (moviePending || creditsPending) {
    return <Spinner />;
  }

  if (movieError) {
    return <h1>{movieError.message}</h1>;
  }

  if (creditsError) {
    return <h1>{creditsError.message}</h1>;
  }

  const cast = credits.cast || [];
  const crew = credits.crew || [];

  return (
    <PageTemplate movie={movie}>
      <div style={{ padding: '20px', color:"white" }}>
        <h2>Cast</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {cast.slice(0, 12).map((actor) => (
            <div key={actor.id} style={{ textAlign: 'center' }}>
              {actor.profile_path ? (
                <img 
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                  onClick={() => window.location.href = `/actors/${actor.id}`}
                  style={{ width: '100%', borderRadius: '8px' }}
                />
              ) : (
                <div style={{ width: '100%', height: '225px', backgroundColor: '#ccc', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  No Photo
                </div>
              )}
              <p style={{ fontWeight: 'bold', marginTop: '8px' }}>{actor.name}</p>
              <p style={{ fontSize: '0.9em', color: '#666' , color:"white" }}>{actor.character}</p>
            </div>
          ))}
        </div>

        <h2>Crew</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
          {crew.filter(person => ['Director', 'Producer', 'Writer', 'Screenplay'].includes(person.job)).map((person, index) => (
            <div key={`${person.id}-${index}`}>
              <strong>{person.name}</strong> - {person.job}
            </div>
          ))}
        </div>
      </div>
    </PageTemplate>
  );
};

export default MovieCreditsPage;