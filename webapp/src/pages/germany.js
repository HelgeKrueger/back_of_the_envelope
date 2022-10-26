import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import * as d3 from "d3";

import Germany20201012 from "../components/Germany_2020_10_12";
import PercentageBarChart from "../components/PercentageBarChart";
import { Container } from "@mui/system";

const colorMapping = {
  CDU: 8,
  CSU: 8,
  "GR\u00dcNE": 6,
  SPD: 3,
  LINKE: 7,
  AfD: 4,
  FDP: 1,
  FW: 5,
};

const colorByParty = (name) => {
  const id = colorMapping[name];
  return d3.schemeSet3[id];
};

const State = (props) => {
  const { name, data } = props;

  return (
    <Container>
      <Typography variant="h5">{name}</Typography>
      {Object.keys(data).map((title) => (
        <React.Fragment key={title}>
          <PercentageBarChart
            title={title}
            data={data[title]}
            colorFunction={colorByParty}
            key={name + title}
          />
          <br />
        </React.Fragment>
      ))}
    </Container>
  );
};
const Germany = () => {
  const [data, setData] = useState({});
  const [state, setState] = useState(0);

  useEffect(() => {
    if (state === 0) {
      fetch("/data/election_data_20221026.json")
        .then((result) => result.json())
        .then((result) => {
          console.log(result);
          setData(result);
          setState(1);
        });
    }
  }, [state, setData, setState]);

  return (
    <Box>
      <Typography variant="h3">Predictions for Germany</Typography>

      {Object.keys(data).map((key) => (
        <State name={key} data={data[key]} key={key} />
      ))}

      <Germany20201012 />
    </Box>
  );
};

export default Germany;
