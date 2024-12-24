import { useNavigate } from "react-router";
import CreateGameForm from "./CreateGameForm";
import { createGame, GameKind } from "../../api/Game";
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
          switch (formData.kind) {
            case GameKind.Random: {
              const { game } = await createGame({ kind: GameKind.Random });
              return navigateTo(`/join/${game}`);
            }
            case GameKind.Custom: {
              const { game } = await createGame({
                kind: GameKind.Custom,
                word: formData.word,
              });
              return navigateTo(`/join/${game}`);
            }
          }
        }}
      />
    </MainLayout>
  );
}

export default HomePage;
