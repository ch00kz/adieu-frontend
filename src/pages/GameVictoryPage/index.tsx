import { useParams } from "react-router";
import MainLayout from "../../components/MainLayout";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getGuesses, Letter } from "../../api/Guess";
import { Guess } from "../../components/Guess";
import Leaderboard from "../../components/Leaderboard";

function GameVictoryPage() {
  const { game } = useParams();
  const existingPlayer = game ? localStorage.getItem(game) : null;
  const wordLength = game
    ? (localStorage.getItem(`${game}_length`) as unknown as number)
    : null;

  const navigateTo = useNavigate();
  const [playerGuesses, setPlayerGuesses] = useState<Letter[][]>([]);

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
      setPlayerGuesses(response.guesses.map((guess) => guess.letters));
    }
    fetchPlayerGuesses();
  }, [existingPlayer]);

  // this shouldn't happen but typescript thinks they can be null
  return (
    <MainLayout victory>
      <p className="callout"></p>

      <div>
        <div className="guesses">
          {playerGuesses.map((guess, i) => (
            <Guess key={i} guess={guess} />
          ))}
        </div>

        <Leaderboard
          game={game!}
          currentPlayer={existingPlayer!}
          refreshTrigger={0}
        />
      </div>
    </MainLayout>
  );
}

export default GameVictoryPage;
