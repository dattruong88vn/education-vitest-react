import { describe, test } from "vitest";
import { getLetterMatchCount } from "./index";

describe("getLetterMatchCount", () => {
  const secretWord = "party";

  test("return correct count when there are no matching letters", () => {
    const guessWord = getLetterMatchCount(secretWord, "hello");
    expect(guessWord).toBe(0);
  });
  test("return correct count when there are 3 matching letters", () => {
    const guessWord = getLetterMatchCount(secretWord, "train");
    expect(guessWord).toBe(3);
  });
  test("return correct count when there are duplicate letters in the guess", () => {
    const guessWord = getLetterMatchCount(secretWord, "parka");
    expect(guessWord).toBe(3);
  });
});
