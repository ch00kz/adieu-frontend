// import { useEffect } from "react";
import { Letter, Status } from "../../api/Guess";

const topRow = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
const middleRow = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
const bottomRow = ["z", "x", "c", "v", "b", "n", "m"];

interface KeyProps {
  letter: string;
  onClick: () => void;
  wideKey?: boolean;
  className?: string;
}

function Key({ letter, onClick, wideKey, className }: KeyProps) {
  return (
    <button
      className={`key ${wideKey && "wideKey"} ${className}`}
      onClick={onClick}
    >
      {letter.toUpperCase()}
    </button>
  );
}

interface KeyboardProps {
  guess: Letter[];
  allGuesses: Letter[][];
  setGuess: (l: Letter[]) => void;
  submitGuess: () => void;
}

export function Keyboard({
  guess,
  setGuess,
  submitGuess,
  allGuesses,
}: KeyboardProps) {
  const status = Status.Unsubmitted;

  const allLetters = allGuesses.flat();
  // const allKeys = [...topRow, ...middleRow, ...bottomRow];
  const backSpace = () => setGuess(guess.slice(0, -1));
  const pressKey = (letter: string) => setGuess([...guess, { letter, status }]);

  // useEffect(() => {
  //   const handleKeyPress = (event: KeyboardEvent) => {
  //     event.preventDefault();
  //     console.log(event);
  //     const key = event.key;
  //     if (allKeys.includes(key.toLowerCase())) {
  //       pressKey(key);
  //     } else if (key === "Backspace") {
  //       event.preventDefault();
  //       backSpace();
  //     } else if (key === "Enter") {
  //       event.preventDefault();
  //       submitGuess();
  //     }
  //   };

  //   // Add event listener to the window
  //   window.addEventListener("keydown", handleKeyPress);

  //   // Cleanup the event listener on component unmount
  //   return () => {
  //     window.removeEventListener("keydown", handleKeyPress);
  //   };
  // }, [guess]);

  function letterIs(key: string, targetStatus: Status) {
    return allLetters
      .filter(({ letter }) => letter === key)
      .some(({ status }) => status === targetStatus);
  }

  function getClassName(letter: string): string {
    if (letterIs(letter, Status.Correct)) {
      return "correct";
    }
    if (letterIs(letter, Status.InTheWord)) {
      return "intheword";
    }
    if (letterIs(letter, Status.Wrong)) {
      return "wrong";
    }
    return "unsubmitted";
  }

  return (
    <div className="keyboard">
      <div className="keyboardRow">
        {topRow.map((letter) => (
          <Key
            className={getClassName(letter)}
            key={letter}
            letter={letter}
            onClick={() => pressKey(letter)}
          />
        ))}
      </div>
      <div className="keyboardRow middleRow">
        {middleRow.map((letter) => (
          <Key
            className={getClassName(letter)}
            key={letter}
            letter={letter}
            onClick={() => pressKey(letter)}
          />
        ))}
      </div>
      <div className="keyboardRow">
        <Key
          key={"↲"}
          letter={"↲"}
          onClick={submitGuess}
          className="enterKey"
          wideKey
        />
        {bottomRow.map((letter) => (
          <Key
            className={getClassName(letter)}
            key={letter}
            letter={letter}
            onClick={() => pressKey(letter)}
          />
        ))}
        <Key
          key={"⌫"}
          letter={"⌫"}
          onClick={() => backSpace()}
          className="deleteKey "
          wideKey
        />
      </div>
    </div>
  );
}
