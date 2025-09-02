import React, { useState } from 'react';
import Child from './Child';

const App = () => {
  const [categories, setCategories] = useState([]);
  
  const handleAddCategory = (newCategory) => {
    setCategories(prevCategories => [...prevCategories, newCategory]);
  };
  
  const handleClearCategories = () => {
    setCategories([]);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">CHALLENGE 04</h1>
          <p className="text-gray-600">Gestión de Categorías - Parent & Child</p>
        </div>
        
        <Child 
          categories={categories}
          onAddCategory={handleAddCategory}
          onClearCategories={handleClearCategories}
        />
      </div>
    </div>
  );
};

export default App;
