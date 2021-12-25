import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  max-width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const Info = styled.p`
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 64px;
  text-align: center;
`;

export const NumberLabel = styled.span`
  width: 200px;
  padding: 10px;
  background-color: #1f46a1;
  border-radius: 10px;
`;

export const ButtonContainer = styled.div`
  margin-bottom: 10px;
  width: 800px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

export const BalanceContainer = styled.div`
  width: 350px;
  height: 87px;
  background-color: #575555;
  opacity: 0.7;
  border-radius: 50px;
  border: 5px solid #20211b;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Balance = styled.span`
  color: #fff;
  font-size: 36px;
`;
