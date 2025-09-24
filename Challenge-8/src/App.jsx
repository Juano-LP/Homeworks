import React, { useState,} from "react";
import BookForm from "./BookForm";
import BookList from "./BookList";
import Stack from "./Stack";
import "./App.css";

const mockBooks = [
  { name: "El Quijote", isbn: "978-84-376-0494-7", author: "Cervantes", editorial: "Espasa" },
  { name: "Cien Años de Soledad", isbn: "978-84-376-0494-8", author: "García Márquez", editorial: "Sudamericana" },
  { name: "La Odisea", isbn: "978-84-376-0494-9", author: "Homero", editorial: "Gredos" }
];

function App() {
  const stackInstance = new Stack();
  mockBooks.forEach((book) => stackInstance.push(book));

  const [stack] = useState(stackInstance);
  const [books, setBooks] = useState(stack.getAll());

  const handleAddBook = (book) => {
    stack.push(book);
    setBooks(stack.getAll());
  };

  const handleRemoveBook = () => {
    stack.pop();
    setBooks(stack.getAll());
  };

  return (
    <div className="app">
      <h1> Books Stack</h1>
      <BookForm onAddBook={handleAddBook} />
      <button onClick={handleRemoveBook} disabled={stack.isEmpty()}>
        Remove Last Book
      </button>
      <BookList books={books} count={stack.size()} />
    </div>
  );
}

export default App;