import { useParams } from "react-router";
import { joinGame } from "../../api/Game";
import MainLayout from "../../components/MainLayout";
import JoinGameForm from "./JoinGameForm";
import { useNavigate } from "react-router";
import { useEffect } from "react";

function JoinGamePage() {
  const { game } = useParams();
  const navigateTo = useNavigate();
  const existingPlayer = game ? localStorage.getItem(game) : null;
  const wordLength = game
    ? (localStorage.getItem(`${game}_length`) as unknown as number)
    : null;

  useEffect(() => {
    if (!game) {
      navigateTo("/");
    } else {
      if (existingPlayer && wordLength) {
        navigateTo(`/play/${game}`);
      }
    }
  });

  if (!game) {
    return null;
  }

  return (
    <MainLayout>
      <p className="callout">
        You've been invited to a game of <em>ADIEU</em>.
      </p>
      <JoinGameForm
        game={game}
        onSubmit={async (formData) => {
          const { player, length } = await joinGame(game, {
            username: formData.username,
          });
          localStorage.setItem(game, player);
          localStorage.setItem(`${game}_length`, `${length}`);
          return navigateTo(`/play/${game}`);
        }}
      />
    </MainLayout>
  );
}

export default JoinGamePage;
