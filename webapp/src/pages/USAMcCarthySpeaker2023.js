import { Box, Container, Tab, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import PercentageBarChart from "../components/PercentageBarChart";
import { TabContext, TabList, TabPanel } from "@mui/lab";

const Probabilities = ({ data }) => {
  const [tabChoice, setTabChoice] = useState();
  //   useEffect(() => {
  //     if (dependencies.length > 0 && !tabChoice) {
  //       setTabChoice(dependencies[0].name);
  //     }
  //   }, [setTabChoice, dependencies, tabChoice]);

  if (!data) {
    return <></>;
  }
  const { main, dependencies } = data;

  console.log(data, main, dependencies);

  return (
    <>
      <PercentageBarChart title={main.name} data={main.probabilities} />

      <TabContext value={tabChoice}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex" }}>
          <TabList
            onChange={(e, v) => setTabChoice(v)}
            variant="scrollable"
            scrollButtons="auto"
            orientation="vertical"
          >
            {dependencies.map((d) => (
              <Tab key={d.name} value={d.name} label={d.name} />
            ))}
          </TabList>
          {dependencies.map((d) => (
            <TabPanel value={d.name}>
              <PercentageBarChart title={d.name} data={d.probabilities} />
            </TabPanel>
          ))}{" "}
        </Box>
      </TabContext>
    </>
  );
};

const Speaker = () => {
  const [data, setData] = useState();
  const [state, setState] = useState(0);

  useEffect(() => {
    if (state === 0) {
      fetch("/data/20221125_mccarthy_speaker.json")
        .then((result) => result.json())
        .then((result) => {
          setData(result);
          setState(1);
        });
    }
  }, [state, setState, setData]);

  return (
    <Container>
      <Typography variant="h4">
        Predicting the result of the Republican Primary for the 2024
        presidential election
      </Typography>
      <Typography variant="body">
        The following estimate is based on{" "}
        <a href="https://thehill.com/homenews/house/3748648-whip-list-mccarthy-searches-for-218-gop-speakership-votes/">
          this list by TheHill
        </a>
        . It uses a simple model of assigning people a probable vote of yes or
        no. As noted in the article, it is assumed that all Democrats vote "no",
        and all not listed Republicans vote "yes".
      </Typography>
      <Probabilities data={data} />
    </Container>
  );
};

export default Speaker;
