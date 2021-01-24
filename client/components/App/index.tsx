import * as React from "react";
import { AppWrapper } from "./AppWrapper";
import wordsApi from "../../../service/wordsAPI";
import { GlobalStyle } from "../../config/GlobalStyle";
import { LetterState } from "../Words/LetterState";
import { Guess, Word } from "../Words/Word";
import TimerBar from "../Words/TimerBar";

interface IAppProps {}

const createStarterGuess = (word: string): Guess => ({
  word: "",
  letters: word.split("").map((l, idx) => ({
    letter: idx === 0 ? l : ".",
    elsewhere: false,
    correct: false,
  })),
});

/**
 * Takes a guess and creates a Guess state object against the word
 * @param guess
 * @param word
 */
const parseGuess = (guess: string, word: string): Guess => {
  guess = guess.slice(0, word.length);
  // Set up an accumulator so we can track multiple instances of the same letter
  let lettersInGuess: { [letter: string]: number } = {};

  // Create a substring of letters that are not correct This is so that we can
  // accurately calculate where the letters are elsewhere in the word
  const lettersNotCorrect = word
    .split("")
    .filter((wl, idx) => wl !== guess[idx]);

  const letterState: LetterState[] = guess.split("").map((l, idx) => {
    if (!(l in lettersInGuess)) {
      lettersInGuess[l] = 1;
    } else {
      lettersInGuess[l]++;
    }
    const correct = l === word[idx];
    const elsewhere =
      !correct &&
      lettersNotCorrect.filter((wl) => wl === l).length >= lettersInGuess[l];

    return { letter: l, correct, elsewhere };
  });

  return {
    word: guess,
    letters: letterState,
  };
};

const emptyGuess = Array.from(Array(11)).fill(".").join("");

const App: React.FunctionComponent<IAppProps> = () => {
  // Word and Guess variables
  const [word, setWord] = React.useState<string>("");
  const [guessState, setGuessState] = React.useState<Guess[]>([]);
  const [guessInput, setGuessInput] = React.useState<string>("");

  // Timer function state objects
  const [timeNow, updateTime] = React.useState<Date>(new Date());
  const [timeLimit, setOOT] = React.useState<Date | null>(null);
  const intervalId = React.useRef<number | null>(null);

  // UX Ref
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  // Derived state
  const isOutOfTime = timeLimit
    ? timeNow.getTime() >= timeLimit.getTime()
    : false;
  const isRight =
    guessState.length &&
    guessState.slice(-1)[0].letters.every((l) => l.correct);
  const hasFailed = !isRight && (isOutOfTime || guessState.length === 5);

  // Clearing up at the end of the game
  if (isOutOfTime || hasFailed) {
    intervalId.current && clearTimeout(intervalId.current);
    intervalId.current = null;
  }

  const takeGuess = (guessOverride?: string) => {
    intervalId.current && clearTimeout(intervalId.current);
    setGuessState([
      ...guessState,
      parseGuess((guessOverride || guessInput).slice(0, word.length), word),
    ]);
    setGuessInput("");
    setOOT(new Date(Date.now() + 15 * 1000));

    intervalId.current = setInterval(() => {
      updateTime(new Date());
    }, 10) as any;
  };

  const getNewWord = async () => {
    const newWord = await wordsApi.getNewWord(4);
    setWord(newWord);
  };

  React.useEffect(() => {
    if (!word) {
      getNewWord();
    }
    inputRef.current?.focus();
  }, []);
  return (
    <AppWrapper>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Word {...createStarterGuess(word)} />
        {guessState.map((gs, idx) => (
          <Word key={`${gs.word}${idx}`} {...gs} fail={idx === 4} />
        ))}
        {isOutOfTime && <Word {...parseGuess(emptyGuess, word)} fail={true} />}
        {hasFailed && <Word {...parseGuess(word, word)} />}
      </div>
      {isRight || hasFailed ? (
        <button
          type="button"
          onClick={() => {
            setWord("");
            setGuessState([]);
            setGuessInput("");
            setOOT(null);
            getNewWord();
            inputRef.current?.focus();
          }}
        >
          New Word
        </button>
      ) : (
        <>
          <TimerBar
            timeLeft={
              timeLimit ? timeLimit.getTime() - timeNow.getTime() : 10 * 1000
            }
            totalTime={10 * 1000}
          />
          <input
            ref={inputRef}
            value={guessInput}
            onChange={(e) =>
              setGuessInput(e.currentTarget.value.toLocaleLowerCase())
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                takeGuess();
              }
            }}
          />
        </>
      )}
      <GlobalStyle />
    </AppWrapper>
  );
};

export default App;
