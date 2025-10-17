import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistIcon from "@mui/icons-material/PlaylistAdd";

const PlayListAddIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handlePlayListAdd = (e) => {
    e.preventDefault();
    context.playlistAdd(movie);
  };

  return (
    <IconButton aria-label="add to favorites" onClick={handlePlayListAdd}>
      <PlaylistIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default PlayListAddIcon;
