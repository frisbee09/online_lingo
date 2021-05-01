import * as React from "react";
import { AppWrapper } from "./AppWrapper";
import wordsApi from "../../../service/wordsAPI";
import { GlobalStyle } from "../../config/GlobalStyle";
import { LetterState } from "../Words/LetterState";
import { Guess, Word } from "../Words/Word";
import TimerBar from "../Words/TimerBar";
import { ConfigWrapper } from "./Config";

interface IAppProps {}

const createStarterGuess = (word: string): Guess => ({
  word: "",
  letters: word.split("").map((l, idx) => ({
    letter: idx === 0 ? l : ".",
    elsewhere: false,
    correct: false,
  })),
});

const DEFAULT_GUESS_TIMER_IN_S = 15;
const DEFAULT_WORD_LENGTH = 4;

export const getLettersNotCorrect = (guess: string[], word: string) =>
  word.split("").filter((wl, idx) => wl !== guess[idx]);

/**
 * Takes a guess and creates a Guess state object against the word
 * @param processedGuess
 * @param word
 */
export const parseGuess = (guess: string, word: string): Guess => {
  const processedGuess = Array.from(Array(word.length)).map(
    (l, idx) => guess[idx] || "."
  );
  // Set up an accumulator so we can track multiple instances of the same letter
  let lettersInGuess: { [letter: string]: number } = {};

  /**
   * Letters remaining not guessed correctly
   */
  const lettersNotCorrect = word
    .split("")
    .filter((wl, idx) => wl !== processedGuess[idx]);

  const letterState: LetterState[] = processedGuess.map((l, idx) => {
    if (!(l in lettersInGuess)) {
      lettersInGuess[l] = 1;
    } else {
      lettersInGuess[l]++;
    }
    const correct = l === word[idx];
    const elsewhere =
      // Not correct
      !correct &&
      // Total number of this letter in the word bigger or equal to the number
      // of times this letter has been guess thus far
      word.split("").filter((wl) => wl == l).length >= lettersInGuess[l];

    return { letter: l, correct, elsewhere };
  });

  return {
    word: processedGuess.join(""),
    letters: letterState,
  };
};

const App: React.FunctionComponent<IAppProps> = () => {
  // Word and Guess variables
  const [word, setWord] = React.useState<string>("");
  const [guessState, setGuessState] = React.useState<Guess[]>([]);
  const [guessInput, setGuessInput] = React.useState<string>("");

  // Game config
  const [timeLimitAsString, setTimelimit] = React.useState<string>(
    DEFAULT_GUESS_TIMER_IN_S.toString()
  );
  const timeLimit = Number(timeLimitAsString);

  const [wordLengthAsString, setWordLength] = React.useState<string>(
    DEFAULT_WORD_LENGTH.toString()
  );
  const wordLength = Number(wordLengthAsString);

  // Timer function state objects
  const [timeNow, updateTime] = React.useState<Date>(new Date());
  const [timesUpAt, setOOT] = React.useState<Date | null>(null);
  const intervalId = React.useRef<number | null>(null);

  // UX Ref
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  // Derived state
  const isOutOfTime = timesUpAt
    ? timeNow.getTime() >= timesUpAt.getTime()
    : false;
  const isRight =
    guessState.length &&
    guessState.slice(-1)[0].letters.every((l) => l.correct);
  const hasFailed = !isRight && (isOutOfTime || guessState.length === 5);

  const gameHasntStarted = !timesUpAt && guessState.length === 0;
  const gameHasFinished = isRight || hasFailed;

  // Clearing up at the end of the game
  if (gameHasFinished) {
    intervalId.current && clearInterval(intervalId.current);
    intervalId.current = null;
  }

  const takeGuess = (guessOverride?: string) => {
    intervalId.current && clearInterval(intervalId.current);
    setGuessState([
      ...guessState,
      parseGuess((guessOverride || guessInput).slice(0, word.length), word),
    ]);
    setGuessInput("");
    setOOT(new Date(Date.now() + timeLimit * 1000));

    intervalId.current = setInterval(() => {
      updateTime(new Date());
    }, 10) as any;
  };

  const getNewWord = async () => {
    const newWord = await wordsApi.getNewWord(wordLength);
    setWord(newWord);
  };

  React.useEffect(() => {
    if (!word || gameHasntStarted) {
      getNewWord();
    }
  }, [wordLength]);

  const renderGameConfig = () => {
    if (gameHasntStarted || gameHasFinished) {
      return (
        <ConfigWrapper>
          <hr />
          <div>
            <label htmlFor="timeLimit">Time per Guess (seconds): </label>
            <input
              type="number"
              pattern="0-9"
              id="timeLimit"
              value={timeLimitAsString}
              onChange={(e) => setTimelimit(e.currentTarget.value)}
            />
          </div>
          <div>
            <label htmlFor="wordLength">Length of Word: </label>
            <input
              type="number"
              pattern="0-9"
              id="wordLength"
              value={wordLengthAsString}
              onChange={(e) => setWordLength(e.currentTarget.value)}
            />
          </div>
        </ConfigWrapper>
      );
    }
  };

  const createGuessGuide = (): Guess => ({
    word: "",
    letters: word.split("").map((l, idx) => ({
      letter:
        idx === 0 || guessState.some((g) => g.letters[idx].correct) ? l : ".",
      correct: false,
      elsewhere: false,
    })),
  });

  return (
    <AppWrapper>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {guessState.map((gs, idx) => (
          <Word
            key={`${gs.word}${idx}`}
            {...gs}
            fail={hasFailed && idx === 4}
          />
        ))}
        {(gameHasntStarted || !gameHasFinished) && (
          <Word {...createGuessGuide()} />
        )}
        {isOutOfTime && <Word {...parseGuess("", word)} fail={true} />}
        {hasFailed && <Word {...parseGuess(word, word)} />}
      </div>
      {gameHasFinished ? (
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
              timesUpAt
                ? timesUpAt.getTime() - timeNow.getTime()
                : timeLimit * 1000
            }
            totalTime={timeLimit * 1000}
          />
          <input
            ref={inputRef}
            value={guessInput}
            placeholder="Guess the word"
            onChange={(e) =>
              setGuessInput(e.currentTarget.value.toLocaleLowerCase())
            }
            onKeyDown={(e) => {
              if (e.key === "Enter" && guessInput.length) {
                takeGuess();
              }
            }}
          />
        </>
      )}
      {renderGameConfig()}
      <GlobalStyle />
    </AppWrapper>
  );
};

export default App;
