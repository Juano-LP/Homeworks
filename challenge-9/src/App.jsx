import { useState } from 'react';
import ATMEntry from './ATMEntry';
import ATMList from './ATMQueue';
import Queue from './Queue';
import './App.css';

const mockPeople = [
  { name: "Maria", withdrawal: 200, date: new Date(2023, 7, 30).toISOString() }, // mes 7 = agosto
  { name: "Pedro", withdrawal: 150, date: new Date(2023, 8, 1).toISOString() },
  { name: "Juan", withdrawal: 100, date: new Date(2023, 8, 2).toISOString() },  // mes 8 = septiembre
];


function App() {
  const queueInstance = new Queue();
  mockPeople.forEach((person) => queueInstance.enqueue(person));

  const [queue] = useState(queueInstance);
  const [people, setPeople] = useState(queue.getAll());

const handleAddPerson = (person) => {
  queue.enqueue(person);

  const sorted = queue.getAll().sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  setPeople(sorted);
};

  return (
    <div className="app">
      <h1>ATM Queue</h1>
      <ATMEntry onAddPerson={handleAddPerson} />
      <ATMList people={people} count={queue.size()} />
    </div>
  );
}

export default App;

