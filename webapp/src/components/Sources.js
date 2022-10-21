import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

const Sources = (props) => {
  const { list } = props;
  const open = (url) => {
    window.location = url;
  };
  return (
    <List>
      {list.map((entry) => {
        return (
          <ListItem>
            <ListItemButton onClick={() => open(entry.url)}>
              <ListItemText primary={entry.title} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default Sources;
