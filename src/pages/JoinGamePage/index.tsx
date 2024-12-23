import { useParams } from "react-router";
import { joinGame } from "../../api/JoinGame";
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
      <JoinGameForm
        onSubmit={async (formData) => {
          const { player, length } = await joinGame(game, {
            username: formData.username,
          });
          localStorage.setItem(game, player);
          localStorage.setItem(`${game}_length`, `${length}`);
          return navigateTo(`/play/${game}`);
        }}
      />
      <button
        className="secondary copyUrl"
        onClick={async () => {
          await navigator.clipboard.writeText(
            `http://localhost:5173/join/${game}`,
          );
        }}
      >
        Copy URL
      </button>
    </MainLayout>
  );
}

export default JoinGamePage;
