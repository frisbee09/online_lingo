import styled, { css } from "styled-components";
import { LetterState } from "./LetterState";
import * as React from "react";

interface LetterBoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Pick<LetterState, "elsewhere" | "correct"> {
  fail?: boolean;
}

export const LetterBox = styled(
  ({ elsewhere, correct, ...rest }: LetterBoxProps) => <div {...rest} />
)`
  ${({ elsewhere, correct, fail }) => {
    if (fail) {
      return css`
        background: #c3423f;
        color: white;
      `;
    } else if (correct) {
      return css`
        background: #9bc53d;
        color: black;
      `;
    } else if (elsewhere) {
      return css`
        background: #fde74c;
        color: black;
      `;
    } else {
      return css`
        background: #404e4d;
        color: white;
      `;
    }
  }}
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 3.5rem;
  width: 5rem;
  height: 5rem;
  margin: 0px 5px;
  border-radius: 5px;
`;
