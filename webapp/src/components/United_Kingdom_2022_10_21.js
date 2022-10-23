import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import PercentageBarChart from "./PercentageBarChart";
import Sources from "./Sources";
import SyntaxHighlighter from "react-syntax-highlighter";

const Predicition = () => {
  const code1 = `mp_votes_base = {
    'johnson': 52,
    'sunak': 111,
    'mordaunt': 23,
    'other': 0
} # From G3
total_mp_tories = 357

left_over_mp = total_mp_tories - sum(mp_votes_base.values())
print(f"Remaining MPS {left_over_mp}")

def random_vote():
    votes = dict(mp_votes_base)
    for _ in range(left_over_mp):
        possible_choices = [key for key, value in votes.items()]
        vote  = random.choice(possible_choices)
        votes[vote] += 1
    return votes

chances = {name: 0 for name in mp_votes_base.keys()}

for _ in range(1000):
    vote = random_vote()
    choices = [key for key, value in vote.items() if value >= 100]
    next_pm = random.choice(choices)
    chances[next_pm] += 1

chances

{'johnson': 101, 'sunak': 899, 'mordaunt': 0, 'other': 0}
`;
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
        <Typography variant="h5">Sunday morning [G3] + simple model</Typography>
        <PercentageBarChart
          data={[
            { name: "Rishi Sunak", percentage: 93 },
            { name: "Penny Mordaunt", percentage: 0 },
            { name: "Boris Johnson", percentage: 7 },
          ]}
          title="Chance to be next prime minister"
        />
        <Typography variant="h5">Saturday [G3] + simple model</Typography>
        <Container>
          <PercentageBarChart
            data={[
              { name: "Rishi Sunak", percentage: 90 },
              { name: "Penny Mordaunt", percentage: 0 },
              { name: "Boris Johnson", percentage: 10 },
            ]}
            title="Chance to be next prime minister"
          />
          Using G3 and
          <SyntaxHighlighter language="python">{code1}</SyntaxHighlighter>
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
            {
              name: "G3",
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
