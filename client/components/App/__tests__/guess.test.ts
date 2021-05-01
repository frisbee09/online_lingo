import { isExportDeclaration } from "typescript";
import { getLettersNotCorrect, parseGuess } from "..";
import { Guess } from "../../Words/Word";

const getBreakdown = (guess: Guess) =>
  guess.letters.reduce(
    (count, letter) => {
      count.wrongPlace += Number(letter.elsewhere);
      count.rightPlace += Number(letter.correct);
      count.fuckedIt += Number(!letter.elsewhere && !letter.correct);
      return count;
    },
    { wrongPlace: 0, rightPlace: 0, fuckedIt: 0 }
  );

test("get letters not correct function", () => {
  expect(getLettersNotCorrect("meet".split(""), "mere")).toStrictEqual(
    expect.arrayContaining(["r", "e"])
  );
});

describe("guess parses ok", () => {
  test("two exclusive letters", () => {
    const guessState = parseGuess("ooxxxx", "nnoonn");
    const breakdown = getBreakdown(guessState);

    expect(breakdown.wrongPlace).toBe(2);
  });

  test("one right, one wrong", () => {
    const guessState = parseGuess("oxoxxx", "nnoonn");
    const breakdown = getBreakdown(guessState);
    expect(breakdown).toStrictEqual(
      expect.objectContaining({
        wrongPlace: 1,
        rightPlace: 1,
        fuckedIt: 4,
      })
    );
  });

  test("my dad's test case", () => {
    const guessState = parseGuess("meet", "mere");
    const breakdown = getBreakdown(guessState);
    expect(breakdown).toStrictEqual(
      expect.objectContaining({
        wrongPlace: 1,
        rightPlace: 2,
        fuckedIt: 1,
      })
    );
  });
});
