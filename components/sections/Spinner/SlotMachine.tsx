import React, { useEffect, useState, useRef } from "react";
import { useAavegotchi } from "context/AavegotchiContext";
import { useSlotsContractCall } from "actions/web3";

import styles from "./SlotMachine.module.scss";
import { useMoralis } from "react-moralis";

const RepeatButton = ({ onClick }) => (
  <button
    aria-label="Play again."
    className={styles.repeatButton}
    onClick={onClick}
  ></button>
);

export interface SpinnerProps {
  id: number;
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
};

const Spinner = ({ id }: SpinnerProps) => {
  const iconHeight = 100;
  const [spinning, setSpinning] = useState(false);
  const [position, setPosition] = useState(100);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const multiplier = 1;
  const speed = iconHeight * multiplier;

  const calculateTime = (results) => {
    const resultID = results.result[id];
    const previousResultID = results.previousResult[id];
    const padding = (id + 1) * 1800;
    const distance = resultID - previousResultID;
    let spinTime = 100 * distance;
    return padding + spinTime;
  };

  const startSpin = (event) => {
    if (!spinning) {
      setSpinning(true);
      const spinTime = calculateTime(event.detail);
      setTimeRemaining(spinTime);
    }
  };

  const tick = () => {
    if (timeRemaining <= 0) {
      setSpinning(false);
    } else {
      setPosition(position - speed);
      setTimeRemaining(timeRemaining - 100);
    }
  };

  useEffect(() => {
    window.addEventListener("spin", startSpin);
    return function cleanupListener() {
      window.removeEventListener("spin", startSpin);
    };
  }, []);

  useInterval(() => {
    tick();
  }, 100);

  return (
    <div
      style={{ backgroundPosition: `0px ${position}px` }}
      className={styles.icons}
    />
  );
};

const SlotMachine = ({ className = "" }: any) => {

  const getNumberInRangeExcept = (except: Array<number>) => {
    const result = getRandomInt(1, 18);

    if (!except.includes(result)) {
      return result;
    }

    return getNumberInRangeExcept(except);
  }

  const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const payout0Results = [
    [0, 0, 0, 0, 0]
  ];

  const payout1Results = [
    [1, 1, 1, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 1, 1, 1],
  ];

  const payout2Results = [
    [5, 5, 5, 0, 0],
    [0, 5, 5, 5, 0],
    [0, 0, 5, 5, 5]
  ];

  const payout5Results = [
    [9, 9, 9, 0, 0],
    [0, 9, 9, 9, 0],
    [0, 0, 9, 9, 9]
  ];

  const payout25Results = [
    [9, 9, 9, 9, 9],
    [14, 14, 14, 0, 0],
    [0, 14, 14, 14, 0],
    [0, 0, 14, 14, 14],
    [11, 11, 11, 0, 0],
    [0, 11, 11, 11, 0],
    [0, 0, 11, 11, 11]
  ];

  const payout100Results = [
    [14, 14, 14, 14, 14],
    [11, 11, 11, 11, 0],
    [0, 11, 11, 11, 11],
    [16, 16, 16, 0, 0],
    [0, 16, 16, 16, 0],
    [0, 0, 16, 16, 16],
  ];

  const payoutJackpotResults = [[16, 16, 16, 16, 16]];

  const getRandomEntryFromArray = (array) =>
    array[Math.floor(Math.random() * array.length)];

  const generateRandomResultFromTemplate = (template: Array<number>) => {
    
    const templateNonZeroes = template.filter(spinItem => spinItem !== 0)

    if (templateNonZeroes.length > 0) {
      return template.map(spinItem => spinItem === 0 ? getNumberInRangeExcept([templateNonZeroes[0]]) : spinItem)
    }
    
    // For [0, 0, 0, 0, 0] return anything for all spinners except the middle one. Make sure this isn't a rofl to avoid a line of 3.
    return template.map((spinItem, index) => index == 2 ? getNumberInRangeExcept([1,5,9,11,14,16]) : getNumberInRangeExcept([]))
  }

  const getRandomSpinResultForPayout = (spinOutcome: number) => {
    console.log(spinOutcome)
    switch (+spinOutcome) {
      case 0:
        return generateRandomResultFromTemplate(getRandomEntryFromArray(payout0Results));
      case 1:
        return generateRandomResultFromTemplate(getRandomEntryFromArray(payout1Results));
      case 2:
        return generateRandomResultFromTemplate(getRandomEntryFromArray(payout2Results));
      case 5:
        return generateRandomResultFromTemplate(getRandomEntryFromArray(payout5Results));
      case 25:
        return generateRandomResultFromTemplate(getRandomEntryFromArray(payout25Results));
      case 100:
        return generateRandomResultFromTemplate(getRandomEntryFromArray(payout100Results));
      default:
        return generateRandomResultFromTemplate(getRandomEntryFromArray(payoutJackpotResults));
    }
  };

  const {
    state: { requestId },
    dispatch,
  } = useAavegotchi();

  const { web3 } = useMoralis();

  const [currentSpinIndex, setCurrentSpinIndex] = useState<number>(0);

  const getSpinOutcome = async (requestId: string, spinIndex: number) => {
    const res = await useSlotsContractCall<string>(web3, {
      name: "requestIdToSpinOutcomes",
      parameters: [requestId, spinIndex],
    });
    console.log(`spin ${spinIndex}: ${web3.utils.fromWei(res)}`);
    return web3.utils.fromWei(res);
  };

  const [previousResult, setPreviousResult] = useState([1, 1, 1, 1, 1]);

  useEffect(() => {
    console.log("requestId has changed. Setting currentSpinIndex to 0");
    setCurrentSpinIndex(0);
  }, [requestId]);

  const spin = async () => {
    if (!requestId) {
      console.log("Tried to spin but requestId is undefined");
      return;
    }

    if (currentSpinIndex > 9) {
      console.log("User is out of spins");
      return;
    }

    const spinOutcome = await getSpinOutcome(requestId, currentSpinIndex);

    const spinResult = getRandomSpinResultForPayout(spinOutcome);

    const event = new CustomEvent("spin", {
      detail: {
        previousResult: previousResult,
        result: spinResult,
      },
    });
    window.dispatchEvent(event);
    setCurrentSpinIndex(currentSpinIndex + 1);
    setPreviousResult(spinResult);
  };

  return (
    <div className={className}>
      <div className={`spinner-container`}>
        <Spinner id={0} />
        <Spinner id={1} />
        <Spinner id={2} />
        <Spinner id={3} />
        <Spinner id={4} />
        <div className="gradient-fade"></div>
      </div>

      <RepeatButton onClick={() => spin()} />
    </div>
  );
};

export default SlotMachine;
