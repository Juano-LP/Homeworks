import React, { useState } from "react";
import GraphView from "./GraphView";
import PeopleList from "./PeopleList";
import { Graph } from "./Graph";

const GraphManager = () => {
  const [graph, setGraph] = useState(new Graph());
  const [cities, setCities] = useState([]);
  const [people, setPeople] = useState([]);

  // Inputs controlados
  const [newCity, setNewCity] = useState("");
  const [personData, setPersonData] = useState({
    name: "",
    age: "",
    city: "",
  });

  // Agregar ciudad
  const addCity = () => {
    if (!newCity.trim()) return alert("Debes escribir un nombre de ciudad.");

    const cityName = newCity.trim();

    if (cities.find(c => c.name === cityName)) {
      alert("Esa ciudad ya existe.");
      return;
    }

    const updatedCities = [...cities, { type: "city", name: cityName }];
    const newGraph = new Graph();

    // reconstruir el grafo
    updatedCities.forEach(c => newGraph.addNode(c.name));
    people.forEach(p => {
      newGraph.addNode(p.name);
      newGraph.addEdge(p.name, p.city);
    });

    setCities(updatedCities);
    setGraph(newGraph);
    setNewCity("");
  };

  // Agregar persona
  const addPerson = () => {
    const { name, age, city } = personData;

    if (!name || !age || !city)
      return alert("Completa todos los campos para agregar una persona.");

    if (!cities.find(c => c.name === city))
      return alert("La ciudad ingresada no existe.");

    if (people.find(p => p.name === name)) {
      alert("Ya existe una persona con ese nombre.");
      return;
    }

    const newPerson = { type: "person", name, age: parseInt(age), city };
    const updatedPeople = [...people, newPerson];

    const newGraph = new Graph();
    [...updatedPeople, ...cities].forEach(n => newGraph.addNode(n.name));
    updatedPeople.forEach(p => newGraph.addEdge(p.name, p.city));

    setPeople(updatedPeople);
    setGraph(newGraph);
    setPersonData({ name: "", age: "", city: "" });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Challenge 16 - Interactive Friends & Cities Graph</h1>

      <div style={{ display: "flex", gap: "40px", marginBottom: "30px" }}>
        {/* Formulario de ciudades */}
        <div>
          <h3>Agregar Ciudad</h3>
          <input
            type="text"
            placeholder="Nombre de la ciudad"
            value={newCity}
            onChange={e => setNewCity(e.target.value)}
          />
          <button onClick={addCity}>Agregar Ciudad</button>
        </div>

        {/* Formulario de personas */}
        <div>
          <h3>Agregar Persona</h3>
          <input
            type="text"
            placeholder="Nombre"
            value={personData.name}
            onChange={e =>
              setPersonData({ ...personData, name: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Edad"
            value={personData.age}
            onChange={e =>
              setPersonData({ ...personData, age: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Ciudad"
            value={personData.city}
            onChange={e =>
              setPersonData({ ...personData, city: e.target.value })
            }
          />
          <button onClick={addPerson}>Agregar Persona</button>
        </div>
      </div>

      {/* Grafo visual */}
      {graph.nodes.length > 0 ? (
        <GraphView graph={graph} />
      ) : (
        <p>Agrega ciudades y personas para generar el grafo.</p>
      )}

      {/* Listas de personas por ciudad */}
      <div style={{ marginTop: "30px" }}>
        {cities.map(c => (
          <PeopleList key={c.name} city={c.name} people={people} />
        ))}
      </div>
    </div>
  );
};

export default GraphManager;
