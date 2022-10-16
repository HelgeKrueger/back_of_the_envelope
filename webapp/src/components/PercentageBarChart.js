import * as d3 from "d3";
import { useEffect, useRef } from "react";

const BarChart = (props) => {
  const { data, title } = props;
  const width = 600;
  const height = 300;
  const margin = { top: 50, bottom: 20, right: 20, left: 20 };
  const svgElementRef = useRef(null);

  useEffect(() => {
    if (svgElementRef.current) {
      const svg = d3.select(svgElementRef.current);

      const plotWidth = width - margin.left - margin.right;
      const plotHeight = height - margin.top - margin.bottom;

      const names = data.map((x) => x.name);

      const x = d3.scaleLinear([0, 100], [0, plotWidth]);
      const y = d3.scaleBand(names, [0, plotHeight]).padding(0.1);

      const xAxis = d3.axisTop(x);

      svg.selectAll("*").remove();
      svg
        .append("g")
        .append("text")
        .attr("y", 20)
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .attr("font-size", 20)
        .text(title);

      const plotArea = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      plotArea
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", plotWidth)
        .attr("height", plotHeight)
        .attr("fill", "white")
        .attr("stroke", "black");

      plotArea.append("g").call(xAxis);

      plotArea
        .append("g")
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", 0)
        .attr("y", (entry) => y(entry.name))
        .attr("width", (entry) => x(entry.percentage))
        .attr("height", y.bandwidth())
        .attr("stroke", "black")
        .attr("fill", (entry) => entry.color);

      plotArea
        .append("g")
        .selectAll("text")
        .data(data)
        .join("text")
        .attr("x", 20)
        .attr("y", (entry) => y(entry.name) + y.bandwidth() / 2 + 7)
        .attr("text-anchor", "start")
        .attr("font-size", 18)
        .text((entry) => entry.name);
    }
  }, [data, title]);

  return (
    <svg
      width={width}
      height={height}
      ref={svgElementRef}
      style={{ background: "lightgrey" }}
    ></svg>
  );
};

export default BarChart;
