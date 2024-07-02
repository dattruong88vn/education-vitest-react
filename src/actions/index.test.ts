import { vi, test, describe, expect } from "vitest";
import axios from "axios";
import { getSecretWord } from ".";

describe("actions", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("getSecretWord success return a secret word", async () => {
    axios.get = vi.fn().mockResolvedValue({
      status: 200,
      data: "party",
    });

    const response = await getSecretWord();
    expect(response).toBe("party");
  });

  test("getSecretWord error return an error", async () => {
    axios.get = vi.fn().mockRejectedValue({
      status: 404,
      error: { message: "Not Found" },
    });

    try {
      await getSecretWord();
    } catch (err: any) {
      expect(err.status).toBe(404);
      expect(err.error.message).toBe("Not Found");
    }
  });
});
