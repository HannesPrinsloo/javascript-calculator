import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';

const Main = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [display, setDisplay] = useState('');

  return(
    <div className="Main">
      <Display />
      <Buttons />
    </div>
  )
};

const Display = () => {
  return (
    <div className="Display">
      <div className="row justify-content-sm-center">
        <p className="row justify-content-sm-center" id="input-history">test</p>
        <p className="row justify-content-sm-center" id="input-display">test</p>
        <p className="row justify-content-sm-center" id="result">test</p>
      </div>
    </div>
  )
};

const Buttons = () => {
  return (
    <div className="Buttons">
      <div className="row justify-content-sm-center">
        <button className="col col-sm-2 btn btn-danger" value="AC" id="AC">AC</button>
        <button className="col col-sm-1 btn btn-dark" value="DEL" id="DEL">DEL</button>
        <button className="col col-sm-1 btn btn-secondary" value="+" id="add">+</button>
      </div>
      <div className="row justify-content-sm-center">
        
      </div>
      <div className="row justify-content-sm-center">
        <button className="col col-sm-1" value="7" id="seven">7</button>
        <button className="col col-sm-1" value="8" id="eight">8</button>
        <button className="col col-sm-1" value="9" id="nine">9</button>
        <button className="col col-sm-1 btn btn-secondary" value="-" id="subtract">-</button>
      </div>
      <div className="row justify-content-sm-center">
        <button className="col col-sm-1" value="4" id="four">4</button>
        <button className="col col-sm-1" value="5" id="five">5</button>
        <button className="col col-sm-1" value="6" id="six">6</button>
        <button className="col col-sm-1 btn btn-secondary" value="*" id="multiply">X</button>
      </div>
      <div className="row justify-content-sm-center">
        <button className="col col-sm-1" value="1" id="one">1</button>
        <button className="col col-sm-1" value="2" id="two">2</button>
        <button className="col col-sm-1" value="3" id="three">3</button>
        <button className="col col-sm-1 btn btn-secondary" value="/" id="divide">/</button>
      </div>
      <div className="row justify-content-sm-center">
        <button className="col col-sm-2" value="0" id="zero">0</button>
        <button className="col col-sm-1" value="." id="decimal">.</button>
        <button className="col col-sm-1 btn btn-secondary" value="=" id="equals">=</button>
      </div>
  
    </div>
  )
}

export default Main;
