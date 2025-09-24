import { useState } from 'react';
import ATMEntry from './ATMEntry';
import ATMList from './ATMQueue';
import Queue from './Queue';
import './App.css';

const mockPeople = [
  { name: "Juan", withdrawal: 100 },
  { name: "Maria", withdrawal: 200 },
  { name: "Pedro", withdrawal: 150 }
];

function App() {
  const queueInstance = new Queue();
  mockPeople.forEach((person) => queueInstance.enqueue(person));

  const [queue] = useState(queueInstance);
  const [people, setPeople] = useState(queue.getAll());

  const handleAddPerson = (person) => {
    queue.enqueue(person);
    setPeople(queue.getAll());
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

