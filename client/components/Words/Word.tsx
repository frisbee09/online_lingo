import * as React from "react";
import styled from "styled-components";
import Letter from "./Letter";
import { LetterState } from "./LetterState";

export interface Guess {
  word: string;
  letters: LetterState[];
}

export const WordWrapper = styled.div`
  display: flex;
  width: 100%;

  justify-content: space-around;
  align-items: center;
  margin: 10px 0px;
`;

interface ILetterRowProps extends Pick<Guess, "letters"> {
  fail?: boolean;
}

export const Word: React.FunctionComponent<ILetterRowProps> = ({
  letters,
  fail,
}) => {
  return (
    <WordWrapper>
      {letters.map((l, idx) => (
        <Letter key={`${l}${idx}`} {...l} fail={fail} />
      ))}
    </WordWrapper>
  );
};
