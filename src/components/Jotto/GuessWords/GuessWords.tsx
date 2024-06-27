export type GuessWordType = { guessWord: string; letterMatchCount: number };

export interface GuessWordsProps {
  guessWords: GuessWordType[];
}
const GuessWords = ({ guessWords }: GuessWordsProps) => {
  return (
    <div data-testid="guess-words">
      {guessWords.length > 0 ? (
        <div data-testid="guess-words-list">
          {guessWords.map((word, index) => (
            <div
              key={index}
              data-testid="guess-word"
              style={{
                width: 500,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>{word.guessWord}</div>
              <div>{word.letterMatchCount}</div>
            </div>
          ))}
        </div>
      ) : (
        <div data-testid="guess-word-instruction">
          Try to guess secret word!
        </div>
      )}
    </div>
  );
};

export default GuessWords;
