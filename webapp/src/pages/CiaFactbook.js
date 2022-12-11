import {
  Box,
  Container,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import PercentageBarChart from "../components/PercentageBarChart";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import * as d3 from "d3";

import Sources from "../components/Sources";

const FactbookRow = ({ even, row, columns }) => {
  const backgroundColor = even ? "lightblue" : "white";
  return (
    <TableRow sx={{ backgroundColor: backgroundColor }}>
      {columns.map((col) => {
        return <TableCell key={col}>{row[col]}</TableCell>;
      })}
    </TableRow>
  );
};

const Factbook = () => {
  const [data, setData] = useState();
  const [state, setState] = useState(0);

  const columns = [
    "filenames",
    "conventional short form",
    "conventional long form",
  ];

  useEffect(() => {
    if (state === 0) {
      fetch("/data/cia_factbook_names.csv")
        .then((result) => result.text())
        .then((result) => {
          setData(d3.csvParse(result));
          setState(1);
        });
    }
  }, [state, setState, setData]);

  if (!data) {
    return (
      <Container>
        <Typography variant="h4">Entity names from the Cia Factbook</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4">Entity names from the Cia Factbook</Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Entity name</TableCell>
            <TableCell>Short name</TableCell>
            <TableCell>Long name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, idx) => (
            <FactbookRow
              even={idx % 2 === 0}
              row={row}
              columns={columns}
              key={row.filenames}
            />
          ))}
        </TableBody>
      </Table>

      <Sources list={data?.sources} />
    </Container>
  );
};

export default Factbook;
