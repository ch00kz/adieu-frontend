import { useNavigate } from "react-router";
import CreateGameForm from "./CreateGameForm";
import { createGame } from "../../api/Game";
import MainLayout from "../../components/MainLayout";
import toast from "react-hot-toast";

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
          const response = await createGame({ game: formData.game });
          if (typeof response === "string") {
            toast.error(response);
          } else {
            const { gameId } = response;
            return navigateTo(`/join/${gameId}`);
          }
        }}
      />
    </MainLayout>
  );
}

export default HomePage;
