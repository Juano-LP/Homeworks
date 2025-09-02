import { useState } from 'react';


const FirstApp = ({value}) => {
    const [counter, setCounter] = useState(0)

    const handleAdd = () => {
        setCounter(counter + 1)
    }
    const handleMinus = () => {
        setCounter(counter - 1)
    }
    const handleProduct = () => {
        setCounter(counter * 2)
    }
    const handleReset = () => {
        setCounter(0)   
    }
    const handleDivide = () => {
        setCounter(counter / 2)
    }
    const handlePower = () => {
        setCounter(counter ** 2)
    }
    return (
        <>
            <center>
                <h1>counter</h1>
                <h3><span>{ counter }</span></h3>
                <button onClick={handleAdd}>+1</button>
                <br />
                <button onClick={handleMinus}>-1</button>
                <br />
                <button onClick={handleProduct}>*2</button>
                <br />
                <button onClick={handleDivide}>/2</button>
                <br />
                <button onClick={handleReset}>reset</button>
                <br />
                <button onClick={handlePower}>x^2</button>
            </center>
        </>
    );
    }
export default FirstApp
