import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router";

const ActorHeader = (props) => {
  const actor = props.actor;
  const navigate = useNavigate();
  
  return (
    <Paper
      component="div"
      sx={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        padding: 1.5,
        margin: 0,
        backgroundColor: "rgba(29, 45, 108, 1)", 
        color: "#f5f6fa" 
      }}
    >
      <IconButton aria-label="go back" onClick={() => navigate(-1)}>
        <ArrowBackIcon sx={{ color: "white" }} fontSize="large" />
      </IconButton>
      
      <Typography variant="h4" component="h3">
        {actor.name}
        <PersonIcon color="primary" sx={{ verticalAlign: 'middle', marginLeft: 1 }} />
        <br />
        <span sx={{ fontSize: "1.5rem" }}>
          {actor.known_for_department && `${actor.known_for_department}`}
        </span>
      </Typography>
      
      <IconButton aria-label="go forward" onClick={() => navigate(+1)}>
        <ArrowForwardIcon sx={{ color: "white" }} fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default ActorHeader;