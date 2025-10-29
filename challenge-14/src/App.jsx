import { useEffect, useState } from "react";
import Tree from "react-d3-tree";
import { BinarySearchTree } from "./BinaryTree";
import { convertToD3 } from "./data";
import "./App.css";

function App() {
  const [bst, setBst] = useState(new BinarySearchTree());
  const [treeData, setTreeData] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [traversalResult, setTraversalResult] = useState("");
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  // Inicializar árbol
  useEffect(() => {
    const initialTree = new BinarySearchTree();
    [10, 5, 15, 3, 7, 12, 18].forEach((num) => initialTree.insert(num));
    setBst(initialTree);
    setTreeData(convertToD3(initialTree.root));

    const handleResize = () => {
      setTranslate({ x: window.innerWidth / 2.15, y: 120 });
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Insertar nodo
  const handleAdd = (e) => {
    e.preventDefault();
    const value = parseInt(inputValue);
    if (isNaN(value)) return;
    bst.insert(value);
    setTreeData(convertToD3(bst.root));
    setInputValue("");
  };

  // Recorridos
  const handleTraversal = (type) => {
    let result = [];
    switch (type) {
      case "inorder":
        result = bst.inorder(bst.root);
        break;
      case "preorder":
        result = bst.preorder(bst.root);
        break;
      case "postorder":
        result = bst.postorder(bst.root);
        break;
      default:
        return;
    }
    console.log(`${type.toUpperCase()} →`, result);
    setTraversalResult(`${type.toUpperCase()}: ${result.join(" → ")}`);
  };

  // Estilos de nodo
  const nodeStyles = {
    circle: {
      fill: "#007bff",
      stroke: "#004a99",
      strokeWidth: 3,
      r: 20,
    },
    name: {
      fill: "#ffffff",
      fontWeight: "bold",
      fontSize: "14px",
    },
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f8f9fa",
        color: "#212529",
      }}
    >
      {/* Encabezado */}
      <div
        style={{
          padding: "10px",
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          zIndex: 10,
        }}
      >
        <h2 style={{ textAlign: "center", color: "#007bff", margin: "5px 0" }}>
          🌳 Binary Search Tree Visualizer
        </h2>

        <form
          onSubmit={handleAdd}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            marginBottom: "10px",
          }}
        >
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a value..."
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #007bff",
              backgroundColor: "#fff",
              color: "#000",
              width: "150px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Insert
          </button>
        </form>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <button
            onClick={() => handleTraversal("preorder")}
            style={{
              padding: "8px 16px",
              backgroundColor: "#17a2b8",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Preorder
          </button>

          <button
            onClick={() => handleTraversal("inorder")}
            style={{
              padding: "8px 16px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Inorder
          </button>

          <button
            onClick={() => handleTraversal("postorder")}
            style={{
              padding: "8px 16px",
              backgroundColor: "#ffc107",
              color: "#000",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Postorder
          </button>
        </div>

        {traversalResult && (
          <p
            style={{
              textAlign: "center",
              marginTop: "10px",
              fontWeight: "bold",
              color: "#343a40",
            }}
          >
            {traversalResult}
          </p>
        )}
      </div>

      {/* Contenedor del árbol */}
      <div
        id="treeWrapper"
        style={{
          flex: 1,
          width: "100vw",
          height: "100%",
          overflow: "hidden",
          backgroundColor: "#e9ecef",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {treeData ? (
          <Tree
            data={treeData}
            orientation="vertical"
            translate={translate}
            zoom={1.2}
            pathFunc="elbow"
            separation={{ siblings: 1.4, nonSiblings: 2 }}
            shouldCollapseNeighborNodes={false}
            collapsible={false}
            renderCustomNodeElement={({ nodeDatum }) => (
              <g>
                <circle
                  r={nodeStyles.circle.r}
                  fill={nodeStyles.circle.fill}
                  stroke={nodeStyles.circle.stroke}
                  strokeWidth={nodeStyles.circle.strokeWidth}
                />
                <text
                  fill={nodeStyles.name.fill}
                  x="0"
                  y="5"
                  textAnchor="middle"
                  style={{
                    fontWeight: nodeStyles.name.fontWeight,
                    fontSize: nodeStyles.name.fontSize,
                  }}
                >
                  {nodeDatum.name}
                </text>
              </g>
            )}
          />
        ) : (
          <p style={{ textAlign: "center" }}>Loading tree...</p>
        )}
      </div>
    </div>
  );
}

export default App;
