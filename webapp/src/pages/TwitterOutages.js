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
import { MathJax, MathJaxContext } from "better-react-mathjax";
import React from "react";

const TwitterOutages = () => {
  return (
    <Container>
      <Typography variant="h4">Prediction of future Twitter Outages</Typography>
      I've written this on 2022-11-05. From
      <Link href="https://www.theverge.com/2022/11/4/23439790/elon-musk-twitter-layoffs-trust-and-safety-teams-severance">
        The Verge on Musk's Twitter takeover
      </Link>
      :
      <Paper elevation={6} sx={{ margin: 2, padding: 1 }}>
        “Shit is gonna start breaking,” said one current employee who requested
        anonymity to speak without the company’s permission, while another
        called management’s layoff process “an absolute shit show.”
      </Paper>
      So I'm gonna try to assign probabilities
      <Typography variant="h4">Data</Typography>
      Unfortunately, there was no easily available data for outages on Twitter.
      So I did some searching online and arrived at the following information
      for this year (10 months).
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>February: 2 Outages</TableCell>
            <TableCell>
              <Link href="https://www.theverge.com/2022/2/17/22939109/twitter-outage-down-problems-again">
                Source
              </Link>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>July: 1 Outage</TableCell>
            <TableCell>
              <Link href="https://www.theverge.com/2022/7/14/23215529/twitter-down-outage-error-capacity">
                Source
              </Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      Given the 10 Months one could say that the probability that an outage
      occurs in a month is one in five.
      <Typography variant="h4">Model</Typography>A{" "}
      <Link href="https://en.wikipedia.org/wiki/Poisson_point_process">
        Poisson Process
      </Link>{" "}
      is the natural choice to model the outage behavior. Given that the
      probability of k outages to occur is given by
      <MathJax style={{ textAlign: "center", padding: 5 }}>
        {"\\(f_{\\mu}(k, t) = \\frac{(\\mu t)^k}{k!} e^{-\\mu \\cdot t}\\)"}
      </MathJax>
      I will interpret the data as saying
      <MathJax inline>{"\\(f_{\\mu}(0, 1) = \\frac{4}{5}\\)"}</MathJax>
      from which one obtains
      <MathJax style={{ textAlign: "center", padding: 5 }}>
        {"\\(\\mu = \\log\\left( \\frac{5}{4}\\right)\\)"}
      </MathJax>
      Now the waiting time, i.e. the expection value of the time of the first
      outage is given by <MathJax inline>{"\\(1/\\mu\\)"}</MathJax>. From this,
      one can compute that an outage would be expected after 4.5 months in the
      pre Musk twitter. Now using the assumption that the probability of an
      outage doubles under Musk, one arrives at that an outage would happen
      after 2 months and a week, so roughly by
      <b>January 10th</b>.
    </Container>
  );
};

export default TwitterOutages;
