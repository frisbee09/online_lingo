import styled from "styled-components";

export const ConfigWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  width: 400px;
  flex-direction: column;

  > hr {
    width: 100%;
  }

  > div {
    > * {
      display: block;
    }
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
