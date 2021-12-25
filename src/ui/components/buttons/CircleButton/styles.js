import styled from "styled-components";

export const Button = styled.button`
  width: 120px;
  height: 120px;
  background-color: #1f46a1;
  color: #ffffff;
  font-size: 36px;
  border-radius: 50%;
  border: none;
  box-shadow: 0 5px 0 #152f6e;
  cursor: pointer;

  &:hover {
    background-color: #152f6e;
    box-shadow: 0 5px 0 #0b193b;
  }

  &:active {
    position: relative;
    top: 5px;
    box-shadow: none;
  }
`;
