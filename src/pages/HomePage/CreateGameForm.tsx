import React from "react";
import { GameKind } from "../../api/Game";

interface FormProps {
  onSubmit: (data: FormData) => void;
}

interface FormData {
  kind: GameKind;
  word: string;
}

function Form({ onSubmit }: FormProps) {
  const [formData, setFormData] = React.useState<FormData>({
    kind: GameKind.Random,
    word: "",
  });

  const isCustomGame = formData.kind === GameKind.Custom;

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleKindChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    const kind = value as GameKind;
    setFormData({ kind, word: kind === GameKind.Random ? "" : formData.word });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <select name="kind" value={formData.kind} onChange={handleKindChange}>
        <option value={GameKind.Random}>Random</option>
        <option value={GameKind.Custom}>Custom</option>
      </select>
      <br />
      {isCustomGame && (
        <label>
          Word:
          <input
            type="text"
            name="word"
            disabled={!isCustomGame}
            value={formData.word}
            onChange={handleInputChange}
            maxLength={6}
          />
        </label>
      )}
      <br />
      <button
        className="button"
        type="submit"
      >{`Create Game with ${formData.kind} Word`}</button>
    </form>
  );
}

export default Form;
