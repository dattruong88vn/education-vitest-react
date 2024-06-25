import Congrats from "./components/Jotto/Congrats/Congrats";
import GuessWords from "./components/Jotto/GuessWords/GuessWords";

function App() {
  return (
    <div data-testId="app" style={{ width: "100%", height: "100%" }}>
      <Congrats success={true} />
      <GuessWords
        guessWords={[
          { guessWord: "train", letterMatchCount: 3 },
          { guessWord: "water", letterMatchCount: 3 },
        ]}
      />
    </div>
  );
}

export default App;
