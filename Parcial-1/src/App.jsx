import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Gallery from "./Gallery.jsx";
import Navbar from "./Navbar.jsx";

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </div>
  );
}