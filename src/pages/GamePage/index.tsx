import { useParams } from "react-router";
import MainLayout from "../../components/MainLayout";
import { useNavigate } from "react-router";
import CreateGuessForm from "./CreateGuessForm";
import { createGuess, Letter, Status } from "../../api/CreateGuess";
import { useEffect, useRef, useState } from "react";

const LetterBlock = ({ letter }: { letter: Letter }) => (
  <div className={`letter ${letter.status.toLowerCase()}`}>{letter.letter}</div>
);

const Guess = ({ guess }: { guess: Letter[] }) => (
  <div className="letters">
    {guess.map((letter, i) => (
      <LetterBlock key={i} letter={letter} />
    ))}
  </div>
);

function JoinGamePage() {
  const { game } = useParams();
  const existingPlayer = game ? localStorage.getItem(game) : null;
  const wordLength = game
    ? (localStorage.getItem(`${game}_length`) as unknown as number)
    : null;

  const navigateTo = useNavigate();
  const [guesses, setGuesses] = useState<Letter[][]>([]);
  const [currentGuess, setCurrentGuess] = useState<Letter[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!game) {
      navigateTo("/");
    } else {
      if (!(existingPlayer && wordLength)) {
        navigateTo(`/join/${game}`);
      }
    }
  });

  // this shouldn't happen but typescript thinks they can be null
  if (!(game && existingPlayer && wordLength)) {
    return null;
  }

  const numMissingLetters = wordLength - currentGuess.length;

  const blankGuesses: Letter[] = Array.from(
    Array(numMissingLetters).keys(),
  ).map(() => ({ letter: " ", status: Status.Unsubmitted }));

  return (
    <MainLayout>
      <div onClick={() => inputRef.current?.focus()}>
        <div className="guesses">
          {guesses.map((guess, i) => (
            <Guess key={i} guess={guess} />
          ))}
          <div className="letters">
            {currentGuess.map((letter, i) => (
              <LetterBlock key={i} letter={letter} />
            ))}
            {blankGuesses.map((letter, i) => (
              <LetterBlock key={i} letter={letter} />
            ))}
          </div>
        </div>
        <CreateGuessForm
          inputRef={inputRef}
          wordLength={wordLength}
          onSubmit={async (formData) => {
            const { letters } = await createGuess(existingPlayer!, {
              guess: formData.guess,
            });
            setGuesses([...guesses, letters]);
          }}
          onChange={(formData) => {
            setCurrentGuess(
              formData.guess.split("").map((letter: string) => ({
                letter,
                status: Status.Unsubmitted,
              })),
            );
          }}
        />
      </div>
    </MainLayout>
  );
}

export default JoinGamePage;
