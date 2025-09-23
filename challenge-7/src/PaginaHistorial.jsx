import React, { useState } from "react";
import { browserHistory} from "./Historial";

export default function DoublyLinkedListPage() {
    const [current, setCurrent] = useState(browserHistory.current.value);

    return  (
    <div className="p-6">
      <h1 className="text-xl font-bold">Lista Doble (Historial del navegador)</h1>
      <p className="mt-4">Página actual: {current}</p>
      <div className="flex gap-4 mt-4">
        <button 
          onClick={() => setCurrent(browserHistory.back())} 
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Atrás
        </button>
        <button 
          onClick={() => setCurrent(browserHistory.forward())} 
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Adelante
        </button>
      </div>
    </div>
  );
}