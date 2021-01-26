import styled from "styled-components";

export const ConfigWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  width: 400px;
  flex-direction: column;

  > hr {
    width: 100%;
    opacity: 0.5;
    filter: brightness(0.75);
  }

  > div {
    > * {
      display: block;
    }
    margin-top: 10px;
    display: flex;

    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
`;
