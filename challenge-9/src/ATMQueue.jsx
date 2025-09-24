import React from "react";

function ATMQueue({ people, count }) {
  return (
    <div>
      <h2>People in Queue ({count})</h2>
      <ul>
        {people.map((person, index) => (
          <li key={index}>
            <b>{person.name}</b> | Withdrawal Amount: {person.withdrawal} | Date: {new Date(person.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ATMQueue;

