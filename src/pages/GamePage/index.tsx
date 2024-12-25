import { useParams } from "react-router";
import MainLayout from "../../components/MainLayout";
import { useNavigate } from "react-router";
import { createGuess, getGuesses, Letter, Status } from "../../api/Guess";
import { useEffect, useState } from "react";
import { Guess, LetterBlock } from "../../components/Guess";
import Leaderboard from "../../components/Leaderboard";
import { Keyboard } from "../../components/Keyboard";

function GamePage() {
  const { game } = useParams();
  const existingPlayer = game ? localStorage.getItem(game) : null;
  const wordLength = game
    ? (localStorage.getItem(`${game}_length`) as unknown as number)
    : null;

  const navigateTo = useNavigate();
  const [hasWon, setHasWon] = useState<boolean>(false);
  const [guesses, setGuesses] = useState<Letter[][]>([]);
  const [currentGuess, setCurrentGuess] = useState<Letter[]>([]);

  const safeSetCurrentGuess = (g: Letter[]) => {
    if (g.length <= wordLength!) {
      setCurrentGuess(g);
    }
  };
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  useEffect(() => {
    if (!game) {
      navigateTo("/");
    } else {
      if (!(existingPlayer && wordLength)) {
        navigateTo(`/join/${game}`);
      }
    }
  });

  useEffect(() => {
    async function fetchPlayerGuesses() {
      const response = await getGuesses(existingPlayer!);
      if (response.guesses.some((guess) => guess.is_winning_guess)) {
        navigateTo(`/victory/${game}`);
      } else {
        setGuesses(response.guesses.map((guess) => guess.letters));
      }
    }
    fetchPlayerGuesses();
  }, [existingPlayer, game, navigateTo]);

  useEffect(() => {
    if (hasWon) {
      navigateTo(`/victory/${game}`);
    }
  }, [hasWon, navigateTo, game]);

  // this shouldn't happen but typescript thinks they can be null
  if (!(game && existingPlayer && wordLength)) {
    return null;
  }

  const numMissingLetters = hasWon ? 0 : wordLength - currentGuess.length;

  const blankGuesses: Letter[] = Array.from(
    Array(numMissingLetters).keys(),
  ).map(() => ({ letter: " ", status: Status.Unsubmitted }));

  return (
    <MainLayout>
      <div>
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

        <Keyboard
          allGuesses={guesses}
          guess={currentGuess}
          setGuess={safeSetCurrentGuess}
          submitGuess={async () => {
            const newGuess = currentGuess.map(({ letter }) => letter).join("");
            if (newGuess.length != wordLength) {
              return;
            }

            const { guess } = await createGuess(existingPlayer!, {
              guess: currentGuess.map(({ letter }) => letter).join(""),
            });
            setGuesses([...guesses, guess.letters]);
            setHasWon(guess.is_winning_guess);
            setRefreshTrigger(refreshTrigger + 1);
            setCurrentGuess([]);
          }}
        />

        <Leaderboard
          game={game!}
          currentPlayer={existingPlayer!}
          refreshTrigger={refreshTrigger}
        />
      </div>
    </MainLayout>
  );
}

export default GamePage;
