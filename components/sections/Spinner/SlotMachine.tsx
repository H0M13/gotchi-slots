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

const Spinner = ({inputTimer} : SpinnerProps) => {
  const iconHeight = 100;

  const [spinning, setSpinning] = useState(false);

  const [position, setPosition] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  
  const [timer, setTimer] = useState(null);
  const [start, setStart] = useState(0);

  // const multiplier = Math.floor(Math.random()*(4-1)+1);
  const multiplier = 1;
  const speed = iconHeight * multiplier;

  const startSpin = () => {
    if(!spinning) {
      setSpinning(true);
      setTimeRemaining(inputTimer);
      setStart(0);
      setPosition(0);
    }
  }

  const tick = () => {    
    if (timeRemaining <= 0) {
      setTimer(null);   
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

  
  const newTimer = useInterval(() => {
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
  const spin = () => {
    const event = document.createEvent('Event');
    event.initEvent('spin', true, true);
    window.dispatchEvent(event);
  };

  return (
    <div>
      <div className={`spinner-container`}>
        <Spinner inputTimer={1000} />
        <Spinner inputTimer={1400} />
        <Spinner inputTimer={2200} />
        <Spinner inputTimer={3000} />
        <Spinner inputTimer={4000} />
        <div className="gradient-fade"></div>
      </div>

      <RepeatButton onClick={() => spin()}/>       
    </div>
  );
}; 


export default SlotMachine;
