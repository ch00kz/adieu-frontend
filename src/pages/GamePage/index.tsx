import { useParams } from "react-router";
import MainLayout from "../../components/MainLayout";
import { useNavigate } from "react-router";
import { createPlayerGuess, getPlayerGuesses } from "../../api/Guess";
import { useEffect, useState } from "react";
import { Guess, LetterBlock } from "../../components/Guess";
import Leaderboard from "../../components/Leaderboard";
import { Keyboard } from "../../components/Keyboard";
import { Letter } from "../../generated/types";
import toast from "react-hot-toast";

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
      const response = await getPlayerGuesses(existingPlayer!);
      if (response.guesses.some((guess) => guess.isWinningGuess)) {
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
  ).map(() => ({ letter: " ", status: "Unsubmitted" }));

  return (
    <MainLayout>
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

          const response = await createPlayerGuess(existingPlayer!, {
            guess: currentGuess.map(({ letter }) => letter).join(""),
          });

          if (typeof response === "string") {
            toast.error(response);
          } else {
            const { guess } = response;
            setGuesses([...guesses, guess.letters]);
            setHasWon(guess.isWinningGuess);
            setRefreshTrigger(refreshTrigger + 1);
            setCurrentGuess([]);
          }
        }}
      />

      <Leaderboard
        game={game!}
        currentPlayer={existingPlayer!}
        refreshTrigger={refreshTrigger}
      />
    </MainLayout>
  );
}

export default GamePage;
