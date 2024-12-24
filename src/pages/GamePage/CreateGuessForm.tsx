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

  const updateGuess = (newFormData: FormData) => {
    setFormData(newFormData);
    onChange(newFormData);
  };

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const newFormData = { ...formData, [name]: value };
    updateGuess(newFormData);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(formData);
    updateGuess({ guess: "" });

    // refocus the hidden field
    if (inputRef.current) {
      inputRef.current.focus();
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
          autoComplete="off"
          autoFocus
        />
      </label>
      <br />
      <button
        className="button"
        type="submit"
        disabled={formData.guess.length != wordLength}
      >
        Guess
      </button>
    </form>
  );
}

export default Form;
