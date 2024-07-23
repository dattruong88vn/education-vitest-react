import { screen, render } from "@testing-library/react";
import { test, describe, expect } from "vitest";
import Congrats from "./Congrats";
import ThemeContext from "../../../context/themeContext";

describe("Congrats", () => {
  const setup = (props: { success: boolean }) =>
    render(<Congrats {...props} />);

  test("render without error", () => {
    setup({ success: false });
    const congrats = screen.getByTestId("congrats");
    expect(congrats).toBeInTheDocument();
  });

  test("render no text when success is false", () => {
    setup({ success: false });
    const congrats = screen.getByTestId("congrats");
    expect(congrats.textContent).toEqual("");
  });

  test("render non-empty text when success is true", () => {
    setup({ success: true });
    const congrats = screen.getByTestId("congrats");
    expect(congrats.textContent).not.toEqual("");
  });
});

describe("render correct style with theme", () => {
  const setupTheme = (theme: string, setTheme: (theme: string) => void) => {
    return render(
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Congrats success={true} />
      </ThemeContext.Provider>
    );
  };

  test("render red text in light theme", () => {
    const { getByTestId } = setupTheme("light", () => {});
    const congrats = getByTestId("congrats");
    expect(congrats.style.color).toEqual("red");
  });

  test("render yellow text in dark theme", () => {
    const { getByTestId } = setupTheme("dark", () => {});
    const congrats = getByTestId("congrats");
    expect(congrats.style.color).toEqual("yellow");
  });
});
