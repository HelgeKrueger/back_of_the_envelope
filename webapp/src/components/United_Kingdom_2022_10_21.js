import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import PercentageBarChart from "./PercentageBarChart";
import Sources from "./Sources";

const Predicition = () => {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary>
        <Typography variant="h4">
          United Kingdom's Prime Minister aka Tory Leadership race (21. October
          2020)
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Container sx={{ margin: "70px" }}>
          <Typography variant="body">
            <b>Note: </b> Just getting started; Still didn't get around to build
            a proper model; just guesstimating probabilities
          </Typography>
        </Container>
        <Typography variant="h5">Saturday [G2]</Typography>
        <PercentageBarChart
          data={[
            { name: "Rishi Sunak", percentage: 40 },
            { name: "Penny Mordaunt", percentage: 20 },
            { name: "Boris Johnson", percentage: 20 },
            { name: "Suella Braverman", percentage: 5 },
            { name: "Kemi Badenoch", percentage: 5 },
            { name: "Sajid Javid", percentage: 5 },
            { name: "Grant Shapps", percentage: 5 },
            { name: "Ben Wallace", percentage: 0 },
          ]}
          title="Chance to be next prime minister"
        />
        <Typography variant="h5">Friday [G1]</Typography>
        <PercentageBarChart
          data={[
            { name: "Rishi Sunak", percentage: 12 },
            { name: "Penny Mordaunt", percentage: 12 },
            { name: "Boris Johnson", percentage: 12 },
            { name: "Suella Braverman", percentage: 12 },
            { name: "Kemi Badenoch", percentage: 12 },
            { name: "Sajid Javid", percentage: 12 },
            { name: "Grant Shapps", percentage: 12 },
            { name: "Ben Wallace", percentage: 12 },
          ]}
          title="Chance to be next prime minister"
        />
        <Sources
          list={[
            {
              name: "G1",
              title:
                "The Guardian: Boris Johnson, Penny Mordaunt, Rishi Sunak? The MPs who could be PM",
              url: "https://www.theguardian.com/politics/2022/oct/20/who-could-replace-liz-truss-as-prime-minister",
            },
            {
              name: "G2",
              title:
                "The Guardian: Johnson, Mordaunt or Sunak: who is backing whom as next Tory leader",
              url: "https://www.theguardian.com/politics/2022/oct/21/boris-johnson-penny-mordaunt-rishi-sunak-who-backing-next-tory-leader",
            },
          ]}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default Predicition;
