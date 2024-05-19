import React from 'react';
import './calculator.css';

const Calculator = () => {
  return (
    <div className="calculator-container">
      <iframe
        src='./Calculator.html'
        width={900}
        height={600}
        frameBorder={0}
        title="Calculator"
      ></iframe>
    </div>
  );
}

export default Calculator;