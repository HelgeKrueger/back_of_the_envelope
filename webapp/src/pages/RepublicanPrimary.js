import {
  Container,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import PercentageBarChart from "../components/PercentageBarChart";

const RepublicanPrimary = () => {
  return (
    <Container>
      <Typography variant="h4">
        Predicting the result of the Republican Primary for the 2024
        presidential election
      </Typography>

      <Typography variant="body">
        The following prediction is based on two questions --- I can't answer so
        I choose randomly --- 1. Will Trump be able to run? 2. Who will people
        vote for? I decided to give Trump and DeSantis equal chance to get a
        vote. Other candidates chances are smaller.
      </Typography>

      <div style={{ margin: "20px" }}>
        <PercentageBarChart
          data={[
            { name: "DeSantis", percentage: 46 },
            { name: "Other", percentage: 33 },
            { name: "Trump", percentage: 21 },
          ]}
          title="Chance to be next Republican nominee"
        />
      </div>
    </Container>
  );
};

export default RepublicanPrimary;
