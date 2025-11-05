import React from "react";
import GraphManager from "./components/GraphManager";

const App = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Challenge 16</h1>

      <div style={styles.content}>
        <div style={styles.formPanel}>
          <GraphManager />
        </div>
      </div>
    </div>
  );
};

export default App;

const styles = {
  container: {
    backgroundColor: "#1e1e1e",
    minHeight: "100vh",
    padding: "20px",
    color: "#fff",
  },
  title: {
    textAlign: "center",
    fontSize: "28px",
    marginBottom: "20px",
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  formPanel: {
    backgroundColor: "#2b2b2b",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
    maxWidth: "1200px",
    width: "100%",
  },
};
