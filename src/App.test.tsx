import { screen, render, fireEvent } from "@testing-library/react";
import { test, describe, vi } from "vitest";
import App from "./App";
import { getSecretWord } from "./actions";

// Mock myAsyncFunction globally
// if thera is __mock__ folder, it will be used
vi.mock("./actions");

const setup = () => render(<App />);

describe("App", () => {
  beforeEach(() => {
    setup();
  });

  test("render without error", () => {
    const app = screen.queryAllByTestId("app");
    expect(app).toHaveLength(1);
  });
});

const setupFunctional = () => {
  return render(<App />);
};

describe("App Functionality", () => {
  let inputField: HTMLInputElement;
  let submitBtn: HTMLButtonElement;

  beforeEach(() => {
    setupFunctional();
    inputField = screen.getByTestId("input-field") as HTMLInputElement;
    submitBtn = screen.getByTestId("submit-button") as HTMLButtonElement;
  });

  const guessWordAction = (words: string[]) => {
    words.forEach((word: string) => {
      fireEvent.change(inputField, { target: { value: word } });
      fireEvent.click(submitBtn);
    });
  };

  describe("render list guess words correctly", () => {
    test("render 0 guess words", () => {
      const guessWordsTable = screen.queryAllByTestId(
        "guess-word"
      ) as HTMLDivElement[];
      expect(guessWordsTable).toHaveLength(0);
    });

    test("render 1 guess words", () => {
      guessWordAction(["train"]);

      const guessWordsTable = screen.queryAllByTestId(
        "guess-word"
      ) as HTMLDivElement[];
      expect(guessWordsTable).toHaveLength(1);
    });

    test("render 3 guess words", () => {
      guessWordAction(["train", "water", "party"]);

      const guessWordsTable = screen.queryAllByTestId(
        "guess-word"
      ) as HTMLDivElement[];
      expect(guessWordsTable).toHaveLength(3);
    });
  });

  describe("render congrats and input component correctly", () => {
    test("guess incorrect word", () => {
      guessWordAction(["train", "water"]);

      const congratsComponent = screen.queryByTestId(
        "congrats"
      ) as HTMLDivElement;
      expect(congratsComponent.textContent).toHaveLength(0);

      const inputComponent = screen.queryByTestId(
        "input-field"
      ) as HTMLInputElement;
      expect(inputComponent).toBeInTheDocument();
    });

    test("guess correct word", () => {
      guessWordAction(["train", "water", "party"]);
      const inputComponent = screen.queryByTestId(
        "input-field"
      ) as HTMLInputElement;
      expect(inputComponent).toBeNull();

      const congratsComponent = screen.queryByTestId(
        "congrats"
      ) as HTMLDivElement;
      expect(congratsComponent.textContent).not.toHaveLength(0);
    });
  });

  describe("fetch secret word correctly", () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    test("get secret word", async () => {
      const secretWord = await getSecretWord();
      expect(secretWord).toBe("party");
    });

    test("get secret word runs on app mount", () => {
      setupFunctional();
      expect(getSecretWord).toHaveBeenCalledTimes(1);
    });

    test("get secret word does not run on app update", () => {
      const { rerender } = setupFunctional();
      rerender(<App />);
      expect(getSecretWord).toHaveBeenCalledTimes(1);
    });
  });
});
