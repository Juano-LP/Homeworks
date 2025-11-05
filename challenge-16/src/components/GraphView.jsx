import React from "react";

import { Graph as D3Graph } from "react-d3-graph";

const GraphView = ({ graph }) => {

  if (!graph || !graph.nodes) return <p>No hay datos del grafo.</p>;


  const data = {
    nodes: graph.nodes.map(id => ({ id })),
    links: Object.entries(graph.adjList || {}).flatMap(([src, dests]) =>

      Array.from(new Set(dests)).map(dst => ({ source: src, target: dst }))
    ),
  };

  const config = {
    nodeHighlightBehavior: true,
    node: {

      color: "lightblue",
      size: 500,
      highlightStrokeColor: "blue",

      labelProperty: "id",
      fontColor: "#000000",
    },
    link: {
      highlightColor: "blue",
    },
    width: 800,
    height: 500,
    directed: false,
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "15px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        display: "inline-block",
      }}
    >
      <D3Graph id="graph-id" data={data} config={config} />
    </div>
  );
};

export default GraphView;
