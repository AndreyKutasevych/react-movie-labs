import React from "react";
import { useParams } from 'react-router';
import ActorHeader from "../components/actorHeader";
import ActorDetails from "../components/actorDetails";
import { getActor } from '../api/tmdb-api';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';

const ActorPage = (props) => {
  const { id } = useParams();
  const { data: actor, error, isPending, isError } = useQuery({
    queryKey: ['actor', {id: id}],
    queryFn: getActor,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
    <ActorHeader actor={actor} />
      {actor ? (
        <>
          <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
              {actor.profile_path && (
                <img 
                  src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                  alt={actor.name}
                  style={{ borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                />
              )}
              <div style={{ flex: 1 }}>
                <h1>{actor.name}</h1>
                <ActorDetails actor={actor} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Waiting for actor details</p>
      )}
    </>
  );
};

export default ActorPage;