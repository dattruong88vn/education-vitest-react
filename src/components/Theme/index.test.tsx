import { describe, test, vi, expect } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import ThemePicker from ".";
import ThemeContext from "../../context/themeContext";

describe("Theme", () => {
  afterEach(() => {
    cleanup();
  });

  test("render without error", () => {
    const { getByTestId } = render(<ThemePicker />);
    expect(getByTestId("theme-picker")).toBeInTheDocument();
  });

  test("render no-zero list theme", () => {
    const { getAllByTestId } = render(<ThemePicker />);
    const themeList = getAllByTestId("theme");
    expect(themeList.length).toBeGreaterThan(0);
  });

  test("execute fn change theme when click", () => {
    const setTheme = vi.fn();
    const { getAllByTestId } = render(
      <ThemeContext.Provider value={{ theme: "light", setTheme }}>
        <ThemePicker />
      </ThemeContext.Provider>
    );

    const themeList = getAllByTestId("theme");
    const firstTheme = themeList[0];
    fireEvent.click(firstTheme);
    expect(setTheme).toHaveBeenCalledTimes(1);
  });
});
