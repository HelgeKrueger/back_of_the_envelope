import { Container, Link, Typography } from "@mui/material";

import React, { useState, useEffect } from "react";
import SimpleTable from "../components/SimpleTable";

import Sources from "../components/Sources";

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

      <SimpleTable
        rows={data?.elections}
        columns={[
          { name: "name", title: "Name" },
          { name: "election_date", title: "Election Date" },
        ]}
      />
      <Sources list={data?.sources} />
    </Container>
  );
};

export default Elections2023;
