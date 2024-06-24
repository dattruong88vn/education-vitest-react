export interface GuessWordsProps {
  guessWords: { guessWord: string; letterMatchCount: number }[];
}
const GuessWords = ({ guessWords }: GuessWordsProps) => {
  return (
    <div data-testId="guess-words">
      {guessWords.length > 0 ? (
        <div data-testId="guess-words-list">
          {guessWords.map((word, index) => (
            <div
              key={index}
              data-testId="guess-word"
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
        <div data-testId="guess-word-instruction">
          Try to guess secret word!
        </div>
      )}
    </div>
  );
};

export default GuessWords;
