import { css } from "styled-components";

// Defining breakpoints for media queries
export const breakpoints = {
  // Widescreen
  xl: 1690,
  // Desktop
  l: 1280,
  // Large Tablets?
  m: 980,
  // Tablets
  s: 736,
  // Phones
  xs: 480,
};

type Breakpoints = keyof typeof breakpoints;
const BreakpointKeys = Object.keys(breakpoints) as Breakpoints[];

// This media object exports some functions that can be called in the same way
// "styled" and "css" can. It means we can apply consistent breakpoints across
// all our css.
export const media: {
  [key in keyof typeof breakpoints]: Function;
} = BreakpointKeys.reduce(
  (acc: { [key in Breakpoints]: any }, label: Breakpoints) => {
    acc[label] = (...args: any) =>
      css`
        @media (max-width: ${breakpoints[label] / 16}rem) {
          ${// prettier-ignore
          // @ts-ignore
          css(...args)}
        }
      `;

    return acc;
  },
  {} as { [key in Breakpoints]: any }
);
