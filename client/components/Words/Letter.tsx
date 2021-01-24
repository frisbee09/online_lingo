/**
 * The core of Lingo! A letter
 */

import * as React from "react";
import { LetterState } from "./LetterState";
import { LetterBox } from "./LetterBox";

interface ILetterProps extends LetterState {
  fail?: boolean;
}

const Letter: React.FunctionComponent<ILetterProps> = ({
  letter,
  correct,
  elsewhere,
  fail,
}) => {
  return (
    <LetterBox correct={correct} elsewhere={elsewhere} fail={fail}>
      {letter.toLocaleUpperCase()}
    </LetterBox>
  );
};

export default Letter;
