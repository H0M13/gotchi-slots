import React, { useEffect, useState } from "react";

import styles from './Spinner.module.scss';

const RepeatButton = ({onClick}) => (
  <button 
      aria-label='Play again.' 
      className={styles.repeatButton} 
      onClick={onClick}>
  </button>
);

const SlotMachine = () => {
  const spin = () => {
    // console.info("Hello");
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

export interface SpinnerProps {
  inputTimer: number;
}

const Spinner = ({inputTimer} : SpinnerProps) => {
  const iconHeight = 188;

  const [spinning, setSpinning] = useState(false);

  const [position, setPosition] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  
  const [timer, setTimer] = useState(null);
  const [start, setStart] = useState(0);

  const multiplier = Math.floor(Math.random()*(4-1)+1);
  const speed = iconHeight * multiplier;

  const startSpin = () => {

    if(!spinning) {
      console.info("spinning");
      setSpinning(true);

      setTimeRemaining(inputTimer);
      setStart(0);
      setPosition(0);

      if (timer) { 
        clearInterval(timer); 
      }  

      const loop = setInterval(() => {
        tick()
      }, 100);

      setTimer(loop);
    }
  }

  const moveBackground = () => {
    setPosition(position - speed);
    setTimeRemaining(timeRemaining - 100);
    console.info(timeRemaining);
  }

  const getSymbolFromPosition = () => {
    const totalSymbols = 9;
    const maxPosition = (iconHeight * (totalSymbols-1)*-1);

    let moved = (timer/100) * multiplier;

    let startPosition = start;
    let currentPosition = startPosition;    

    for (let i = 0; i < moved; i++) {              
      currentPosition -= iconHeight;

      if (currentPosition < maxPosition) {
        currentPosition = 0;
      }      
    }
  }

  const tick = () => {      
    if (timeRemaining <= 0) {
      clearInterval(timer);        
      // getSymbolFromPosition();   
      setSpinning(false); 
    } else {
      moveBackground();
    }      
  }

  useEffect(() => {
    window.addEventListener('spin', startSpin)
    return function cleanupListener() {
      window.removeEventListener('spin', startSpin)
    }
  }, []);


  return (
    <div 
      style={{backgroundPosition: '0px ' + position + 'px'}}
      className={styles.icons}          
    />
  );
};

export default SlotMachine;
