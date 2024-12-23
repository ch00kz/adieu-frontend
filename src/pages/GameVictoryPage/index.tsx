import { useParams } from "react-router";
import MainLayout from "../../components/MainLayout";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getGuesses, Letter } from "../../api/Guess";
import { Guess } from "../../components/Guess";

function GameVictoryPage() {
  const { game } = useParams();
  const existingPlayer = game ? localStorage.getItem(game) : null;
  const wordLength = game
    ? (localStorage.getItem(`${game}_length`) as unknown as number)
    : null;

  const navigateTo = useNavigate();
  const [guesses, setGuesses] = useState<Letter[][]>([]);

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
      setGuesses(response.guesses.map((guess) => guess.letters));
    }
    fetchPlayerGuesses();
  }, [existingPlayer]);

  // this shouldn't happen but typescript thinks they can be null
  return (
    <MainLayout>
      <div>
        <div className="guesses">
          {guesses.map((guess, i) => (
            <Guess key={i} guess={guess} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export default GameVictoryPage;
