import { Container, Link, Typography } from "@mui/material";

import React, { useState, useEffect } from "react";
import SimpleTable from "../components/SimpleTable";

import Sources from "../components/Sources";

const MastodonInstances = () => {
  const [data, setData] = useState();
  const [state, setState] = useState(0);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (state === 0) {
      fetch("/data/mastodon-instances.json")
        .then((result) => result.json())
        .then((result) => {
          setData(result);
          setState(1);
        });
    }
  }, [state, setState, setData]);

  useEffect(() => {
    if (data?.data?.length > 0) {
      setRows(data.data[0].instances);
    }
  }, [data]);

  const cols = [
    {
      name: "name",
      title: "Name",
      formatter: (name) => <Link href={"https://" + name}>{name}</Link>,
    },
    { name: "users", title: "Active Users" },
  ];

  return (
    <Container>
      <Typography variant="h4">Mastodon Instances</Typography>

      <Typography variant="body1">
        List of large Mastodon instances that are federated with each other.
        Instances that are not federated with a majority of other instances in
        the list are ignored. Initial list of instances from [IS]. List of
        instances they are federated with is obtained by querying the individual
        instances.
      </Typography>

      <SimpleTable columns={cols} rows={rows} />

      <Sources list={data?.sources} />
    </Container>
  );
};

export default MastodonInstances;
