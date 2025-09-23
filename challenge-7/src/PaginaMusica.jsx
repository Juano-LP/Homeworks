import React, { useState, useEffect } from "react";
import LinkedList from "./ListaMusica";

const MusicPlayer = () => {
  const [list] = useState(new LinkedList());
  const [song, setSong] = useState("");

  useEffect(() => {
    list.append("Canción 1");
    list.append("Canción 2");
    list.append("Canción 3");
    setSong(list.getCurrent());
  }, [list]);

  const handleNext = () => {
    setSong(list.nextSong());
  };

  const handleReset = () => {
    setSong(list.reset());
  };

  return (
    <div>
      <h2>Reproductor Falso</h2>
      <p>Reproduciendo: {song}</p>
      <button onClick={handleNext}>Siguiente</button>
      <button onClick={handleReset}>Reiniciar</button>
    </div>
  );
};

export default MusicPlayer; 