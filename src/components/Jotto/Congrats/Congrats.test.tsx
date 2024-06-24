import { screen, render } from "@testing-library/react";
import { test, describe, expect } from "vitest";
import Congrats from "./Congrats";

const setup = (props: { success: boolean }) => render(<Congrats {...props} />);

describe("Congrats", () => {
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
