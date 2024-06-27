import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { test, describe } from "vitest";
import App from "./App";

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
  render(<App />);
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
});
