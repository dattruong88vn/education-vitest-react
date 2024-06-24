import { describe, expect, test } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import Counter from "./Counter";

const setup = () => render(<Counter />);

describe("render counter component and elements correctly", () => {
  test("render counter component", () => {
    setup();
    const counter = screen.getByTestId("counter");
    expect(counter).toBeInTheDocument();
  });

  test("render counter description", () => {
    setup();
    const counterDescription = screen.getByTestId("counter-description");
    expect(counterDescription).toBeInTheDocument();
  });

  test("render button increase", () => {
    setup();
    const btnIncrease = screen.getByTestId("button-increase");
    expect(btnIncrease).toBeInTheDocument();
  });

  test("render button decrease", () => {
    setup();
    const btnDecrease = screen.getByTestId("button-decrease");
    expect(btnDecrease).toBeInTheDocument();
  });

  test("render counter value with initial value", () => {
    setup();
    const counterValue = screen.getByTestId("counter-value");
    expect(counterValue).toBeInTheDocument();
    expect(counterValue).toHaveTextContent("0");
  });

  test("render counter value correctly when increase/decrease", () => {
    setup();

    const btnIncrease = screen.getByTestId("button-increase");
    const btnDecrease = screen.getByTestId("button-decrease");
    const counter = screen.getByTestId("counter-value");

    fireEvent.click(btnIncrease);
    expect(counter).toHaveTextContent("1");
    fireEvent.click(btnDecrease);
    expect(counter).toHaveTextContent("0");
  });
});
