import React, { useState } from 'react';
import { songsList } from './LinkedList';

export default function LinkedListPage() {
    const [songs, setSongs] = useState(songsList.traverse());
    const addSong = () => {
    songsList.insert(`New Song ${songs.length + 1}`);
    setSongs(songsList.traverse()); // 🔥 actualiza el estado con la nueva lista
  };

    return(
        <div className="p-6">
      <h1 className="text-xl font-bold">Lista Simple (Canciones)</h1>
      <button 
        onClick={addSong} 
        className="px-4 py-2 bg-blue-500 text-white rounded mt-4"
      >
        Agregar Canción
      </button>
      <ul className="mt-4">
        {songs.map((song, idx) => (
          <li key={idx} className="p-2 border-b">{song}</li>
        ))}
      </ul>
    </div>
  );
}