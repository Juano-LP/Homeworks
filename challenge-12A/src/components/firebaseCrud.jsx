import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItems, addNewItem, updateItem, deleteItem } from "../store/Thunks/firebaseThunk";

export const Crud = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.firebaseData);
  const [newBook, setNewBook] = useState({ title: "", author: "" });

  useEffect(() => {
    dispatch(getItems("books"));
  }, [dispatch]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newBook.title || !newBook.author) return alert("Completa todos los campos");
    dispatch(addNewItem("books", newBook));
    setNewBook({ title: "", author: "" });
  };

  const handleUpdate = (id) => {
    const newTitle = prompt("Nuevo título:");
    if (newTitle) dispatch(updateItem("books", id, { title: newTitle }));
  };

  const handleDelete = (id) => {
    if (confirm("¿Seguro que quieres eliminar este registro?")) {
      dispatch(deleteItem("books", id));
    }
  };

  return (
    <>
      <h3>Libros (Firestore CRUD)</h3>
      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      <input
        type="text"
        placeholder="Título"
        value={newBook.title}
        onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        style={{ marginRight: "10px" }}
      />
      <input
        type="text"
        placeholder="Autor"
        value={newBook.author}
        onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        style={{ marginRight: "10px" }}
      />
      <button onClick={handleAdd}>Agregar libro</button>
      <ul>
        {items.map((book) => (
          <li key={book.id}>
            {book.title} - {book.author}
            <button onClick={() => handleUpdate(book.id)} style={{ marginLeft: "10px" }}>
              ✏️ Editar
            </button>
            <button onClick={() => handleDelete(book.id)} style={{ marginLeft: "5px", color: "red" }}>
              🗑️ Eliminar
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};