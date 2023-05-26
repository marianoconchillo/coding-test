import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { isFibonacci } from "../helper/fibonacci";

interface Props {
  seconds: number;
}

interface NumbersAndFrequency {
  number: number;
  frequency: number;
}

export const Game = ({ seconds }: Props) => {
  // Control remaining time
  const [remainingTime, setRemainingTime] = useState(seconds);
  // New number
  const [newNumber, setNewNumber] = useState<number | "">("");
  // List of numbers and their frequency
  const [numbers, setNumbers] = useState<NumbersAndFrequency[]>([]);
  // String that shows the list of numbers after X seconds
  const [message, setMessage] = useState<string>("");
  // Control the timer
  const [isRunning, setIsRunning] = useState<boolean>(true);
  // Boolean to show 'FIB'
  const [isFibonacciNumber, setIsFibonacciNumber] = useState<boolean>(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Check if newNumber is numeric
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericValue = Number(inputValue);

    if (isNaN(numericValue)) {
      setNewNumber("");
    } else {
      setNewNumber(numericValue);
    }
  };

  // Add new number to the list and check if is fibonacciNumber <= 1000
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const numericValue = Number(newNumber);

    const index = numbers.findIndex((item) => item.number === numericValue);

    if (index !== -1) {
      const updatedNumbers = [...numbers];
      updatedNumbers[index] = {
        ...updatedNumbers[index],
        frequency: updatedNumbers[index].frequency + 1,
      };
      setNumbers(updatedNumbers);
    } else {
      setNumbers([
        ...numbers,
        {
          number: numericValue,
          frequency: 1,
        },
      ]);
    }

    setIsFibonacciNumber(false);
    if (isFibonacci(numericValue)) {
      setIsFibonacciNumber(true);
    }
    setNewNumber("");
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setRemainingTime((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, remainingTime]);

  useEffect(() => {
    if (remainingTime === 0) {
      const result: string = numbers
        .map((item: NumbersAndFrequency) => `${item.number}:${item.frequency}`)
        .join(", ");

      setMessage(result);
      setRemainingTime(seconds);
    }
  }, [remainingTime]);

  const pauseTimer = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const resumeTimer = () => {
    setIsRunning(true);
  };

  return (
    <div>
      <h3>{numbers.length === 0 && "Please enter the first number"}</h3>
      <h3>{message}</h3>

      <form onSubmit={handleSubmit} className="form">
        <label className="form-label">
          <span>Number</span>
          <input
            className="form-input"
            type="number"
            value={newNumber}
            onChange={handleChange}
          />
        </label>
        <button className="form-button" type="submit">
          Add Number
        </button>
        <button
          className="form-button"
          type="button"
          onClick={pauseTimer}
          disabled={!isRunning}
        >
          Halt
        </button>
        <button
          className="form-button"
          type="button"
          onClick={resumeTimer}
          disabled={isRunning}
        >
          Resume
        </button>
      </form>
      {isFibonacciNumber && <p>FIB</p>}
    </div>
  );
};
