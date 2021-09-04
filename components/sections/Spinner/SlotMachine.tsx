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
  id: number;
  setSpinning : Function;
  isLast: boolean;
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
      // @ts-ignore
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(saveCallback, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const Spinner = ({id, setSpinning, isLast} : SpinnerProps) => {
  const iconHeight = 100;
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
    const spinTime = calculateTime(event.detail);
    setTimeRemaining(spinTime);
  }

  const tick = () => {    
    if (timeRemaining <= 0) { 
      if (isLast) {
        setSpinning(false); 
      }
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
    tick();
  }, 100);

  return (
    <div 
      style={{backgroundPosition: `0px ${position}px`}}
      className={styles.icons}          
    />
  );
};

const SlotMachine = ({ className = "" }: any) => {
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

  const [triggerDown, setTriggerDown] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const spin = () => {

    if (!spinning) {
      setSpinning(true);

      const event = new CustomEvent('spin', { 'detail': {
        previousResult: previousResult,
        result: results[count],
      } });
      window.dispatchEvent(event);
      setCount((count + 1) % results.length);
      setPreviousResult(results[count]);
    }
  };

  return (
    <div className={className}>
      <div className={styles.spinnerContainer}>
        <Spinner id={0} isLast={false} setSpinning={setSpinning} />
        <Spinner id={1} isLast={false} setSpinning={setSpinning} />
        <Spinner id={2} isLast={false} setSpinning={setSpinning} />
        <Spinner id={3} isLast={false} setSpinning={setSpinning} />
        <Spinner id={4} isLast={true} setSpinning={setSpinning} />

        <div className={styles.handleContainer}>

          <button 
            aria-label='Play again.' 
            onMouseDown={() => setTriggerDown(true)}
            onMouseUp={() => {
              setTriggerDown(false)
              spin()
            }}
          >
            <div className={`${styles.slotTrigger} ${(triggerDown && !spinning) ? styles.pullDown : ''}`}>
              <div className={styles.lever}>
                  <div className={styles.pull}>
                      <div className={styles.ball}></div>
                      <div className={styles.stem}></div>
                  </div>
                  <div className={styles.cog1}></div>
                  <div className={styles.cog2}></div>
              </div>
            </div>

          </button>

        </div>

        

      </div>

      {/* <RepeatButton onClick={() => spin()}/>        */}
    </div>
  );
}; 


export default SlotMachine;
