import React from "react";

const PeopleList = ({ people, city }) => {
  const filtered = people.filter(p => p.city === city);

  return (
    <div>
      <h3>Personas en {city}:</h3>
      {filtered.length ? (
        <ul>
          {filtered.map(p => (
            <li key={p.name}>
              {p.name} ({p.age} años)
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay personas registradas.</p>
      )}
    </div>
  );
};

export default PeopleList;
