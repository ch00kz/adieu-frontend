import React from "react";

interface FormProps {
  onSubmit: (data: FormData) => void;
  game: string;
}

interface FormData {
  username: string;
}

function Form({ onSubmit, game }: FormProps) {
  const [formData, setFormData] = React.useState<FormData>({
    username: "",
  });

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter a name for the leaderboard
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <button className="button" disabled={!formData.username} type="submit">
        Join Game
      </button>
      <a
        role="button"
        className="button secondary copyUrl"
        onClick={async () => {
          await navigator.clipboard.writeText(
            `http://localhost:5173/join/${game}`,
          );
        }}
      >
        Copy URL
      </a>
    </form>
  );
}

export default Form;
