import React, { useState } from "react";
import { Box, createTheme, ThemeProvider, Typography } from "@mui/material";
import "./App.css";

import UK20201021 from "./components/United_Kingdom_2022_10_21";
import NavigationMenu from "./components/NavigationMenu";
import Welcome from "./pages/welcome";

function App() {
  let theme = createTheme();
  theme = {
    ...theme,
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: "#dddddd",
          },
        },
      },
    },
  };

  let [page, setPage] = useState(<Welcome />);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ width: { sm: "300px" }, flexShrink: { sm: 0 } }}>
            <NavigationMenu setPage={setPage} />
          </Box>
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Typography variant="h3" sx={{ textAlign: "center" }}>
              Back of The Envelope
            </Typography>
            {page}
            {/* <UK20201021 /> */}
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
