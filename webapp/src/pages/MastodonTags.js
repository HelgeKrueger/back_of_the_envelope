import {
  Container,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import React, { useState, useEffect } from "react";
import D3Wrapper from "../D3Wrapper";

import * as cloud from "d3-cloud";

const WordCloud = ({ data }) => {
  const renderer = (svg, data, width, height, d3) => {
    svg.selectAll("*").remove();
    // const myData = data.slice(0, 30);
    const myData = data;

    const minUses = d3.min(myData.map((x) => x.uses));
    const maxUses = d3.max(myData.map((x) => x.uses));

    const usesScale = d3
      .scaleLinear()
      .domain([minUses, maxUses])
      .range([20, 50]);

    const colors = d3.schemeTableau10;

    const words = myData.map((x) => {
      return {
        text: x.tag,
        size: "" + usesScale(x.uses),
      };
    });

    console.log(words, myData);
    console.log(minUses, maxUses);

    var layout = cloud()
      .size([width, height])
      .words(words)
      .padding(5)
      .rotate(function () {
        return ~~(Math.random() * 2) * 90;
      })
      .font("Impact")
      .fontSize(function (d) {
        return d.size;
      })
      .on("end", draw);

    layout.start();

    function draw(words) {
      svg
        .append("g")
        .attr(
          "transform",
          "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")"
        )
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", function (d) {
          return d.size + "px";
        })
        .style("font-family", "Impact")
        .attr("text-anchor", "middle")
        .style("fill", () => colors[Math.floor(Math.random() * 10)])
        .attr("transform", function (d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function (d) {
          return d.text;
        })
        .on("click", (d, x) => {
          console.log(d, x);
        });
    }
  };
  return <D3Wrapper width={800} height={600} renderer={renderer} data={data} />;
};

const FrequencyRow = ({ row }) => {
  return (
    <TableRow>
      <TableCell>
        <Link href={"https://mas.to/tags/" + row.tag}>{row.tag}</Link>
      </TableCell>
      <TableCell>{row.uses}</TableCell>
    </TableRow>
  );
};

const FrequencyTable = ({ rowData }) => {
  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Tag</TableCell>
            <TableCell>Uses</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData.map((row) => {
            return <FrequencyRow row={row} key={row.tag} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const FrequencyTableContainer = ({ data }) => {
  const [selectedId, setSelectedId] = useState(0);
  const [type, setType] = useState("cloud");

  if (data.length === 0) {
    return <></>;
  }

  return (
    <Container>
      <FormControl sx={{ margin: 2 }}>
        <InputLabel id="frequency-table-id-selector-label">
          Select Date
        </InputLabel>
        <Select
          labelId="frequency-table-id-selector-label"
          value={selectedId}
          label="Select Date"
          onChange={(e) => {
            setSelectedId(e.target.value);
          }}
        >
          {data.map((row, idx) => {
            return (
              <MenuItem value={idx} key={row["date"]}>
                {row["date"]}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl sx={{ margin: 2 }}>
        <InputLabel id="frequency-table-display-type-label">
          Select Display Type
        </InputLabel>
        <Select
          labelId="frequency-table-display-type-label"
          value={type}
          label="Select Display ype"
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          <MenuItem value="cloud">Word Cloud</MenuItem>
          <MenuItem value="table">Table</MenuItem>
        </Select>
      </FormControl>
      {type === "cloud" ? (
        <WordCloud data={data[selectedId].data} />
      ) : (
        <FrequencyTable rowData={data[selectedId].data} />
      )}
    </Container>
  );
};

const MastodonTags = () => {
  const [data, setData] = useState([]);
  const [state, setState] = useState(0);

  useEffect(() => {
    if (state === 0) {
      fetch("/data/mastodon-trending-tags.json")
        .then((result) => result.json())
        .then((result) => {
          result.reverse();
          setData(result);
          setState(1);
        });
    }
  }, [state, setState, setData]);

  return (
    <Container>
      <Typography variant="h4">MastodonTags</Typography>

      <Typography variant="body1">
        This is basically just me collecting hashtags from different Mastodon
        instances ...
      </Typography>

      <FrequencyTableContainer data={data} />
    </Container>
  );
};

export default MastodonTags;
