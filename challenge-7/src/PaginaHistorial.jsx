import React, { useRef, useState } from "react";
import DoublyLinkedList from "./Historial";

export default function PaginaHistorial() {
  const history = useRef(new DoublyLinkedList()).current;

  // Cargar solo una vez
  if (!history.head) {
    history.append("google.com");
    history.append("youtube.com");
    history.append("github.com");
    history.append("twitter.com");
  }

  const [currentPage, setCurrentPage] = useState(history.getCurrent());

  const handleBack = () => setCurrentPage(history.back());
  const handleForward = () => setCurrentPage(history.forward());

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">🌐 Historial Navegador</h1>
      <p className="mb-4">Página actual: <b>{currentPage}</b></p>
      <div className="flex gap-4">
        <button onClick={handleBack} className="px-4 py-2 bg-gray-400 text-white rounded">
          Atrás
        </button>
        <button onClick={handleForward} className="px-4 py-2 bg-gray-700 text-white rounded">
          Adelante
        </button>
      </div>
    </div>
  );
}
