import React from "react";

export default function CategoriesList({ categories = [] }) {   
    if (categories.length === 0) return <p>No hay categorias</p>;
    return (
        <ul>
            {categories.map((category) => (
                <li key={category}>{category}</li>
            ))}
        </ul>
    );
}