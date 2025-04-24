import React from 'react';
import { useState } from 'react';
import './App.css';

const Main = () => {
  const [input, setInput] = useState("0");
  const [result, setResult] = useState('');
  const [display, setDisplay] = useState('');
  // The thinking -> set the number(s) as the input and +,-,*,/ as operators
  // then when the '=' is inputted, do the calculations
  const [formula, setFormula] = useState([]);

  const handleClick = (event) => {
    console.log("Button Clicked!");
    console.log("Event target:", event.target);
    const value = event.target.value;
    console.log(value);
    const operators = ["+", "-", "*", "/", "."];
    const formulaLast = formula[formula.length - 1];

    if (value === "=") {

      if (formula.length === 0) {
        return;
      }
      if (formulaLast === "=") {
        return;
      }

      const finalResult = eval(formula.join(""));
      console.log("Final result", finalResult);

      if (finalResult % 1 !== 0) {
        setFormula([...formula, "="]);
        setResult(finalResult.toFixed(4));
      } else {
        setFormula([...formula, "="]);
        setResult(finalResult);
      }
    } else if (operators.includes(value) && formulaLast === "=" && value !== ".") {
      console.log("Equation after EQUAL");
      const newFormula = formula.toSpliced((formula.length - 1));
      console.log("newFormula ---->", newFormula);
      const finalResult = eval(newFormula.join(""));
      setFormula([finalResult, value]);
    } else if (value === "+" || value === "-" || value === "*" || value === "/" || value === ".") {


      if (operators.includes(formulaLast) || (formula.length === 0 && value !== "-")) {
        if (value !== "-") {
          setFormula([...formula.splice(0, formula.length - 1), value])
        } else {
          setFormula([...formula, value])
        }

        return;
      } else if (formula.includes(".") && value === ".") {
        // const lastIndex = formula.length - 1;
        // console.log("LAST INDEX", lastIndex)

        console.log("FORMULA INCLUDES DECIMAL", formula.includes(".") && value === ".");
        console.log("FORMULA ->", formula);
        console.log("INDEX OF LAST DECIMAL", formula.findIndex((el) => el === "."));

        const lastDecimalIndex = formula.findLastIndex((el) => el === ".");
        console.log("lastDecimalIndex", lastDecimalIndex);
        const sectionOfArrayToCheck = formula.slice(lastDecimalIndex + 1);
        console.log("sectionOfArrayToCheck", sectionOfArrayToCheck);
        console.log("sectionOfArrayToCheck.includes", sectionOfArrayToCheck.includes("+") || sectionOfArrayToCheck.includes("-") || sectionOfArrayToCheck.includes("*") || sectionOfArrayToCheck.includes("/") || sectionOfArrayToCheck.includes("."));
        if (
          sectionOfArrayToCheck.includes("+") ||
          sectionOfArrayToCheck.includes("-") ||
          sectionOfArrayToCheck.includes("*") ||
          sectionOfArrayToCheck.includes("/")
        ) {
          setFormula([...formula, value]);
        }
      } else {
        setFormula([...formula, value]);
      }
      console.log(value, " Operator added");
    } else if (value === "AC") {
      setFormula([]);
      setInput("0");
      setResult("");
    } else if (value === "DEL") {
      setFormula(formula.slice(0, -1));
      setInput(input.slice(0, -1));
    } else if (!isNaN(Number(value))) {
      if (formula.length === 0 && value === "0") {
        return;
      }
      
      const lastOperatorIndex = formula.findLastIndex((el) => {
        if (el !== ".") {
          return operators.includes(el);
        } else {
          return "none";
        }
      })
      console.log("lastOperatorIndex", lastOperatorIndex);
      
      const pieceOfArrayToCheck = formula.findLastIndex
      if (formulaLast === "0" && value !== ".") {
        return;
      }
      setFormula([...formula, value]);
      console.log(value, " Number added");
    }
    console.log("Formula:", formula);


  }

  return (
    <div className="Main">
      <Buttons
        handleClick={handleClick}
        input={input}
        setInput={setInput}
        result={result}
        setResult={setResult}
        display={display}
        setDisplay={setDisplay}
        formula={formula}
        setFormula={setFormula}

      />
    </div>
  )
};



const Buttons = ({ handleClick, input, setInput, result, setResult, display, setDisplay, formula, setFormula }) => {

  const Display = () => {
    return (
      <div id="display" className="Display d-flex justify-content-center align-items-center">
        <div className="row justify-content-sm-center">
          <p className="row justify-content-sm-center" id="display">{formula.length > 0 ? formula.join("") : 0}</p>
          {/* <p className="row justify-content-sm-center" id="input-display">{input}</p> */}
          <p className="row justify-content-sm-center" id="result">{result}</p>
        </div>
      </div>
    )
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="Buttons">
        <Display />
        <div className="row justify-content-sm-center">
          <button onClick={handleClick} className="col col-sm-2 btn btn-danger" value="AC" id="clear">AC</button>
          <button onClick={handleClick} className="col col-sm-1 btn btn-dark" value="DEL" id="DEL">DEL</button>
          <button onClick={handleClick} className="col col-sm-1 btn btn-secondary" value="+" id="add">+</button>
        </div>
        <div className="row justify-content-sm-center">

        </div>
        <div className="row justify-content-sm-center">
          <button onClick={handleClick} className="col col-sm-1" value="7" id="seven">7</button>
          <button onClick={handleClick} className="col col-sm-1" value="8" id="eight">8</button>
          <button onClick={handleClick} className="col col-sm-1" value="9" id="nine">9</button>
          <button onClick={handleClick} className="col col-sm-1 btn btn-secondary" value="-" id="subtract">-</button>
        </div>
        <div className="row justify-content-sm-center">
          <button onClick={handleClick} className="col col-sm-1" value="4" id="four">4</button>
          <button onClick={handleClick} className="col col-sm-1" value="5" id="five">5</button>
          <button onClick={handleClick} className="col col-sm-1" value="6" id="six">6</button>
          <button onClick={handleClick} className="col col-sm-1 btn btn-secondary" value="*" id="multiply">X</button>
        </div>
        <div className="row justify-content-sm-center">
          <button onClick={handleClick} className="col col-sm-1" value="1" id="one">1</button>
          <button onClick={handleClick} className="col col-sm-1" value="2" id="two">2</button>
          <button onClick={handleClick} className="col col-sm-1" value="3" id="three">3</button>
          <button onClick={handleClick} className="col col-sm-1 btn btn-secondary" value="/" id="divide">/</button>
        </div>
        <div className="row justify-content-sm-center">
          <button onClick={handleClick} className="col col-sm-2" value="0" id="zero">0</button>
          <button onClick={handleClick} className="col col-sm-1" value="." id="decimal">.</button>
          <button onClick={handleClick} className="col col-sm-1 btn btn-secondary" value="=" id="equals">=</button>
        </div>
      </div>
    </div>
  )
}

export default Main;