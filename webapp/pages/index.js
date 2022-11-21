import React, { useEffect, useState } from "react";
import { Box, createTheme, ThemeProvider, Typography } from "@mui/material";
import { MathJaxContext } from "better-react-mathjax";

// import "./App.css";

import NavigationMenu from "../src/components/NavigationMenu";
import Welcome from "../src/pages/welcome";

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

  let [page, setPage] = useState();

  useEffect(() => {
    setPage(<Welcome setPage={setPage} />);
  }, [setPage]);

  return (
    <div className="App">
      <MathJaxContext>
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
      </MathJaxContext>
    </div>
  );
}

export default App;
