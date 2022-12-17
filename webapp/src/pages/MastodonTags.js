import {
  Container,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import React, { useState, useEffect } from "react";

const FrequencyRow = ({ row }) => {
  return (
    <TableRow>
      <TableCell>
        <Link href={"https://mas.to/tags/" + row.tag}>{row.tag}</Link>
      </TableCell>
      <TableCell>{row.uses}</TableCell>
    </TableRow>
  );
};

const FrequencyTable = ({ rowData }) => {
  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Tag</TableCell>
            <TableCell>Uses</TableCell>
          </TableRow>
        </TableHead>
        {rowData.map((row) => {
          return <FrequencyRow row={row} key={row.tag} />;
        })}
      </Table>
    </TableContainer>
  );
};

const FrequencyTableContainer = ({ data }) => {
  const [selectedId, setSelectedId] = useState(0);

  if (data.length === 0) {
    return <></>;
  }

  return (
    <Container>
      <FormControl>
        <InputLabel id="frequency-table-id-selector-label">
          Select Date
        </InputLabel>
        <Select
          labelId="frequency-table-id-selector-label"
          value={selectedId}
          label="Select Date"
          onChange={(e) => {
            setSelectedId(e.target.value);
          }}
        >
          {data.map((row, idx) => {
            return <MenuItem value={idx}>{row["date"]}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <FrequencyTable rowData={data[selectedId].data} />
    </Container>
  );
};

const MastodonTags = () => {
  const [data, setData] = useState([]);
  const [state, setState] = useState(0);

  useEffect(() => {
    if (state === 0) {
      fetch("/data/mastodon-trending-tags.json")
        .then((result) => result.json())
        .then((result) => {
          result.reverse();
          setData(result);
          setState(1);
        });
    }
  }, [state, setState, setData]);

  return (
    <Container>
      <Typography variant="h4">MastodonTags</Typography>

      <Typography variant="body1">
        This is basically just me collecting hashtags from different Mastodon
        instances ...
      </Typography>

      <FrequencyTableContainer data={data} />
    </Container>
  );
};

export default MastodonTags;
