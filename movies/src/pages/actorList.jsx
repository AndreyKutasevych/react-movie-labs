import React, { useState } from "react";
import { getPopularActors } from "../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import ActorList from '../components/actorList';
import Header from "../components/headerMovieList";
import Grid from "@mui/material/Grid";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FilterActorsCard from "../components/filterActorCard";

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

  const [nameFilter, setNameFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [popularityType, setPopularityType] = useState("greater");
  const [popularityValue, setPopularityValue] = useState("");

  const handleUserInput = (type, value) => {
    switch (type) {
      case "name": setNameFilter(value); break;
      case "gender": setGenderFilter(value); break;
      case "department": setDepartmentFilter(value); break;
      case "popularityType": setPopularityType(value); break;
      case "popularityValue": setPopularityValue(value); break;
      default: break;
    }
  };

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const actors = data.results;
  const totalPages = data.total_pages > 500 ? 500 : data.total_pages;

  let filteredActors = [...actors];

  if (nameFilter) {
    filteredActors = filteredActors.filter(a =>
      a.name.toLowerCase().includes(nameFilter.toLowerCase())
    );
  }

  if (genderFilter && genderFilter !== "") {
    filteredActors = filteredActors.filter(a => {
      return a.gender === parseInt(genderFilter);
    });
  }

  if (popularityValue && !isNaN(popularityValue)) {
    const popValue = parseFloat(popularityValue);
    filteredActors = filteredActors.filter(a => {
      if (popularityType === "greater") {
        return a.popularity >= popValue;
      } else {
        return a.popularity <= popValue;
      }
    });
  }

  const isFiltering = nameFilter || genderFilter || departmentFilter || popularityValue;

  return (
    <Grid container>
      <Grid size={12}>
        <Header title="Popular Actors" />
      </Grid>

      {isFiltering && (
        <Grid size={12}>
          <Typography 
            sx={{ 
              textAlign: 'center', 
              color: '#4ecdc4', 
              padding: 2,
              backgroundColor: 'rgba(29, 45, 108, 0.5)',
              borderRadius: 2,
              margin: 2
            }}
          >
            Filtering {filteredActors.length} of {actors.length} actors on page {page}
          </Typography>
        </Grid>
      )}

      <Grid container sx={{ flex: "1 1 500px" }}>
        <Grid
          key="find"
          size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}}
          sx={{padding: "20px"}}
        >
          <FilterActorsCard
            nameFilter={nameFilter}
            genderFilter={genderFilter}
            departmentFilter={departmentFilter}
            popularityType={popularityType}
            popularityValue={popularityValue}
            onUserInput={handleUserInput}
          />
        </Grid>
        <ActorList actors={filteredActors} action={(actor) => null}/>
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