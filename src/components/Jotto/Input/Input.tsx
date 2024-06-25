import React from "react";

export interface InputProps {
  onSubmit: (value: string) => void;
  secretWord: string;
  success: boolean;
}

const Input = ({ onSubmit, secretWord, success }: InputProps) => {
  const [currentGuess, setCurrentGuess] = React.useState("");

  const handleSubmit = () => {
    onSubmit(currentGuess);
    setCurrentGuess("");
  };

  if (success) {
    return <div data-testid="congrats">You guessed correctly!</div>;
  }

  return (
    <div data-testid="input-section">
      <input
        data-testid="input-field"
        type="text"
        value={currentGuess}
        onChange={(e) => setCurrentGuess(e.target.value)}
      />
      <button data-testid="submit-button" type="button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default Input;
