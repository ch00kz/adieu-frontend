import { useNavigate } from "react-router";
import CreateGameForm from "./CreateGameForm";
import { createGame } from "../../api/Game";
import MainLayout from "../../components/MainLayout";

function HomePage() {
  const navigateTo = useNavigate();
  return (
    <MainLayout>
      <p className="callout">
        Welcome to <em>ADIEU</em>. Create a new game, and share the link with
        your friends (or enemies). Use a random word, or choose one of your own.
      </p>
      <CreateGameForm
        onSubmit={async (formData) => {
          const { gameId } = await createGame({ game: formData.game });
          return navigateTo(`/join/${gameId}`);
        }}
      />
    </MainLayout>
  );
}

export default HomePage;
