import React from 'react';
import { useState } from 'react';
import './App.css';

const operatorsRegEx = /[+\-*/]/;
const decimalRegEx = /^-?(?:\d+|\d+\.\d*)$/;
const leadingZeroRegEx = /^(?:[1-9]|0\.)/g;


const workingWithNumbers = (input) => {
  const evaluated = eval(input.join(''));
  console.log("workingWithNumbers - evaluated -->", evaluated);
  console.log("evaluated LENGTH", evaluated.toString().length);
}

const Main = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState('');
  const [tempNum, setTempNum] = useState([]);

  
 
  
  const handleClick = (event) => {
    console.log("event.target.value ->", event.target.value);
    const value = event.target.value;
    
    console.log("input ->", input);
    const letTempNum = [...tempNum, value];
    const lastElementIndex = letTempNum.length - 1;
    const lastInputElement = `${input[(input.length -1)]}`;
    const lastInputIndex = (input.length -1);
    console.log(lastInputIndex, "🔔 lastInputIndex")

    //======================================== EQUALS ========================================
    if (value === "=") {
      
      console.log("Equals 🔥🔥", value);
      if (input.length === 0) {
        return;
      }
      if (lastInputElement === "=") {
        return;
      }
      if (lastInputElement.match(operatorsRegEx)) {
        console.log("Operator before equal");
        return;
      }
      const finalResult = Math.floor(eval(input.join('')) * 1000000) / 1000000;
      setResult(finalResult);
      setInput([...input, value]);
      console.log("Equals after input", finalResult);

      setTempNum([]);
      
    }// ======================================== ALL CLEAR ========================================
      else if (value === "AC") {
        setResult('');
        setInput('');
        setTempNum([]);
        console.log("All Clear", value);
    }// ======================================== DELETE ========================================
      else if (value === "DEL") {
        console.log("Delete", value);
        setInput([...input.slice(0, lastInputIndex)]);
    }//======================================== OPERATORS ========================================
      else if ((value.match(operatorsRegEx) && input.length > 0) || (value === "-" && input.length === 0)) {
        if (lastInputElement === "-" && value.match(operatorsRegEx) && input.length === 1) {
          console.log("FFS")
          return;
        }
        const secondLastInputElement = `${input[(input.length -2)]}`;
        console.log("secondLastInputElement ------->", secondLastInputElement);
        if (secondLastInputElement.match(operatorsRegEx) && lastInputElement === "-" && value.match(operatorsRegEx)) {
          setInput([...input.slice(0, -2), value]);
          console.log("Slice off two🐲🐉");
          return;
        };
        if (lastInputElement.match(operatorsRegEx) && value === "-") {
          console.log("Operator minus issue")
          if (lastInputElement.match(operatorsRegEx) && value === "-") {
            setInput([...input, value]);
            console.log("POES!");
            return;
          };
         
          setInput([...input.slice(0, lastInputIndex), value]);
          return;
        }
        if (lastInputElement === "=") {
          const removeEquals = [...input.slice(0, lastInputIndex)]
          console.log("removeEquals ----->", removeEquals)
          const finalResult = Math.floor(eval(removeEquals.join('')) * 1000000) / 1000000;
          console.log("finalResult after removeEquals ===>", finalResult);
          setInput([finalResult, value]);
          return;
        };
        
        if (lastInputElement.match(operatorsRegEx) && input.length > 0) {
          if((input.length > 0)) {
            setInput([
              ...input.slice(0, lastInputIndex), value
            ]
            );
          } else if (input.length === 0 && value === "-") {
            return;
          }
          return;
        }
        console.log("Operator", value);
        setInput([...input, value]);
        setTempNum([]);
    }//======================================== NUMBERS & DECIMAL ========================================
      else if (value.match(/\d|\./)) {
        console.log("Digit or decimal", value);
        setTempNum([...tempNum, value]);
        if (lastInputElement === "=") {
          setInput([value]);
          setResult('');
          return;
        }
        
        const tempNumCheck = letTempNum.join('').match(decimalRegEx);
        const leadingZeroCheck = letTempNum.join('').match(leadingZeroRegEx);
        console.log("00 check", leadingZeroCheck);
        
        if (!tempNumCheck || (letTempNum.length > 1 && !leadingZeroCheck)) {
          console.log("tempNumCheck ->", tempNumCheck);
          console.log("leadingZeroCheck ->", leadingZeroCheck)
          console.log("letTempNum === falsy ---> tempNum:", letTempNum);
          letTempNum.splice(lastElementIndex, 1);
          setTempNum(letTempNum);
          console.log("letTempNum after splice ->", letTempNum);
          setInput([...input]);
        } else {
          console.log("tempNumCheck ->", tempNumCheck)
          console.log("letTempNum === truthy ---> tempNum:", letTempNum);
          setInput([...input, value]);
        }
      } 

  };

  return (
    <div id="main" className="main">
      {/* <Display /> */}
      <Buttons 
        handleClick = {handleClick} 
        input = {input}
        result = {result}
      />  
    </div>
  );

};

const Buttons = ({ handleClick, input, result }) => {

  const Display = () => {
    return (
      <div  className="Display d-flex justify-content-center">
        <div  className="row justify-content-sm-center">
          <p className="col col-sm-12 btn">{input.length === 0 ? "0" : input}</p>
          <p id="display" className="col col-sm-12 btn">
            {result.length === 0 && input.length === 0 ? 0 
            : result.length === 0 && input.length > 0 ? input.join('').toString()
            : result.length > 0 ? result.toString()
            : result.toString()}
            </p>
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
};

export default Main;
  















// // import React from 'react';
// // import { useState } from 'react';
// // import './App.css';

// // const Main = () => {
// //   const [input, setInput] = useState([]);
// //   const [result, setResult] = useState('');
// //   const [display, setDisplay] = useState('');
// //   // The thinking -> set the number(s) as the input and +,-,*,/ as operators
// //   // then when the '=' is inputted, do the calculations
// //   const [formula, setFormula] = useState([]);
// //   const [numbers, setNumbers] = useState([]);
// //   const [operators, setOperators] = useState([]);

// //   let tempNumbersArray = [];

// //   const handleClick = (event) => {
// //     console.log("Button Clicked!");
// //     console.log("Event target:", event.target);
// //     const value = event.target.value;
// //     console.log(value);
// //     const operators = ["+", "-", "*", "/"];
// //     const formulaLast = formula[formula.length - 1];

// //     if (!isNaN(Number(value))) {
// //       if (tempNumbersArray.length === 0 && value === "0") {
// //         return;
// //       } else {
// //         tempNumbersArray.push(value);
// //         // setInput([tempNumbersArray]);
// //         console.log("tempNumbersArray", tempNumbersArray);
// //       }
// //     } else if (value === ".") {
// //       if (tempNumbersArray.length === 0) {
// //         return;
// //       } else if (tempNumbersArray.includes(".")) {
// //         return;
// //       } else {
// //         tempNumbersArray.push(value);
// //         console.log("tempNumbersArray", tempNumbersArray);
// //       }
// //     } else if (operators.includes(value)) {
// //       setFormula([...formula, tempNumbersArray.join(""), value]);
// //       tempNumbersArray = [];
// //     }

// //   }

// //   return (
// //     <div className="Main">
// //       <Buttons
// //         handleClick={handleClick}
// //         input={input}
// //         setInput={setInput}
// //         result={result}
// //         setResult={setResult}
// //         display={display}
// //         setDisplay={setDisplay}
// //         formula={formula}
// //         setFormula={setFormula}

// //       />
// //     </div>
// //   )
// // };



// // const Buttons = ({ handleClick, input, setInput, result, setResult, display, setDisplay, formula, setFormula }) => {

// //   const Display = () => {
// //     return (
// //       <div id="display" className="Display d-flex justify-content-center align-items-center">
// //         <div className="row justify-content-sm-center">
// //           <p className="row justify-content-sm-center" id="display">{formula.length > 0 ? formula.join("") : 0}</p>
// //           <p className="row justify-content-sm-center" id="input-display">{input}</p>
// //           <p className="row justify-content-sm-center" id="result">{result}</p>
// //         </div>
// //       </div>
// //     )
// //   };

// //   return (
// //     <div className="d-flex justify-content-center">
// //       <div className="Buttons">
// //         <Display />
// //         <div className="row justify-content-sm-center">
// //           <button onClick={handleClick} className="col col-sm-2 btn btn-danger" value="AC" id="clear">AC</button>
// //           <button onClick={handleClick} className="col col-sm-1 btn btn-dark" value="DEL" id="DEL">DEL</button>
// //           <button onClick={handleClick} className="col col-sm-1 btn btn-secondary" value="+" id="add">+</button>
// //         </div>
// //         <div className="row justify-content-sm-center">

// //         </div>
// //         <div className="row justify-content-sm-center">
// //           <button onClick={handleClick} className="col col-sm-1" value="7" id="seven">7</button>
// //           <button onClick={handleClick} className="col col-sm-1" value="8" id="eight">8</button>
// //           <button onClick={handleClick} className="col col-sm-1" value="9" id="nine">9</button>
// //           <button onClick={handleClick} className="col col-sm-1 btn btn-secondary" value="-" id="subtract">-</button>
// //         </div>
// //         <div className="row justify-content-sm-center">
// //           <button onClick={handleClick} className="col col-sm-1" value="4" id="four">4</button>
// //           <button onClick={handleClick} className="col col-sm-1" value="5" id="five">5</button>
// //           <button onClick={handleClick} className="col col-sm-1" value="6" id="six">6</button>
// //           <button onClick={handleClick} className="col col-sm-1 btn btn-secondary" value="*" id="multiply">X</button>
// //         </div>
// //         <div className="row justify-content-sm-center">
// //           <button onClick={handleClick} className="col col-sm-1" value="1" id="one">1</button>
// //           <button onClick={handleClick} className="col col-sm-1" value="2" id="two">2</button>
// //           <button onClick={handleClick} className="col col-sm-1" value="3" id="three">3</button>
// //           <button onClick={handleClick} className="col col-sm-1 btn btn-secondary" value="/" id="divide">/</button>
// //         </div>
// //         <div className="row justify-content-sm-center">
// //           <button onClick={handleClick} className="col col-sm-2" value="0" id="zero">0</button>
// //           <button onClick={handleClick} className="col col-sm-1" value="." id="decimal">.</button>
// //           <button onClick={handleClick} className="col col-sm-1 btn btn-secondary" value="=" id="equals">=</button>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default Main;