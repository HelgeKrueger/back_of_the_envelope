import {
  Container,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import React, { useState, useEffect } from "react";

import Sources from "../components/Sources";

const ElectionTable = ({ rows }) => {
  if (!rows) {
    return <></>;
  }

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Election Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            return (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.election_date}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Elections2023 = () => {
  const [data, setData] = useState();
  const [state, setState] = useState(0);

  useEffect(() => {
    if (state === 0) {
      fetch("/data/elections-in-2023.json")
        .then((result) => result.json())
        .then((result) => {
          setData(result);
          setState(1);
        });
    }
  }, [state, setState, setData]);

  return (
    <Container>
      <Typography variant="h4">Elections in 2023</Typography>

      <Typography variant="body1">
        I'm mostly doing this to test out my parsing library:{" "}
        <Link href="https://github.com/HelgeKrueger/cia-factbook">
          in python
        </Link>
        .
      </Typography>

      <ElectionTable rows={data?.elections} />

      <Sources list={data?.sources} />
    </Container>
  );
};

export default Elections2023;
