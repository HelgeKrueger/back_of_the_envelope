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
            <b>Note: </b> Just getting started
          </Typography>
        </Container>
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
              title:
                "The Guardian: Boris Johnson, Penny Mordaunt, Rishi Sunak? The MPs who could be PM",
              url: "https://www.theguardian.com/politics/2022/oct/20/who-could-replace-liz-truss-as-prime-minister",
            },
          ]}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default Predicition;
