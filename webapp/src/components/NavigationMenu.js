import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";

import Germany from "../pages/germany";
import UnitedKingdom from "../pages/unitedkingdom";
import Welcome from "../pages/welcome";
const NavigationMenu = (props) => {
  const { setPage } = props;
  return (
    <Drawer variant="permanent" sx={{ backgroundColor: "lightgray" }}>
      <List sx={{ width: "300px" }}>
        <ListItem>
          <ListItemButton
            onClick={() => {
              setPage(<Welcome setPage={setPage} />);
            }}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItemButton>
        </ListItem>{" "}
        <ListItem>
          <ListItemButton
            onClick={() => {
              setPage(<Germany />);
            }}
          >
            <ListItemText primary={"Germany"} />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            onClick={() => {
              setPage(<UnitedKingdom />);
            }}
          >
            <ListItemText primary={"United Kingdom"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default NavigationMenu;
