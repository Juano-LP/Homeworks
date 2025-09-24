import React from "react";

function BookList({ books, count }) {
  return (
    <div>
      <h2>Books in Stack ({count})</h2>
      <ul>
        {books.map((book, index) => (
          <li key={index}>
            <b>{book.name}</b> | ISBN: {book.isbn} | {book.author} |{" "}
            {book.editorial}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
