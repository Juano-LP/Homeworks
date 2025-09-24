import React, { useState } from "react";

function ATMEntry({ onAddPerson }) {
  const [queue, setQueue] = useState({
    name: "",
    withdrawal: "",
    Day: "",
    Month: "",
    Year: "",
    
  });

  const handleChange = (e) => {
    setQueue({ ...queue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();


  const date = new Date(queue.Year, queue.Month - 1, queue.Day); 
  

  const personWithDate = {
    name: queue.name,
    withdrawal: Number(queue.withdrawal),
    date: date.toISOString(), 
  };

  onAddPerson(personWithDate);

  // Reset inputs
  setQueue({
    name: "",
    withdrawal: "",
    Day: "",
    Month: "",
    Year: "",
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
        <input
        type="number"
        name="Day"
        placeholder="Day"
        value={queue.Day}
        onChange={handleChange}
        required
        />
        <input
        type="number"
        name="Month"
        placeholder="Month"
        value={queue.Month}
        onChange={handleChange}
        required
        />
        <input
        type="number"
        name="Year"
        placeholder="Year"
        value={queue.Year}
        onChange={handleChange}
        required
        />
      <button type="submit">Enter the Queue</button>
    </form>
  );
}

export default ATMEntry;
