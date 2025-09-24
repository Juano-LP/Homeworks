import { Routes, Route, Link } from "react-router-dom";
import LinkedListPage from "./PaginaMusica";
import DoublyLinkedListPage from "./PaginaHistorial";
import "./App.css";
function App() {
  return (
    <div className="p-6">
      <nav className="flex gap-4 mb-6">
        <Link to="/linked">Lista Simple</Link>
        <Link to="/history">Lista Doble</Link>
      </nav>
      <Routes>
        <Route path="/linked" element={<LinkedListPage />} />
        <Route path="/history" element={<DoublyLinkedListPage />} />
      </Routes>
    </div>
  );
}

export default App;

