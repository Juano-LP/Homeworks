
import React, {useState} from "react";

function BookForm({ onAddBook }) {
    const [form, setForm] = useState({
        name: "",
        isbn: "",
        author: "",
        editorial: "",
    });

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddBook(form);
        setForm({
            name: "",
            isbn: "",
            author: "",
            editorial: "",
        });
    }
    return (
        <form onSubmit={handleSubmit} className="book-form">
            <input
                type="text"
                name="name"
                placeholder="Book Name"
                value={form.name}
                onChange={handleChange}
                required
                />
            <input
                type="text"
                name="isbn"
                placeholder="ISBN"
                value={form.isbn}
                onChange={handleChange}
                required
                />
            <input
                type="text"
                name="author"
                placeholder="Author"
                value={form.author}
                onChange={handleChange}
                required
                />
            <input
                type="text"
                name="editorial"
                placeholder="Editorial"
                value={form.editorial}
                onChange={handleChange}
                required
                />
                
            <button type="submit">Add Book</button>
        </form>
    );
}
export default BookForm;