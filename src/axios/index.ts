import axios from "axios";

export const getSecretWord = async () => {
  // TODO: write action call this fn in redux or context
  const response = await axios.get("/api/secret");
  return response.data;
};
