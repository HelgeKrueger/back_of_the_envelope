import {
  Box,
  ListItem,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import TwitterOutages from "./TwitterOutages";

const Welcome = (props) => {
  const { setPage } = props;
  return (
    <Box>
      Back of the Envelope is my spot on the web to share predictions based on
      models. It's mainly for myself to think things through.
      <List>
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
