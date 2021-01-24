import * as React from "react";
import styled from "styled-components";

const startColour = "rgb(17,172,50)";
const endTimer = "rgb(122,236,68)";
const space = "rgb(232,233,246)";

const Progress = styled(
  ({
    current,
    outOf,
    ...rest
  }: {
    current: number;
    outOf: number;
  } & React.HTMLAttributes<HTMLDivElement>) => <div {...rest} />
).attrs(({ current, outOf }) => {
  const percentage = (current / outOf) * 100;
  const linGradientString = `linear-gradient(90deg, ${startColour} 0%, ${endTimer} ${
    percentage - 1
  }%, ${space} ${percentage + 1}%, ${space} 100%)`;

  return {
    style: {
      background: linGradientString,
    },
  };
})`
  height: 10px;
  width: 100%;
  max-width: 300px;
`;

interface ITimerBarProps {
  timeLeft: number;
  totalTime: number;
}

const TimerBar: React.FunctionComponent<ITimerBarProps> = ({
  timeLeft,
  totalTime,
}) => {
  return <Progress current={totalTime - timeLeft} outOf={totalTime} />;
};

export default TimerBar;
