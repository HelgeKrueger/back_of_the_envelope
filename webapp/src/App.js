import React from "react";
import { Box, createTheme, ThemeProvider, Typography } from "@mui/material";
import { MathJaxContext } from "better-react-mathjax";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import "./App.css";

import NavigationMenu from "./components/NavigationMenu";

import routes from "./routes";
const Inside = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ width: { sm: "300px" }, flexShrink: { sm: 0 } }}>
        <NavigationMenu />
      </Box>
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Typography variant="h3" sx={{ textAlign: "center", marginBottom: 5 }}>
          Back of The Envelope
        </Typography>

        <Outlet />
      </Box>
    </Box>
  );
};

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

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Inside />,
      children: routes,
    },
  ]);

  return (
    <div className="App">
      <MathJaxContext>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </MathJaxContext>
    </div>
  );
}

export default App;
