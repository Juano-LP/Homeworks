
import React, { useState } from "react";

export default function ImageForm({ images, setImages }) {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id || !title) return;

    const newImage = {
      id,
      title,
      url: `https://picsum.photos/id/${id}/300/200`,
    };

    const updatedImages = [...images, newImage];
    setImages(updatedImages);
    localStorage.setItem("images", JSON.stringify(updatedImages));

    // Reset form
    setId("");
    setTitle("");
    window.location.reload(); // refrescar para ver los cambios
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-4 w-full"
    >
      <input
        type="number"
        placeholder="ID de la imagen"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <input
        type="text"
        placeholder="Título de la imagen"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
      >
        Agregar
      </button>
    </form>
  );
}
