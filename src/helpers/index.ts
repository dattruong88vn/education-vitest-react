export const getLetterMatchCount = (secretWord: string, guessWord: string) => {
  const secretLetters = secretWord.split("");
  const guessLettersSet = new Set(guessWord);
  return secretLetters.filter((letter) => guessLettersSet.has(letter)).length;
};
