import { useParams } from "react-router";
import MainLayout from "../../components/MainLayout";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { GameGuess, getGameGuesses, getGuesses, Letter } from "../../api/Guess";
import { Guess } from "../../components/Guess";

function GameVictoryPage() {
  const { game } = useParams();
  const existingPlayer = game ? localStorage.getItem(game) : null;
  const wordLength = game
    ? (localStorage.getItem(`${game}_length`) as unknown as number)
    : null;

  const navigateTo = useNavigate();
  const [playerGuesses, setPlayerGuesses] = useState<Letter[][]>([]);
  const [gameGuesses, setGameGuesses] = useState<GameGuess[]>([]);

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

    async function fetchGameGuesses() {
      const response = await getGameGuesses(game!);
      setGameGuesses(response.guesses);
    }

    fetchPlayerGuesses();
    fetchGameGuesses();
  }, [existingPlayer]);

  const victoryEmoji = (num: number): string => {
    switch (num) {
      case 0:
        return "🥇";
      case 1:
        return "🥈";
      case 2:
        return "🥉";
      default:
        return "🏁";
    }
  };

  // this shouldn't happen but typescript thinks they can be null
  return (
    <MainLayout pageTitle={"🎉 ADIEU 🎉"}>
      <div>
        <div className="guesses">
          {playerGuesses.map((guess, i) => (
            <Guess key={i} guess={guess} />
          ))}
        </div>

        <div className="leaderboard">
          <table>
            <thead>
              <th></th>
              <th>Username</th>
              <th>Guesses</th>
            </thead>
            <tbody>
              {gameGuesses.map((guess, position) => {
                const isYou = guess.player == existingPlayer;
                return (
                  <tr>
                    <td className={isYou ? "you" : ""}>
                      {guess.has_won && victoryEmoji(position)}
                    </td>
                    <td className={isYou ? "you" : ""}>{guess.username}</td>
                    <td className={isYou ? "you" : ""}>{guess.guesses}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
}

export default GameVictoryPage;
