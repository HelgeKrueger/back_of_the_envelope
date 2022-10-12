import { useEffect } from "react";
import * as d3 from "d3";

const makePie = (svg, data, radius) => {
  const arcs = d3.pie().value((d) => d.percentage)(data);
  const arc = d3.arc().innerRadius(0).outerRadius(radius);
  svg
    .append("g")
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    // .attr("stroke-linejoin", strokeLinejoin)
    .selectAll("path")
    .data(arcs)
    .join("path")
    .attr("fill", (d) => d.data.color)
    .attr("d", arc);
};

const PieChart = (props) => {
  const { data } = props;

  useEffect(() => {
    const width = 500;
    const height = 300;
    const svg = d3.select("#area");

    svg
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    const pies = [0, 1, 2]
      .map((id) =>
        svg.append("g").attr("transform", `translate(${60 + id * 120},60)`)
      )
      .concat(
        [0, 1].map((id) =>
          svg.append("g").attr("transform", `translate(${120 + id * 120},180)`)
        )
      );

    makePie(
      pies[0],
      [
        { percentage: 50, color: "red" },
        { percentage: 50, color: "green" },
      ],
      50
    );
    makePie(
      pies[1],
      [
        { percentage: 50, color: "red" },
        { percentage: 50, color: "green" },
      ],
      50
    );
    makePie(
      pies[2],
      [
        { percentage: 50, color: "red" },
        { percentage: 50, color: "green" },
      ],
      50
    );
    makePie(
      pies[3],
      [
        { percentage: 50, color: "red" },
        { percentage: 50, color: "black" },
      ],
      50
    );
    makePie(
      pies[4],
      [
        { percentage: 33, color: "red" },
        { percentage: 33, color: "green" },
        { percentage: 33, color: "yellow" },
      ],
      50
    );
    // svg
    //   .append("g")
    //   .attr("font-family", "sans-serif")
    //   .attr("font-size", 20)
    //   .attr("text-anchor", "middle")
    //   .attr("font-weight", "bold")
    //   .attr("filter", "url(#shadow)")
    //   .selectAll("text")
    //   .data(arcs)
    //   .join("text")
    //   .attr("transform", (d) => `translate(${arc.centroid(d)})`)
    //   .text((d) => d.data.name);
  }, [data]);

  return (
    <svg width="500" height="300" id="area">
      <defs>
        <filter id="shadow">
          <feDropShadow
            dx="-2"
            dy="-2"
            stdDeviation="0"
            flood-color="#3e68ff"
          ></feDropShadow>
          <feDropShadow
            dx="2"
            dy="-2"
            stdDeviation="0"
            flood-color="#3e68ff"
          ></feDropShadow>
          <feDropShadow
            dx="2"
            dy="2"
            stdDeviation="0"
            flood-color="#3e68ff"
          ></feDropShadow>
          <feDropShadow
            dx="-2"
            dy="2"
            stdDeviation="0"
            flood-color="#3e68ff"
          ></feDropShadow>
        </filter>
      </defs>
    </svg>
  );
};

export default PieChart;
