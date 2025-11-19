import React, { useState } from 'react';

export default function CitiesPanel({ cities, selectedCityName, onAddCity, onDeleteCity, onSelectCity }) {
  const [name, setName] = useState('');

  function handleAdd(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onAddCity(trimmed);
    setName('');
  }

  return (
    <div className="cities-panel-root">
      <h3 style={{marginTop:0}}>Cities</h3>
      <form onSubmit={handleAdd} className="controls" style={{display:'flex', gap:8}}>
        <input className="city-input" value={name} onChange={e=>setName(e.target.value)} placeholder="New city name" />
        <button type="submit" className="city-add-btn">Add</button>
      </form>

      <ul className="cities-list" style={{marginTop:12}}>
        {cities.map((c) => (
          <li key={c.name} className={selectedCityName===c.name? 'selected' : ''}>
            <button className="city-btn" onClick={()=>onSelectCity(c.name)}>
              {c.name}{selectedCityName===c.name? ' ✅' : ''}
            </button>
            <button className="trash-btn" onClick={()=>onDeleteCity(c.name)} title="Delete city">🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
