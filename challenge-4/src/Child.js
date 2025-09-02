import React, { useState } from 'react';


const CategoryInput = ({ onAddCategory }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddCategory = () => {
    if (inputValue.trim()) {
      onAddCategory(inputValue.trim());
      setInputValue(''); 
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Agregar Nueva Categoría</h3>
      <div className="flex gap-3">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Escribe una categoría..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
        <button
          onClick={handleAddCategory}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium"
        >
          Agregar
        </button>
      </div>
    </div>
  );
};


const CategoryList = ({ categories, onClearCategories }) => {
 
  if (!categories) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700">
          Categorías ({categories.length})
        </h3>
        {categories.length > 0 && (
          <button
            onClick={onClearCategories}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 text-sm"
          >
            Limpiar Todo
          </button>
        )}
      </div>
      
      {categories.length === 0 ? (
        <p className="text-gray-500 italic">No hay categorías aún. ¡Agrega la primera!</p>
      ) : (
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li
              key={index}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border-l-4 border-blue-400"
            >
              <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </span>
              <span className="text-gray-700 font-medium">{category}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Child = ({ categories, onAddCategory, onClearCategories }) => {
  console.log('Categories received:', categories); // TEMPORAL para debug
  
  return (
    <div className="space-y-6">
      <CategoryInput onAddCategory={onAddCategory} />
      <CategoryList categories={categories} onClearCategories={onClearCategories} />
    </div>
  );
};

export default Child;