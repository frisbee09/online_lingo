import { json } from "./fetchHelpers";
import { wordsApiHeaders } from "./words.secret-key";

const endpoint = "https://wordsapiv1.p.rapidapi.com/";
const wordsFetch: typeof fetch = (input, init) =>
  fetch(input, { ...init, headers: { ...init?.headers, ...wordsApiHeaders } });

interface WordResponse {
  word: string;
}

/**
 * Gets a new word from the API
 * @param numberOfLetters
 * @param difficulty This is a log scale, where the LOWER the number the LESS
 * USED the word is in the english language. Higher number = easier words.
 * Default difficulty for a medium game.
 */
const getNewWord = async (
  numberOfLetters: number,
  difficulty: number = 3
): Promise<string> => {
  const query = new URLSearchParams({
    letters: numberOfLetters.toString(),
    letterPattern: `^[a-z]{${numberOfLetters}}$`,
    frequencyMin: difficulty.toString(),
    hasDetails: "definitions",
    random: "true",
  });
  const resp: WordResponse = await wordsFetch(
    `${endpoint}words/?${query.toString()}`
  ).then(json);
  return resp.word;
};

export default {
  getNewWord,
};
