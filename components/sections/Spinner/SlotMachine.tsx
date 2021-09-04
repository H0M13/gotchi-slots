import React, { useEffect, useState, useRef } from "react";

import styles from './SlotMachine.module.scss';

const RepeatButton = ({onClick}) => (
  <button 
      aria-label='Play again.' 
      className={styles.repeatButton} 
      onClick={onClick}>
  </button>
);

export interface SpinnerProps {
  inputTimer: number;
}

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function saveCallback() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(saveCallback, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const Spinner = ({id} : SpinnerProps) => {
  const iconHeight = 100;
  const [spinning, setSpinning] = useState(false);
  const [position, setPosition] = useState(100);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const multiplier = 1;
  const speed = iconHeight * multiplier;

  const calculateTime = (results) => {
    const resultID = results.result[id];
    const previousResultID = results.previousResult[id];
    const padding = (id+1) * 1800;
    const distance = resultID - previousResultID;
    let spinTime = 100 * distance;
    return padding + spinTime;
  }

  const startSpin = (event) => {
    if(!spinning) {
      setSpinning(true);
      const spinTime = calculateTime(event.detail);
      setTimeRemaining(spinTime);
    }
  }

  const tick = () => {    
    if (timeRemaining <= 0) { 
      setSpinning(false); 
    } else {
      setPosition(position - speed);
      setTimeRemaining(timeRemaining - 100);
    }      
  }

  useEffect(() => {
    window.addEventListener('spin', startSpin)
    return function cleanupListener() {
      window.removeEventListener('spin', startSpin)
    }
  }, []);

  useInterval(() => {
    tick()
  }, 100);

  return (
    <div 
      style={{backgroundPosition: `0px ${position}px`}}
      className={styles.icons}          
    />
  );
};

const SlotMachine = () => {
  const [count, setCount] = useState(0);
  const results = [
    [2, 2, 2, 2, 2],
    [3, 3, 3, 3, 3],
    [1, 2, 3, 4, 5],
    [5, 4, 3, 2, 1],
    [6, 6, 6, 6, 6],
    [16, 4, 16, 4, 16]
  ];

  const [previousResult, setPreviousResult] = useState([1, 1, 1, 1, 1]);

  const spin = () => {
    const event = new CustomEvent('spin', { 'detail': {
      previousResult: previousResult,
      result: results[count],
    } });
    window.dispatchEvent(event);
    setCount((count + 1) % results.length);
    setPreviousResult(results[count]);
  };

  return (
    <div>
      <div className={`spinner-container`}>
        <Spinner id={0} />
        <Spinner id={1} />
        <Spinner id={2} />
        <Spinner id={3} />
        <Spinner id={4} />
        <div className="gradient-fade"></div>
      </div>

      <RepeatButton onClick={() => spin()}/>       
    </div>
  );
}; 


export default SlotMachine;
