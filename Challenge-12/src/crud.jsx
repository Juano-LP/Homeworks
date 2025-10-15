import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchItems, addItem, updateItem, deleteItem } from "./store/slices/FirebaseSlice.js";

export default function Crud() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.firebase);

  // Cargar datos al inicio
  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleAdd = () => {
    const name = prompt("Nuevo item:");
    if (name) dispatch(addItem({ name }));
  };

  const handleUpdate = (id, currentName) => {
    const newName = prompt("Nuevo nombre:", currentName);
    if (newName && newName !== currentName) {
      dispatch(updateItem({ id, data: { name: newName } }));
    }
  };

  const handleDelete = (id) => {
    if (confirm("¿Seguro que quieres eliminar este item?")) {
      dispatch(deleteItem(id));
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2> Base de Datos</h2>
      <button onClick={handleAdd}>Agregar</button>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.name}{" "}
            <button onClick={() => handleUpdate(item.id, item.name)}>Editar</button>{" "}
            <button onClick={() => handleDelete(item.id)}>Eliminar</button>

          </li>
        ))}
      </ul>
    </div>
  );
}
