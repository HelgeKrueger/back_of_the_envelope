import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import React from "react";

const HandleCell = ({ col, row }) => {
  if (col.formatter) {
    return <TableCell>{col.formatter(row[col.name])}</TableCell>;
  }
  return <TableCell>{row[col.name]}</TableCell>;
};

const SimpleTable = ({ rows, columns }) => {
  if (!rows) {
    return <></>;
  }

  const keyField = columns[0]["name"];

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.name}>{col.title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            return (
              <TableRow key={row[keyField]}>
                {columns.map((col) => (
                  <HandleCell key={col.name} col={col} row={row} />
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SimpleTable;
