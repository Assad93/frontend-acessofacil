import styled from "styled-components";

export const Header = styled.div`
  padding-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ErrorMsg = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 30px;
  font-weight: bold;
  color: #ff0000;
`;

export const Label = styled.div`
  font-size: 30px;
  font-weight: bold;
`;

export const Instruction = styled.p`
  font-size: 40px;
  font-weight: bold;
`;

export const Loading = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
