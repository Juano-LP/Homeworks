import React, { useState } from "react";

export default function AddCategory({ onNewCategory }) {
  const[category, setCategory] = useState('');

  const handleChange = (e) => {
    setCategory(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const value = category.trim();
    if (value.length === 0) return;
    onNewCategory(value);
    setCategory('');
  };
  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Agregar categoria"
        value={category} 
        onChange={handleChange}
        aria-label="Category "
      />
      <button type="submit" style={{ marginLeft: '0.5rem' }}>Agregar</button>
    </form>
  );
}
