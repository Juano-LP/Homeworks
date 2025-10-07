import { useDispatch, useSelector } from 'react-redux';
import { pushBook } from './Store/slices/bookStackSlice';
import { useState } from 'react';

export const Books = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.bookStack.books);

  const [formData, setFormData] = useState({
    name: '',
    ISBN: '',
    author: '',
    editorial: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(pushBook(formData));
    setFormData({ name: '', ISBN: '', author: '', editorial: '' });
  };

  return (
    <div>
      <h2>Book Stack</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Book Name" value={formData.name} onChange={handleChange} required />
        <input name="ISBN" placeholder="ISBN" value={formData.ISBN} onChange={handleChange} required />
        <input name="author" placeholder="Author" value={formData.author} onChange={handleChange} required />
        <input name="editorial" placeholder="Editorial" value={formData.editorial} onChange={handleChange} required />
        <button type="submit">Add Book</button>
      </form>

      <ul>
        {[...books].reverse().map((book, index) => (
          <li key={index}>
            <strong>{book.name}</strong> by {book.author} (ISBN: {book.ISBN}) — {book.editorial}
          </li>
        ))}
      </ul>
    </div>
  );
};