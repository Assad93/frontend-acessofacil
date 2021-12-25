import styled from "styled-components";

export const Button = styled.button`
  width: 300px;
  height: 80px;
  background-color: #1f46a1;
  border: none;
  font-size: 36px;
  font-weight: bold;
  box-shadow: 0 5px 0 #152f6e;
  color: #fff;
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

  &:disabled {
    background-color: #9e9e9e;
    box-shadow: 0 2px 0 #616161;
    opacity: 0.5;
    color: #616161;
    cursor: not-allowed;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }
`;
