import React, { useEffect, useState, useRef } from "react";
import {
  useAavegotchi,
  updateTokensWonThisSession,
} from "context/AavegotchiContext";
import { useSlotsContractCall } from "actions/web3";
import styles from "./SlotMachine.module.scss";
import { useMoralis } from "react-moralis";
import { styled } from "theme";

const RepeatButton = ({ onClick }) => (
  <button
    aria-label="Play again."
    className={styles.repeatButton}
    onClick={onClick}
  ></button>
);

export interface SpinnerProps {
  id: number;
  setSpinning: Function;
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
};

const Spinner = ({ id, setSpinning, isLast }: SpinnerProps) => {
  const iconHeight = 100;
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
    const spinTime = calculateTime(event.detail);
    setTimeRemaining(spinTime);
  };

  const tick = () => {
    if (timeRemaining === 0) {
      // if (isLast) {
      //   console.log("set spinning false")
      //   setSpinning(false);
      // }
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

  useInterval(
    () => {
      tick();
    },
    timeRemaining > 0 ? 100 : null
  );

  useEffect(() => {
    if (timeRemaining === 0 && isLast) {
      console.log("set spinning false");
      setSpinning(false);
    }
  }, [timeRemaining, isLast]);

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
  };

  const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const payout0Results = [[0, 0, 0, 0, 0]];

  const payout1Results = [
    [1, 1, 1, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 1, 1, 1],
  ];

  const payout2Results = [
    [5, 5, 5, 0, 0],
    [0, 5, 5, 5, 0],
    [0, 0, 5, 5, 5],
  ];

  const payout5Results = [
    [9, 9, 9, 0, 0],
    [0, 9, 9, 9, 0],
    [0, 0, 9, 9, 9],
  ];

  const payout25Results = [
    [9, 9, 9, 9, 9],
    [14, 14, 14, 0, 0],
    [0, 14, 14, 14, 0],
    [0, 0, 14, 14, 14],
    [11, 11, 11, 0, 0],
    [0, 11, 11, 11, 0],
    [0, 0, 11, 11, 11],
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
    const templateNonZeroes = template.filter((spinItem) => spinItem !== 0);

    if (templateNonZeroes.length > 0) {
      return template.map((spinItem) =>
        spinItem === 0
          ? getNumberInRangeExcept([templateNonZeroes[0]])
          : spinItem
      );
    }

    // For [0, 0, 0, 0, 0] return anything for all spinners except the middle one. Make sure this isn't a rofl to avoid a line of 3.
    return template.map((spinItem, index) =>
      index == 2
        ? getNumberInRangeExcept([1, 5, 9, 11, 14, 16])
        : getNumberInRangeExcept([])
    );
  };

  const getRandomSpinResultForPayout = (spinOutcome: number) => {
    console.log(spinOutcome);
    switch (+spinOutcome) {
      case 0:
        return generateRandomResultFromTemplate(
          getRandomEntryFromArray(payout0Results)
        );
      case 1:
        return generateRandomResultFromTemplate(
          getRandomEntryFromArray(payout1Results)
        );
      case 2:
        return generateRandomResultFromTemplate(
          getRandomEntryFromArray(payout2Results)
        );
      case 5:
        return generateRandomResultFromTemplate(
          getRandomEntryFromArray(payout5Results)
        );
      case 25:
        return generateRandomResultFromTemplate(
          getRandomEntryFromArray(payout25Results)
        );
      case 100:
        return generateRandomResultFromTemplate(
          getRandomEntryFromArray(payout100Results)
        );
      default:
        return generateRandomResultFromTemplate(
          getRandomEntryFromArray(payoutJackpotResults)
        );
    }
  };

  const {
    state: { requestId },
    dispatch,
  } = useAavegotchi();

  const setSpinningAndUpdateTokensWonThisSession = (value: boolean) => {
    if (!requestId) {
      console.log(
        "in setSpinningAndUpdateTokensWonThisSession but requestId is undefined"
      );
    } else {
      updateTokensWonThisSessionAsync(requestId);
      setSpinning(value);
      setCurrentSpinIndex(currentSpinIndex + 1);
    }
  };

  const updateTokensWonThisSessionAsync = async (requestId: string) => {
    console.log("currentSpinOutcome: " + currentSpinOutcome)
    currentSpinOutcome && updateTokensWonThisSession(dispatch, currentSpinOutcome);
  };

  const { web3 } = useMoralis();

  const checkRequestIdHasBeenProcessed = async () => {
    if (requestId) {
      const res = await useSlotsContractCall<boolean>(web3, {
        name: "requestIdToProcessedBool",
        parameters: [requestId],
      });
      console.log(res);
      setRequestIdHasBeenProcessed(res);
      return res;
    }
    setRequestIdHasBeenProcessed(false);
    return false;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      checkRequestIdHasBeenProcessed();
    }, 3000);
    return () => clearInterval(interval);
  }, [requestId]);

  const [requestIdHasBeenProcessed, setRequestIdHasBeenProcessed] = useState<boolean>(false)

  useEffect(() => {
    console.log("requestIdHasBeenProcessed: " + requestIdHasBeenProcessed)
    if (!requestIdHasBeenProcessed) {
      setCurrentSpinIndex(10)
    }
    else {
      setCurrentSpinIndex(0)
    }
  }, [requestIdHasBeenProcessed])

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

  const [currentSpinOutcome, setCurrentSpinOutcome] = useState<number>()

  const spin = async () => {
    if (!requestId) {
      console.log("Tried to spin but requestId is undefined");
      return;
    }

    if (currentSpinIndex > 9) {
      console.log("User is out of spins");
      return;
    }

    setSpinning(true);

    const spinOutcome = await getSpinOutcome(requestId, currentSpinIndex);

    setCurrentSpinOutcome(spinOutcome)

    const spinResult = getRandomSpinResultForPayout(spinOutcome);

    const event = new CustomEvent("spin", {
      detail: {
        previousResult: previousResult,
        result: spinResult,
      },
    });
    window.dispatchEvent(event);
    setPreviousResult(spinResult);
  };

  const [triggerDown, setTriggerDown] = useState(false);
  const [spinning, setSpinning] = useState(false);

  return (
    <div className={className}>
      <div className={styles.spinnerContainer}>
        <div className={styles.background} />
        <div className={styles.metalBarLower} />
        <div className={styles.metalBarUpper} />

        <Spinner
          id={0}
          isLast={false}
          setSpinning={setSpinningAndUpdateTokensWonThisSession}
        />
        <Spinner
          id={1}
          isLast={false}
          setSpinning={setSpinningAndUpdateTokensWonThisSession}
        />
        <Spinner
          id={2}
          isLast={false}
          setSpinning={setSpinningAndUpdateTokensWonThisSession}
        />
        <Spinner
          id={3}
          isLast={false}
          setSpinning={setSpinningAndUpdateTokensWonThisSession}
        />
        <Spinner
          id={4}
          isLast={true}
          setSpinning={setSpinningAndUpdateTokensWonThisSession}
        />

        <div className={styles.handleContainer}>
          <button
            aria-label="Play again."
            disabled={spinning}
            onMouseDown={() => setTriggerDown(true)}
            onMouseUp={() => {
              setTriggerDown(false);
              spin();
            }}
          >
            <div
              className={`${styles.slotTrigger} ${
                triggerDown && !spinning ? styles.pullDown : ""
              }`}
            >
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
      <SpinsRemainingContainer>
        <SpinsRemaining>Spins remaining: {10 - currentSpinIndex}</SpinsRemaining>
      </SpinsRemainingContainer>
    </div>
  );
};

const SpinsRemainingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`

const SpinsRemaining = styled.span`
  font-size: 2rem;
`;

export default SlotMachine;
