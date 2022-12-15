import {
  Box,
  Container,
  ListItem,
  List,
  ListItemButton,
  ListItemText,
  Button,
  Card,
  CardContent,
  Typography,
  CardActions,
  Paper,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

const Item = ({ data }) => {
  const navigate = useNavigate();

  const { title, url, description } = data;
  return (
    <Card sx={{ width: "300px", margin: "20px" }}>
      <CardContent>
        <Typography variant="h5" sx={{ marginBottom: 3 }}>
          {title}
        </Typography>
        <Typography variant="body">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => navigate(url)}>Read</Button>
      </CardActions>
    </Card>
  );
};

const Welcome = (props) => {
  const items = [
    {
      url: "/2022/mastodon-tags",
      title: "Mastodon Tags",
    },
    {
      url: "/2022/cia-factbook",
      title: "Entity names from the CIA factbook",
    },
    {
      url: "/2022/mccarthy-speaker",
      title: "Will McCarthy become Speaker in 2023?",
    },
    {
      url: "/2022/republican-primary",
      title: "Republican Primary",
      description:
        "I wonder if Trump will the Republican nominee for the 2024 presidential election ...",
    },
    {
      url: "/2022/twitter-outages",
      title: "Twitter Outages",
      description:
        "I wonder when the first Twitter outage will occur now that Musk has taken over ...",
    },
  ];

  return (
    <Box sx={{ backgroundColor: "lightskyblue", maxWidth: "900px" }}>
      <Paper
        sx={{ backgroundColor: "white", margin: 5, padding: 5 }}
        elevation={10}
      >
        Back of the Envelope is my spot on the web to share predictions based on
        models. It's mainly for myself to think things through. Basically, I
        read something in the news, and wonder what it actually means. If there
        is some data to be found, I add a computation here, that helps me
        understand what is goind on. While doing so, I slowly build this site.
        <br />
        <br />
        The list below should contain some recent computations.
      </Paper>
      <Container sx={{ display: "flex", backgroundColor: "lightskyblue" }}>
        {items.map((item) => (
          <Item data={item} key={item.url} />
        ))}
      </Container>
    </Box>
  );
};

export default Welcome;
