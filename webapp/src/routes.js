import React from "react";

import Welcome from "./pages/welcome";

import TwitterOutages from "./pages/TwitterOutages";
import RepublicanPrimary from "./pages/RepublicanPrimary";
import USAMcCarthySpeaker from "./pages/USAMcCarthySpeaker2023";
import UnitedKingdom from "./pages/unitedkingdom";
import Germany from "./pages/germany";
import CiaFactbook from "./pages/CiaFactbook";
import MastodonTags from "./pages/MastodonTags";
import Elections2023 from "./pages/Elections2023";
import MastodonInstances from "./pages/MastodonInstances";

const routes = [
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
  {
    path: "2022/mastodon-instances",
    element: <MastodonInstances />,
  },
];

export default routes;
