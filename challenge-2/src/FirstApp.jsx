import {useState} from 'react'

const FirstApp = () => {
  const [counter, setCounter] = useState(0);

  const handleAdd = () => {
    setCounter(counter + 1);
  }
    const handleSubtract = () => {
    setCounter(counter - 1);
  }
    const handleReset = () => {
    setCounter(0);
  } 
  const handleMultiply = () => {
    setCounter(counter * 2);
  } 
  const handleDivide = () => {
    setCounter(counter / 2);
  }
  const handlePower = () => {
    setCounter(counter ** 2);
  }
  const handleRadical = () => {
    setCounter(Math.sqrt(counter));
  }
  const handleLog = () => {
    setCounter(Math.log(counter));
  }
  return (
    <>
            <center>
                <h1>counter</h1>
                <h3><span>{ counter }</span></h3>
                <button onClick={handleAdd}>+1</button>
                <br />
                <button onClick={handleSubtract}>-1</button>
                <br />
                <button onClick={handleMultiply}>*2</button>
                <br />
                <button onClick={handleDivide}>/2</button>
                <br />
                <button onClick={handleReset}>reset</button>
                <br />
                <button onClick={handlePower}>x^2</button>
                <br />
                <button onClick={handleRadical}>√x</button>
                <br />
                <button onClick={handleLog}>log(x)</button>
                <br />
            </center>
        </>
    );
}
export default FirstApp;