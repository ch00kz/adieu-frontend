import React from "react";

interface FormProps {
  onSubmit: (data: FormData) => void;
  onChange: (data: FormData) => void;
  wordLength: number;
  inputRef: React.RefObject<HTMLInputElement>;
}

interface FormData {
  guess: string;
}

function Form({ onSubmit, onChange, inputRef, wordLength }: FormProps) {
  const [formData, setFormData] = React.useState<FormData>({
    guess: "",
  });

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    onChange(newFormData);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(formData);
    setFormData({ guess: "" });
    onChange({ guess: "" });
    if (inputRef.current) {
      inputRef.current.focus(); // Force focus on the input
    }
  }

  return (
    <form className="guessForm" onSubmit={handleSubmit}>
      <label>
        Guess:
        <input
          ref={inputRef}
          type="text"
          name="guess"
          value={formData.guess}
          onChange={handleInputChange}
          maxLength={wordLength}
          autoFocus
        />
      </label>
      <br />
      <button type="submit" disabled={!formData.guess}>
        Guess
      </button>
    </form>
  );
}

export default Form;
