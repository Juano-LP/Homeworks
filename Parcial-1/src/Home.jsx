import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
      <h1 className="text-5xl font-extrabold mb-6 text-gray-800">
        Bienvenido a <span className="text-blue-600">Galeria</span>
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-xl">
        Agrega imágenes desde Picsum con su ID y título, y luego filtra por
        nombre para encontrarlas fácilmente.
      </p>
      <Link
        to="/gallery"
        className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
      >
        Ir a la Galería
      </Link>
    </div>
  );
}