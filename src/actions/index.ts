import axios from "axios";

export const getSecretWord = async () => {
  const response = await axios.get("/api/secret");
  return response.data;
};
