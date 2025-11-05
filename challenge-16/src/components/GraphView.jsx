import React from "react";
// Renombramos la importación para evitar conflicto con tu modelo Graph
import { Graph as D3Graph } from "react-d3-graph";

const GraphView = ({ graph }) => {
  // Si no hay graph, mostramos mensaje simple
  if (!graph || !graph.nodes) return <p>No hay datos del grafo.</p>;

  // Convertir tu modelo { nodes: [...], adjList: { node: [...] } }
  // a la forma que requiere react-d3-graph
  const data = {
    nodes: graph.nodes.map(id => ({ id })),
    links: Object.entries(graph.adjList || {}).flatMap(([src, dests]) =>
      // evitamos duplicados si la lista tiene entradas repetidas
      Array.from(new Set(dests)).map(dst => ({ source: src, target: dst }))
    ),
  };

  const config = {
    nodeHighlightBehavior: true,
    node: {
      // puedes personalizar aquí
      color: "lightblue",
      size: 500,
      highlightStrokeColor: "blue",
      // labelProperty es el campo de cada nodo que se usará como etiqueta
      labelProperty: "id",
      // fuerza texto oscuro si tu fondo es claro
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
