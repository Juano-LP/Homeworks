import { useState } from "react";
import Sidebar from "./Sidebar";

function App() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="flex">
      <Sidebar onSelect={setSelected} />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-3">Challenge 15</h1>
        {selected ? (
          <div className="p-4 bg-gray-700 text-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{selected.title}</h2>
            <p>Ruta: <span className="text-blue-300">{selected.link}</span></p>
          </div>
        ) : (
          <p className="text-gray-400">Selecciona una opción del menú lateral.</p>
        )}
      </div>
    </div>
  );
}

export default App;
