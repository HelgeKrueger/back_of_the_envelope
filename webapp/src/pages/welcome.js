import {
  Box,
  ListItem,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import TwitterOutages from "./TwitterOutages";
import RepublicanPrimary from "./RepublicanPrimary";
import USAMcCarthySpeaker from "./USAMcCarthySpeaker2023";

const Welcome = (props) => {
  const { setPage } = props;
  return (
    <Box>
      Back of the Envelope is my spot on the web to share predictions based on
      models. It's mainly for myself to think things through.
      <List>
        <ListItem>
          <ListItemButton onClick={() => setPage(<USAMcCarthySpeaker />)}>
            <ListItemText primary="Will McCarthy become Speaker in 2023?" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => setPage(<RepublicanPrimary />)}>
            <ListItemText primary="Republican Primary" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => setPage(<TwitterOutages />)}>
            <ListItemText primary="Twitter Outages" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Welcome;
