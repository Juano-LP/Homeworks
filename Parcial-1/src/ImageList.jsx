import React from "react";


export default function ImageList({ images }) {
  if (!images || images.length === 0) {
    return <p className="text-center text-gray-400">No hay imágenes para mostrar</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {images.map((img) => (
        <div
          key={img.id}
          className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition"
        >
          <img
            src={img.url}
            alt={img.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-3 text-center">
            <h3 className="font-semibold text-lg">{img.title}</h3>
            <p className="text-sm text-gray-400">ID: {img.id}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

