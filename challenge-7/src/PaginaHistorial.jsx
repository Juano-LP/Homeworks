import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import DoublyLinkedList from "./Historial"; // tu clase export default

export default function PaginaHistorial() {
  const history = useRef(new DoublyLinkedList()).current;

  // cargar nodos (solo si no existen)
  if (!history.head) {
    history.append("google");
    history.append("youtube");
    history.append("github");
    history.append("twitter");
  }

  const navigate = useNavigate();
  const params = useParams();           // leer /history/:page
  const location = useLocation();

  // Estado local para la página actual (string)
  const [currentPage, setCurrentPage] = useState(() => {
    // inicial: si hay param en la url, úsalo; si no, usa head
    return params.page ?? history.getCurrent() ?? history.head?.value ?? null;
  });

  // Si la URL tiene un parámetro (p. ej. /history/github), posicionamos la lista en ese nodo.
  useEffect(() => {
    const pageFromUrl = params.page;
    if (!pageFromUrl) return;

    let node = history.head;
    while (node) {
      if (node.value === pageFromUrl) {
        history.current = node;
        setCurrentPage(node.value);
        return;
      }
      node = node.next;
    }

    // si el page param no existe en la lista -> redirigir a /history (o a head)
    navigate("/history", { replace: true });
  }, [params.page, history, navigate]);

  // Cuando `currentPage` cambia (por botones), actualizamos la URL
  useEffect(() => {
    if (!currentPage) return;

    const desiredPath = `/history/${currentPage}`;
    // Evitar navegar si ya estamos en la ruta correcta (evita bucles)
    if (!location.pathname.endsWith(`/${currentPage}`)) {
      navigate(desiredPath, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]); // intentionally only depend on currentPage

  // Handlers para los botones
  const handleBack = () => {
    const val = history.back();
    if (val) setCurrentPage(val);
  };

  const handleForward = () => {
    const val = history.forward();
    if (val) setCurrentPage(val);
  };

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
