import React, { useState } from "react";

function ATMEntry({ onAddPerson }) {
  const [queue, setQueue] = useState({
    name: "",
    withdrawal: "",
  });

  const handleChange = (e) => {
    setQueue({ ...queue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPerson(queue);
    setQueue({
      name: "",
      withdrawal: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <input
        type="text"
        name="name"
        placeholder="Person Name"
        value={queue.name}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="withdrawal"
        placeholder="Withdrawal Amount"
        value={queue.withdrawal}
        onChange={handleChange}
        required
      />
      <button type="submit">Enter the Queue</button>
    </form>
  );
}

export default ATMEntry;
