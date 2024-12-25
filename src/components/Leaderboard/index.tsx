import { useEffect, useState } from "react";
import { GameGuess, getGameGuesses } from "../../api/Guess";

type Props = {
  game: string;
  currentPlayer: string;
  refreshTrigger: number;
};

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

export default function Leaderboard({
  game,
  currentPlayer,
  refreshTrigger,
}: Props) {
  const [gameGuesses, setGameGuesses] = useState<GameGuess[]>([]);

  useEffect(() => {
    async function fetchGameGuesses() {
      const response = await getGameGuesses(game!);
      setGameGuesses(response.guesses);
    }

    fetchGameGuesses();
  }, [refreshTrigger, game]);

  return (
    <div className="leaderboard">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Username</th>
            <th>Guesses</th>
          </tr>
        </thead>
        <tbody>
          {gameGuesses.length ? (
            gameGuesses.map((guess, position) => {
              const isYou = guess.player == currentPlayer;
              return (
                <tr key={guess.player}>
                  <td className={isYou ? "you" : ""}>
                    {guess.has_won && victoryEmoji(position)}
                  </td>
                  <td className={isYou ? "you" : ""}>{guess.username}</td>
                  <td className={isYou ? "you" : ""}>{guess.guesses}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td></td>
              <td>You're the first to guess!</td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
