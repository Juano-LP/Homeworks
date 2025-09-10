import React, { useState } from "react";
import AddCategory from "./AddCategory";
import CategoriesList from "./CategorygiList";

export default function App() {
  const [categories, setCategories] = useState([]);

  const onAddCategory = (newCategory) => {
    if (!newCategory || newCategory.trim().length === 0) return;

    setCategories(prev => [newCategory.trim(), ...prev]);
  };
  
  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', fontFamily: 'Arial, sans-serif', padding: '0 1rem' }}>
     <h1>Lista de Categorias</h1>
     <AddCategory onNewCategory={onAddCategory} />
     <hr />
     <CategoriesList categories={categories} />
    </div>
  );
} 


