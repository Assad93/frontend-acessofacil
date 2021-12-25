import styled from "styled-components";

export const Content = styled.div`
  padding: 25px;
  display: flex;
  justify-content: space-between;
`;

export const AsideMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;
  margin-bottom: 20px;
`;

export const Centralizer = styled.div`
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CenterContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

export const AvailableInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  & > span {
    font-size: 36px;
    font-weight: bold;
  }

  & > p {
    font-size: 30px;
  }
`;
