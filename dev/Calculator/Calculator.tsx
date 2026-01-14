import React, { useState } from 'react';
import './Calculator.css';

// Icons
const BackspaceIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
    <line x1="18" y1="9" x2="12" y2="15" />
    <line x1="12" y1="9" x2="18" y2="15" />
  </svg>
);

/**
 * A simple calculator app for demonstration.
 */
export function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [expression, setExpression] = useState('');
  const [memory, setMemory] = useState<number>(0);
  const [hasMemory, setHasMemory] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
    setExpression('');
  };

  const clearEntry = () => {
    setDisplay('0');
  };

  const backspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const memoryClear = () => {
    setMemory(0);
    setHasMemory(false);
  };

  const memoryRecall = () => {
    setDisplay(String(memory));
    setWaitingForOperand(true);
  };

  const memoryAdd = () => {
    const value = parseFloat(display);
    setMemory(prev => prev + value);
    setHasMemory(true);
    setWaitingForOperand(true);
  };

  const memorySubtract = () => {
    const value = parseFloat(display);
    setMemory(prev => prev - value);
    setHasMemory(true);
    setWaitingForOperand(true);
  };

  const memoryStore = () => {
    setMemory(parseFloat(display));
    setHasMemory(true);
    setWaitingForOperand(true);
  };

  const performUnaryOperation = (op: string) => {
    const value = parseFloat(display);
    let result = 0;
    switch (op) {
      case '1/x': result = 1 / value; break;
      case 'x2': result = value * value; break;
      case 'sqrt': result = Math.sqrt(value); break;
      case '%': result = value / 100; break;
      case 'negate': result = -value; break;
      default: return;
    }
    setDisplay(String(result));
    setWaitingForOperand(true);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
      setExpression(display + ' ' + nextOperation);
    } else if (operation) {
      const currentValue = previousValue;
      let newValue = currentValue;

      switch (operation) {
        case '+':
          newValue = currentValue + inputValue;
          break;
        case '-':
          newValue = currentValue - inputValue;
          break;
        case '×':
          newValue = currentValue * inputValue;
          break;
        case '÷':
          newValue = inputValue !== 0 ? currentValue / inputValue : 0;
          break;
      }

      setDisplay(String(newValue));
      setPreviousValue(newValue);

      if (nextOperation === '=') {
        setExpression(expression + ' ' + inputValue + ' =');
        setPreviousValue(null);
      } else {
        setExpression(String(newValue) + ' ' + nextOperation);
      }
    }

    setWaitingForOperand(true);
    setOperation(nextOperation === '=' ? null : nextOperation);
  };

  return (
    <div className="nc-calculator">
      {/* Display */}
      <div className="nc-calculator-display">
        <div className="nc-calculator-expression">
          {expression}
        </div>
        <div className="nc-calculator-result">
          {display}
        </div>
      </div>

      {/* Memory buttons */}
      <div className="nc-calculator-memory">
        <button disabled={!hasMemory} onClick={memoryClear}>MC</button>
        <button disabled={!hasMemory} onClick={memoryRecall}>MR</button>
        <button onClick={memoryAdd}>M+</button>
        <button onClick={memorySubtract}>M-</button>
        <button onClick={memoryStore}>MS</button>
        <button disabled>Mˇ</button>
      </div>

      {/* Button grid - 6x4 */}
      <div className="nc-calculator-grid">
        {/* Row 1 */}
        <button className="nc-calculator-button nc-op-top" onClick={() => performUnaryOperation('%')}>%</button>
        <button className="nc-calculator-button nc-op-top" onClick={clearEntry}>CE</button>
        <button className="nc-calculator-button nc-op-top" onClick={clear}>C</button>
        <button className="nc-calculator-button nc-op-top" onClick={backspace}><BackspaceIcon /></button>

        {/* Row 2 */}
        <button className="nc-calculator-button nc-op-top" onClick={() => performUnaryOperation('1/x')}><sup>1</sup>/<sub>x</sub></button>
        <button className="nc-calculator-button nc-op-top" onClick={() => performUnaryOperation('x2')}>x²</button>
        <button className="nc-calculator-button nc-op-top" onClick={() => performUnaryOperation('sqrt')}>²√x</button>
        <button className="nc-calculator-button nc-operator" onClick={() => performOperation('÷')}>÷</button>

        {/* Row 3 */}
        <button className="nc-calculator-button nc-number" onClick={() => inputDigit('7')}>7</button>
        <button className="nc-calculator-button nc-number" onClick={() => inputDigit('8')}>8</button>
        <button className="nc-calculator-button nc-number" onClick={() => inputDigit('9')}>9</button>
        <button className="nc-calculator-button nc-operator" onClick={() => performOperation('×')}>×</button>

        {/* Row 4 */}
        <button className="nc-calculator-button nc-number" onClick={() => inputDigit('4')}>4</button>
        <button className="nc-calculator-button nc-number" onClick={() => inputDigit('5')}>5</button>
        <button className="nc-calculator-button nc-number" onClick={() => inputDigit('6')}>6</button>
        <button className="nc-calculator-button nc-operator" onClick={() => performOperation('-')}>−</button>

        {/* Row 5 */}
        <button className="nc-calculator-button nc-number" onClick={() => inputDigit('1')}>1</button>
        <button className="nc-calculator-button nc-number" onClick={() => inputDigit('2')}>2</button>
        <button className="nc-calculator-button nc-number" onClick={() => inputDigit('3')}>3</button>
        <button className="nc-calculator-button nc-operator" onClick={() => performOperation('+')}>+</button>

        {/* Row 6 */}
        <button className="nc-calculator-button nc-number" onClick={() => performUnaryOperation('negate')}>+/−</button>
        <button className="nc-calculator-button nc-number" onClick={() => inputDigit('0')}>0</button>
        <button className="nc-calculator-button nc-number" onClick={inputDot}>.</button>
        <button className="nc-calculator-button nc-equals" onClick={() => performOperation('=')}>=</button>
      </div>
    </div>
  );
}
