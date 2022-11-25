import D3Wrapper from "../D3Wrapper";

const BarChart = (props) => {
  const { data, title, colorFunction } = props;
  const width = 600;
  const height = 70 + data.length * 50;
  const margin = { top: 50, bottom: 20, right: 20, left: 20 };

  const renderer = (svg, data, width, height, d3) => {
    // svg.selectAll("*").remove();

    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;
    const myData = [...data.data];
    const title = data.title;

    const names = myData.map((x) => x.name);

    const x = d3.scaleLinear([0, 100], [0, plotWidth]);
    const y = d3.scaleBand(names, [0, plotHeight]).padding(0.1);

    const xAxis = d3.axisTop(x);

    const colorScheme = d3.scaleOrdinal(d3.schemePastel1);

    let defs = svg.append("defs");

    for (let idx in myData) {
      if (!myData[idx].color) {
        if (colorFunction) {
          const name = myData[idx].name;
          const pieces = name.split(" ");

          if (pieces.length === 1) {
            myData[idx].color = colorFunction(name);
          } else {
            const id = pieces.join("_");
            const pattern = defs
              .append("pattern")
              .attr("id", id)
              .attr("x", 0)
              .attr("y", 0)
              .attr("width", 0.1)
              .attr("height", "1.0");

            pattern
              .append("rect")
              .attr("x", 0)
              .attr("y", 0)
              .attr("height", "30")
              .attr("width", "10000")
              .attr("fill", colorFunction(pieces[0]));
            const height = 20 / (pieces.length - 1);
            for (let j = 1; j < pieces.length; j++) {
              pattern
                .append("rect")
                .attr("x", 0)
                .attr("y", 30 + height * (j - 1))
                .attr("height", height)
                .attr("width", "10000")
                .attr("fill", colorFunction(pieces[j]));
            }
            myData[idx].color = `url(#${id})`;
          }
        }
        if (!myData[idx].color) {
          myData[idx].color = colorScheme(idx);
        }
      }
    }

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
      .data(myData)
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
      .data(myData)
      .join("text")
      .attr("x", 20)
      .attr("y", (entry) => y(entry.name) + y.bandwidth() / 2 + 7)
      .attr("text-anchor", "start")
      .attr("font-size", 18)
      .text((entry) => entry.name);
  };

  return (
    <div style={{ margin: "20px" }}>
      <D3Wrapper
        data={{ data, title }}
        width={width}
        height={height}
        renderer={renderer}
      />
    </div>
  );
};

export default BarChart;
