import { useEffect, useReducer } from "react";
import Congrats from "./components/Jotto/Congrats/Congrats";
import GuessWords, {
  GuessWordType,
} from "./components/Jotto/GuessWords/GuessWords";
import Input from "./components/Jotto/Input/Input";
import { getLetterMatchCount } from "./helpers";
import { getSecretWord } from "./actions";

interface State {
  secretWord: string;
  guessWords: GuessWordType[];
  success: boolean;
}

enum ActionType {
  SET_SECRET_WORD = "setSecretWord",
  SET_GUESS_WORDS = "setGuessWords",
  SET_SUCCESS = "setSuccess",
}

type Action =
  | { type: ActionType.SET_SECRET_WORD; payload: string }
  | { type: ActionType.SET_GUESS_WORDS; payload: GuessWordType[] }
  | { type: ActionType.SET_SUCCESS; payload: boolean };

const initialState: State = {
  secretWord: "",
  guessWords: [],
  success: false,
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.SET_SECRET_WORD:
      return { ...state, secretWord: action.payload };
    case ActionType.SET_GUESS_WORDS:
      return { ...state, guessWords: action.payload };
    case ActionType.SET_SUCCESS:
      return { ...state, success: action.payload };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer<(state: State, action: Action) => State>(
    reducer,
    initialState
  );

  useEffect(() => {
    const getWord = async () => {
      const word = await getSecretWord();
      dispatch({ type: ActionType.SET_SECRET_WORD, payload: word });
    };
    getWord();
  }, []);

  const handleSubmitGuessWord = (value: string) => {
    if (value === state.secretWord) {
      dispatch({ type: ActionType.SET_SUCCESS, payload: true });
    }

    const letterMatchCount = getLetterMatchCount(state.secretWord, value);
    const data = {
      guessWord: value,
      letterMatchCount,
    };

    dispatch({
      type: ActionType.SET_GUESS_WORDS,
      payload: [...state.guessWords, data],
    });
  };

  return (
    <div data-testid="app" style={{ width: "100%", height: "100%" }}>
      <h1>Jotto Chalenge</h1>
      <Input success={state.success} onSubmit={handleSubmitGuessWord} />
      <Congrats success={state.success} />
      <GuessWords guessWords={state.guessWords} />
    </div>
  );
}

export default App;
