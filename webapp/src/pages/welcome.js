import {
  Box,
  ListItem,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

const Welcome = (props) => {
  const navigate = useNavigate();
  return (
    <Box>
      Back of the Envelope is my spot on the web to share predictions based on
      models. It's mainly for myself to think things through.
      <List>
        <ListItem>
          <ListItemButton onClick={() => navigate("/2022/mccarthy-speaker")}>
            <ListItemText primary="Will McCarthy become Speaker in 2023?" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => navigate("/2022/republican-primary")}>
            <ListItemText primary="Republican Primary" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => navigate("/2022/twitter-outages")}>
            <ListItemText primary="Twitter Outages" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Welcome;
