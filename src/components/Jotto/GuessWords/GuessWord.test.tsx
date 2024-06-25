import { render, screen } from "@testing-library/react";
import { test, describe } from "vitest";

import GuessWords, { GuessWordsProps } from "./GuessWords";

const setup = (props: GuessWordsProps) => render(<GuessWords {...props} />);

describe("GuessWords", () => {
  describe("render correct when guessWords is empty", () => {
    beforeEach(() => setup({ guessWords: [] }));

    test("render without error", () => {
      const guessWords = screen.getByTestId("guess-words");
      expect(guessWords).toBeInTheDocument();
    });

    test("render instruction to guess word", () => {
      const guessWordInstruction = screen.getByTestId("guess-word-instruction");
      expect(guessWordInstruction.textContent).not.toHaveLength(0);
    });
  });

  describe("render correct when guessWords is not empty", () => {
    beforeEach(() =>
      setup({
        guessWords: [
          { guessWord: "train", letterMatchCount: 3 },
          { guessWord: "water", letterMatchCount: 3 },
        ],
      })
    );
    test("render without error", () => {
      const guessWords = screen.getByTestId("guess-words");
      expect(guessWords).toBeInTheDocument();
    });

    test("render guess words section", () => {
      const guessWordSection = screen.getByTestId("guess-words-list");
      expect(guessWordSection).toBeInTheDocument();
    });

    test("render correct list guessWords", () => {
      const guessWordSection = screen.getByTestId("guess-words-list");
      expect(guessWordSection.children).toHaveLength(2);
    });
  });
});
