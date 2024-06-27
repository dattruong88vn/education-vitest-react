import { useState } from "react";
import Congrats from "./components/Jotto/Congrats/Congrats";
import GuessWords, {
  GuessWordType,
} from "./components/Jotto/GuessWords/GuessWords";
import Input from "./components/Jotto/Input/Input";
import { getLetterMatchCount } from "./helpers";

function App() {
  const SECRET_WORD = "party";
  const [guessWords, setGuessWords] = useState<GuessWordType[]>([]);
  const [success, setSuccess] = useState(false);

  const handleSubmitGuessWord = (value: string) => {
    if (value === SECRET_WORD) {
      setSuccess(true);
    }

    const letterMatchCount = getLetterMatchCount(SECRET_WORD, value);
    const data = {
      guessWord: value,
      letterMatchCount,
    };
    setGuessWords([...guessWords, data]);
  };

  return (
    <div data-testid="app" style={{ width: "100%", height: "100%" }}>
      <h1>Jotto Chalenge</h1>
      <Input
        success={success}
        secretWord={SECRET_WORD}
        onSubmit={handleSubmitGuessWord}
      />
      <Congrats success={success} />
      <GuessWords guessWords={guessWords} />
    </div>
  );
}

export default App;
