import React, {useState} from "react";
import ImageForm from "./ImageForm.jsx";
import ImageList from "./ImageList.jsx";
import SearchFilter from "./SearchFilter.jsx";
import './App.css'  
export default function Gallery() {
  const [images, setImages] = useState(() => {
    const stored = localStorage.getItem("images");
    return stored ? JSON.parse(stored) : [];
  });
  const [search, setSearch] = useState(localStorage.getItem("search") || "");

  const filteredImages = images.filter((image) =>
    image.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
<div className="container mx-auto p-6">
  <h1 className="text-3xl font-bold mb-6 text-center">📸 Image Gallery</h1>
  
  <ImageForm images={images} setImages={setImages} />
  <SearchFilter search={search} setSearch={setSearch} />


  <div className="mt-8">
    <ImageList images={filteredImages} />
  </div>
</div>
);
}