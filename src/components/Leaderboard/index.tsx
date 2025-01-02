import { useEffect, useState } from "react";
import { getGameScores } from "../../api/Guess";
import { PlayerScore } from "../../generated/types";

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
  const [playerScores, setPlayerScores] = useState<PlayerScore[]>([]);

  useEffect(() => {
    async function fetchGameScores() {
      const response = await getGameScores(game!);
      setPlayerScores(response.playerScores);
    }

    fetchGameScores();
  }, [refreshTrigger, game]);

  return (
    <div className="leaderboard">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Player</th>
            <th style={{ textAlign: "center" }}>Guesses</th>
          </tr>
        </thead>
        <tbody>
          {playerScores.length ? (
            playerScores.map((guess, position) => {
              const isYou = guess.player == currentPlayer;
              return (
                <tr key={guess.player}>
                  <td className={isYou ? "you" : ""}>
                    {guess.hasWon && victoryEmoji(position)}
                  </td>
                  <td className={isYou ? "you" : ""}>
                    {guess.username}
                    {isYou && <span> (you)</span>}
                  </td>
                  <td
                    style={{ textAlign: "center" }}
                    className={isYou ? "you" : ""}
                  >
                    {guess.guesses}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td></td>
              <td>No one has made a guess!</td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
