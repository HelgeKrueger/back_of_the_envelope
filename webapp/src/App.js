import React from "react";
import { Box, createTheme, ThemeProvider, Typography } from "@mui/material";
import { MathJaxContext } from "better-react-mathjax";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";

import "./App.css";

import NavigationMenu from "./components/NavigationMenu";
import Welcome from "./pages/welcome";

import TwitterOutages from "./pages/TwitterOutages";
import RepublicanPrimary from "./pages/RepublicanPrimary";
import USAMcCarthySpeaker from "./pages/USAMcCarthySpeaker2023";
import UnitedKingdom from "./pages/unitedkingdom";
import Germany from "./pages/germany";
import CiaFactbook from "./pages/CiaFactbook";
import MastodonTags from "./pages/MastodonTags";
import Elections2023 from "./pages/Elections2023";
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
      children: [
        {
          index: true,
          element: <Welcome />,
        },
        { path: "germany", element: <Germany /> },
        { path: "united-kingdom", element: <UnitedKingdom /> },
        {
          path: "2022/mccarthy-speaker",
          element: <USAMcCarthySpeaker />,
        },
        {
          path: "2022/twitter-outages",
          element: <TwitterOutages />,
        },
        {
          path: "2022/republican-primary",
          element: <RepublicanPrimary />,
        },
        {
          path: "2022/cia-factbook",
          element: <CiaFactbook />,
        },
        {
          path: "2022/mastodon-tags",
          element: <MastodonTags />,
        },
        {
          path: "2023/elections",
          element: <Elections2023 />,
        },
      ],
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
