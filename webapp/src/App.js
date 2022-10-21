import React from "react";
import { Typography } from "@mui/material";
import "./App.css";

import Germany20201012 from "./components/Germany_2020_10_12";
import UK20201021 from "./components/United_Kingdom_2022_10_21";

function App() {
  return (
    <div className="App">
      <Typography variant="h3">Back of The Envelope</Typography>
      <UK20201021 />
      <Germany20201012 />
    </div>
  );
}

export default App;
