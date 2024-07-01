import { describe, test, afterEach, expect, vi } from "vitest";
import axios from "axios";
import { getSecretWord } from ".";

describe("getSecretWord", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("getSecretWord returns secret word", async () => {
    axios.get = vi.fn().mockResolvedValue({
      status: 200,
      data: "party",
    });

    const response = await getSecretWord();
    expect(response).toBe("party");
  });

  test("getSecretWord returns error", async () => {
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
