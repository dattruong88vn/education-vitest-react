import axios from "axios";

export const getSecretWord = async () => {
  const response = await axios.get(
    "https://random-word-api.herokuapp.com/word?length=5"
  );
  return response.data;
};
