import { ChangeEvent, FormEvent, useState } from "react";
import { Game } from "./Components/Game";

function App() {
  const [seconds, setSeconds] = useState<number | "">("");
  const [start, setStart] = useState<boolean>(false);
  const [quit, setQuit] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericValue = Number(inputValue);

    if (isNaN(numericValue) || numericValue <= 0) {
      setSeconds("");
    } else {
      setSeconds(numericValue);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setQuit(false);
    setStart(true);
  };

  const handleQuit = () => {
    setStart(false);
    setQuit(true);
  };

  return (
    <div>
      <h3>
        Please input the number of time in seconds between emitting numbers and
        their frequency
      </h3>

      <form onSubmit={handleSubmit} className="form">
        <label className="form-label">
          <span>Seconds</span>
          <input
            className="form-input"
            type="number"
            value={seconds}
            onChange={handleChange}
            min={1}
          />
        </label>
        <button className="form-button" type="submit" disabled={seconds === ""}>
          Go!
        </button>
        <button
          className="form-button quit-button"
          type="button"
          disabled={!start}
          onClick={handleQuit}
        >
          Quit
        </button>
      </form>

      {start && <Game seconds={Number(seconds)} />}
      {quit && <p>Thanks for playing</p>}
    </div>
  );
}

export default App;
