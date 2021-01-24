import styled from "styled-components";

export const AppWrapper = styled.div`
  > * {
    max-width: 600px;
  }

  display: flex;

  flex-direction: column;

  align-items: center;
  justify-content: center;

  > input {
    margin: 10px 10px 0px 10px;
    font-size: 3rem;

    text-align: center;
  }
`;
