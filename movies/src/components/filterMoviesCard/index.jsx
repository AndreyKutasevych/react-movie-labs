import React, {useState, useEffect} from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getGenres } from "../../api/tmdb-api";
import img from '../../images/cat.jpg';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../spinner';

const formControl = {
  margin: 1,
  minWidth: "90%",
  backgroundColor: "rgba(55, 114, 165, 1)"
};

export default function FilterMoviesCard(props) {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const genres = data.genres;
  if (genres[0].name !== "All"){
    genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value);
  };

  const handleTextChange = (e, props) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

  return (
    <Card
      sx={{
        backgroundColor: "rgba(29, 45, 108, 1)"
      }}
      variant="outlined">
      <CardContent>
        <Typography 
          variant="h5" 
          component="h1"
          sx={{ color: "#f5f6fa" }} // Light text color
        >
          <SearchIcon fontSize="large" sx={{ color: "#4ecdc4" }} />
          Filter the movies.
        </Typography>
        <TextField
          sx={{
            ...formControl,
            '& .MuiInputLabel-root': { color: '#f5f6fa' }, 
            '& .MuiFilledInput-root': { color: '#f5f6fa' }, 
          }}
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
          value={props.titleFilter}
          onChange={handleTextChange}
        />
        <FormControl sx={{...formControl}}>
          <InputLabel 
            id="genre-label"
            sx={{ color: '#f5f6fa' }} 
          >
            Genre
          </InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            defaultValue=""
            value={props.genreFilter}
            onChange={handleGenreChange}
            sx={{ 
              color: 'white', 
              '& .MuiSvgIcon-root': { color: '#1e3079ff' }, 
            }}
          >
            {genres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </CardContent>
      <CardMedia
        sx={{ height: 300 }}
        image={img}
        title="Filter"
      />
      <CardContent>
        <Typography 
          variant="h5" 
          component="h1"
          sx={{ color: "#f5f6fa" }} // Light text color
        >
          <SearchIcon fontSize="large" sx={{ color: "#4ecdc4" }} />
          Filter the movies.
          <br />
        </Typography>
      </CardContent>
    </Card>
  );
}