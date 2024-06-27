import React from "react";
import { describe, test, expect, vi } from "vitest";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import Input, { InputProps } from "./Input";

const onSubmitMock = vi.fn((_: string) => undefined);

const setup = (
  success: InputProps["success"] = false,
  secretWord: InputProps["secretWord"] = "train",
  onSubmit: InputProps["onSubmit"] = onSubmitMock
) =>
  render(
    <Input onSubmit={onSubmit} secretWord={secretWord} success={success} />
  );

describe("Input Component", () => {
  let inputField: HTMLInputElement;
  const inputText = "Hello";

  describe("render without error", () => {
    describe("success is false", () => {
      beforeEach(() => {
        setup();
      });
      afterEach(() => {
        cleanup();
      });
      test("render input section", () => {
        const inputSection = screen.queryByTestId("input-section");
        expect(inputSection).toBeInTheDocument();
      });

      test("render input element", () => {
        const inputField = screen.queryByTestId("input-field");
        expect(inputField).toBeInTheDocument();
      });
      test("render submit button element", () => {
        const submitButton = screen.queryByTestId("submit-button");
        expect(submitButton).toBeInTheDocument();
      });
    });

    describe("success is true", () => {
      beforeEach(() => {
        setup(true);
      });
      afterEach(() => {
        cleanup();
      });
      test("not render input section", () => {
        const inputSection = screen.queryByTestId("input-section");
        expect(inputSection).not.toBeInTheDocument();
      });
    });
  });

  describe("state control input field", () => {
    const setState = vi.fn();

    beforeEach(() => {
      setState.mockClear();
      vi.spyOn(React, "useState").mockImplementation(() => [
        undefined,
        setState,
      ]);
      setup();
      inputField = screen.getByTestId("input-field");
    });

    afterEach(() => {
      vi.restoreAllMocks();
      cleanup();
    });

    test("init value", () => {
      expect(setState).toHaveBeenCalledTimes(0);
      expect(inputField).toHaveValue("");
    });

    test("update value", () => {
      fireEvent.change(inputField, { target: { value: inputText } });
      expect(setState).toHaveBeenCalledWith(inputText);
      expect(setState).toHaveBeenCalledTimes(1);
      expect(inputField).toHaveValue(inputText);

      fireEvent.change(inputField, { target: { value: "" } });
      expect(setState).toHaveBeenCalledWith("");
      expect(setState).toHaveBeenCalledTimes(2);
      expect(inputField).toHaveValue("");
    });
  });

  describe("submit button clicked", () => {
    beforeEach(() => {
      setup();
      inputField = screen.getByTestId("input-field");
      fireEvent.change(inputField, { target: { value: inputText } });
      const submitButton = screen.getByTestId("submit-button");
      fireEvent.click(submitButton);
    });

    afterEach(() => {
      cleanup();
    });

    test("clear input value", () => {
      expect(inputField).toHaveValue("");
    });

    test("execute submit function", () => {
      expect(onSubmitMock).toHaveBeenCalledWith(inputText);
    });
  });
});
