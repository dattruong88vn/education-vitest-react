import { useEffect, useState } from "react";
import Congrats from "./components/Jotto/Congrats/Congrats";
import GuessWords, {
  GuessWordType,
} from "./components/Jotto/GuessWords/GuessWords";
import Input from "./components/Jotto/Input/Input";
import { getLetterMatchCount } from "./helpers";
import { getSecretWord } from "./actions";

function App() {
  const [guessWords, setGuessWords] = useState<GuessWordType[]>([]);
  const [success, setSuccess] = useState(false);
  const [secretWord, setSecretWord] = useState<string>("party");

  useEffect(() => {
    const getWord = async () => {
      const word = await getSecretWord();
      setSecretWord(word);
    };
    getWord();
  }, []);

  const handleSubmitGuessWord = (value: string) => {
    if (value === secretWord) {
      setSuccess(true);
    }

    const letterMatchCount = getLetterMatchCount(secretWord, value);
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
        secretWord={secretWord}
        onSubmit={handleSubmitGuessWord}
      />
      <Congrats success={success} />
      <GuessWords guessWords={guessWords} />
    </div>
  );
}

export default App;
