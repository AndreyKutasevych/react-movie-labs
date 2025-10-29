import React, { useState } from "react";
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
import Box from "@mui/material/Box";
import img from "../../images/cat.jpg";

const formControl = {
  margin: 1,
  minWidth: "90%",
  backgroundColor: "rgba(55, 114, 165, 1)",
  color: "#f5f6fa",
  '& .MuiInputLabel-root': { color: '#f5f6fa' },
  '& .MuiFilledInput-root': { color: '#f5f6fa' },
  '& .MuiFilledInput-root:before': { borderBottomColor: '#4ecdc4' },
  '& .MuiFilledInput-root:hover:before': { borderBottomColor: '#ff6348' },
  '& .MuiSelect-root': { color: '#f5f6fa' },
  '& .MuiSvgIcon-root': { color: '#f5f6fa' },
};

export default function FilterActorsCard(props) {
  const [popularityFilterType, setPopularityFilterType] = useState("greater");

  const genders = [
    { value: "", name: "All Genders" },
    { value: "2", name: "Male" },
    { value: "1", name: "Female" },
    { value: "3", name: "Non-binary" }
  ];

  const departments = [
    { value: "", name: "All Departments" },
    { value: "Acting", name: "Acting" },
    { value: "Directing", name: "Directing" },
    { value: "Writing", name: "Writing" },
    { value: "Production", name: "Production" },
    { value: "Crew", name: "Crew" },
    { value: "Camera", name: "Camera" },
    { value: "Editing", name: "Editing" },
    { value: "Sound", name: "Sound" }
  ];

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value);
  };

  const handleTextChange = (e, field) => {
    handleChange(e, field, e.target.value);
  };

  const handleSelectChange = (e, field) => {
    handleChange(e, field, e.target.value);
  };

  const handlePopularityTypeChange = (e) => {
    setPopularityFilterType(e.target.value);
    props.onUserInput("popularityType", e.target.value);
  };

  return (
    <Card
      sx={{
        backgroundColor: "rgba(29, 45, 108, 1)",
        color: "#f5f6fa"
      }}
      variant="outlined"
    >
      <CardContent>
        <Typography variant="h5" component="h1" sx={{ color: "#f5f6fa" }}>
          <SearchIcon fontSize="large" sx={{ color: "#4ecdc4" }} />
          Filter actors
        </Typography>

        <TextField
          sx={{...formControl}}
          id="actor-name"
          label="Actor Name"
          type="search"
          variant="filled"
          value={props.nameFilter}
          onChange={(e) => handleTextChange(e, "name")}
        />
        
        <FormControl sx={{ ...formControl }}>
          <InputLabel id="gender-label" sx={{ color: "#f5f6fa" }}>
            Gender
          </InputLabel>
          <Select
            labelId="gender-label"
            id="gender-select"
            value={props.genderFilter}
            onChange={(e) => handleSelectChange(e, "gender")}
            sx={{
              color: "#f5f6fa",
              "& .MuiSvgIcon-root": { color: "#f5f6fa" }
            }}
          >
            {genders.map((gender) => (
              <MenuItem key={gender.value} value={gender.value}>
                {gender.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            margin: 1,
            minWidth: "90%"
          }}
        >
          <FormControl sx={{ minWidth: "45%", backgroundColor: "rgba(55, 114, 165, 1)" }}>
            <InputLabel id="popularity-type-label" sx={{ color: "#f5f6fa" }}>
              Popularity
            </InputLabel>
            <Select
              labelId="popularity-type-label"
              id="popularity-type"
              value={popularityFilterType}
              onChange={handlePopularityTypeChange}
              sx={{
                color: "#f5f6fa",
                "& .MuiSvgIcon-root": { color: "#f5f6fa" }
              }}
            >
              <MenuItem value="greater">More than</MenuItem>
              <MenuItem value="less">Less than</MenuItem>
            </Select>
          </FormControl>

          <TextField
            sx={{
              width: "45%",
              backgroundColor: "rgba(55, 114, 165, 1)",
              "& .MuiInputLabel-root": { color: "#f5f6fa" },
              "& .MuiFilledInput-root": { color: "#f5f6fa" }
            }}
            id="actor-popularity"
            label="Value"
            type="number"
            variant="filled"
            value={props.popularityValue || ""}
            onChange={(e) => handleTextChange(e, "popularityValue")}
          />
        </Box>
      </CardContent>

      <CardMedia sx={{ height: 300 }} image={img} title="Filter" />
    </Card>
  );
}