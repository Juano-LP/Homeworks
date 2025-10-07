import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementBy } from './Store/slices/counterSlice';
import { useState } from 'react';
import './App.css';
import { Books } from './Books'; 

export const App = () => {
  const dispatch = useDispatch();
  const { count } = useSelector((state) => state.counter);
  const [inputValue, setInputValue] = useState(0);

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  const handleIncrementBy = () => {
    const number = parseInt(inputValue, 10);
    if (!isNaN(number)) {
      dispatch(incrementBy(number));
    }
  };

  return (
    <>
      <h1>Redux Counter & Book Stack</h1>
      <p>Counter is: {count}</p>

      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>

      <input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter a number"
      />
      <button onClick={handleIncrementBy}>Increment by value</button>

      <hr />

      <Books /> {}
    </>
  );
};