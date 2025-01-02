import React from "react";
import { Game } from "../../generated/types";

interface FormProps {
  onSubmit: (data: FormData) => void;
}

interface FormData {
  game: Game;
}

function Form({ onSubmit }: FormProps) {
  const [formData, setFormData] = React.useState<FormData>({
    game: { type: "Random" },
  });

  const isCustomGame = formData.game.type === "Custom";

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ game: { ...formData.game, [name]: value } });
  }

  function handleKindChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value as Game["type"];

    const randomGame = { type: "Random", word: undefined } as Game;
    const customGame = { type: "Custom", word: formData.game.word } as Game;
    setFormData({ game: value === "Random" ? randomGame : customGame });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <select
        name="type"
        value={formData.game.type}
        onChange={handleKindChange}
      >
        <option value="Random">Random</option>
        <option value="Custom">Custom</option>
      </select>
      <br />
      {isCustomGame && (
        <label>
          Word:
          <input
            type="text"
            name="word"
            disabled={!isCustomGame}
            value={formData.game.word}
            onChange={handleInputChange}
            maxLength={6}
          />
        </label>
      )}
      <br />
      <button
        className="button"
        type="submit"
      >{`Create Game with ${formData.game.type} Word`}</button>
    </form>
  );
}

export default Form;
