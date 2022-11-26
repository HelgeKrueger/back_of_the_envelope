import {
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

const Sources = (props) => {
  const { list } = props;
  const open = (url) => {
    window.location = url;
  };

  if (!list) {
    return <></>;
  }

  return (
    <Container sx={{ marginTop: 10 }}>
      <Typography variant="h5">Sources</Typography>
      <List dense>
        {list.map((entry) => {
          return (
            <ListItem key={entry.name}>
              <ListItemButton onClick={() => open(entry.url)}>
                <ListItemText
                  primary={
                    <div id={entry.name}>
                      <b>{entry.name}:</b> {entry.title}
                    </div>
                  }
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
};

export default Sources;
