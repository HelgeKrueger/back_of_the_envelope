import {
  Container,
  Link,
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

const FrequencyTable = ({ data }) => {
  if (data.length === 0) {
    return <></>;
  }

  const rowData = data[0]["data"];
  console.log(rowData);
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

const MastodonTags = () => {
  const [data, setData] = useState([]);
  const [state, setState] = useState(0);

  useEffect(() => {
    if (state === 0) {
      fetch("/data/mastodon-trending-tags.json")
        .then((result) => result.json())
        .then((result) => {
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

      <FrequencyTable data={data} />
    </Container>
  );
};

export default MastodonTags;
