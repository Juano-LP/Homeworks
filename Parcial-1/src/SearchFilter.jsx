import React from "react";
import { FiSearch } from "react-icons/fi"; // 🔎 librería de íconos

export default function SearchFilter({ search, setSearch }) {
  const handleChange = (e) => {
    setSearch(e.target.value);
    localStorage.setItem("search", e.target.value);
    window.location.reload();
  };

  return (
    <div className="relative w-full md:w-1/2">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
      <input
        type="text"
        placeholder="Buscar por título..."
        value={search}
        onChange={handleChange}
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
      />
    </div>
  );
}