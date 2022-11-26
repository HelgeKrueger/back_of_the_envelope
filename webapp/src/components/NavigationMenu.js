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

import { useNavigate } from "react-router-dom";

const NavigationMenu = (props) => {
  const navigate = useNavigate();
  return (
    <Drawer variant="permanent" sx={{ backgroundColor: "lightgray" }}>
      <List sx={{ width: "300px" }}>
        <ListItem>
          <ListItemButton onClick={() => navigate("/")}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItemButton>
        </ListItem>{" "}
        <ListItem>
          <ListItemButton onClick={() => navigate("/germany")}>
            <ListItemText primary={"Germany"} />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => navigate("/united-kingdom")}>
            <ListItemText primary={"United Kingdom"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default NavigationMenu;
