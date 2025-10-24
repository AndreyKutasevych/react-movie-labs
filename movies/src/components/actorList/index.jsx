import React from "react";
import ActorCard from "../actor/";
import Grid from "@mui/material/Grid";

const ActorList = (props) => {
  let actorCards = props.actors.map((actor) => (
    <Grid key={actor.id} size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}} sx={{padding: "20px"}}>
      <ActorCard key={actor.id} actor={actor} action={props.action} />
    </Grid>
  ));
  return actorCards;
};

export default ActorList;