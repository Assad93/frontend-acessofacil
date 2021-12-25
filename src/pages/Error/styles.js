import styled from "styled-components";

export const Content = styled.div`
  height: 100%;
  margin-top: -100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ErrorMsg = styled.p`
  font-size: 36px;
  font-weight: bold;

  & > span {
    color: #ff0000;
    font-weight: bold;
    text-transform: uppercase;
  }
`;
