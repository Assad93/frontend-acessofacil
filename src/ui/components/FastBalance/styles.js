import styled from "styled-components";

export const Button = styled.button`
  width: 350px;
  height: 180px;
  padding: 10px;
  background-color: #fff;
  color: #1f46a1;
  border: 2px solid #1f46a1;
  border-bottom: none;
  box-shadow: 0 5px 0 #152f6e;
  font-size: 36px;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: center;

  &:active {
    border: 2px solid #1f46a1;
    position: relative;
    top: 5px;
    box-shadow: none;
  }
`;

export const Title = styled.span`
  font-weight: bold;
  font-size: 36px;
  color: #000;
`;

export const ReturnOption = styled.div`
  margin-top: 20px;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ErrMsg = styled.span`
  font-weight: bold;
  font-size: 34px;
  color: #000;
  & > span {
    color: #f00;
  }
`;
