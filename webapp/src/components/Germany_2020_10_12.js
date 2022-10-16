import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import BarChart from "./PercentageBarChart";

const Predicition = () => {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary>
        <Typography variant="h4">
          Elections in Germany (12. October 2020)
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Container sx={{ margin: "70px" }}>
          <Typography variant="body">
            <b>Note: </b> Just trying to get this started. Further versions will
            be a lot nicer.
          </Typography>
        </Container>
        <Typography variant="h5">Bremen</Typography>
        <BarChart
          data={[
            { name: "FDP", percentage: 75, color: "yellow" },
            { name: "Linke", percentage: 91, color: "purple" },
            { name: "AFD", percentage: 75, color: "blue" },
          ]}
          title="Chance to be in parliament"
        />
        <br />
        <Typography variant="body">
          Stays at Red - Green: <b>98%</b> <br />
          FDP over 5%: <b>75%</b>
          <br />
          Linke over 5%: <b>91%</b>
          <br />
          AFD over 5%: <b>75%</b>
        </Typography>
        <hr style={{ margin: "50px" }} />
        <Typography variant="h5">Bavaria</Typography>
        Stays at CSU + FW: <b>93%</b>
        <br />
        Linke over 5%: <b>8%</b>
        <br />
        FDP over 5%: <b>68%</b>
        <hr style={{ margin: "50px" }} />
        <Typography variant="h5">Federal</Typography>
        Linke over 5%: <b>45%</b> <br />
        FDP over 5%: <b>65%</b>
        <br />
        Red - Green continues: <b>4%</b>
        <br />
        Union is part of government: <b>90%</b>
      </AccordionDetails>
    </Accordion>
  );
};

export default Predicition;
