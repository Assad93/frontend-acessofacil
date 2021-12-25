import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  bottom: 0;
  width: 100vw;
  padding: 20px 15px;
  display: flex;
  align-items: flex-end;
  justify-content: ${(props) => (props.isLimit ? "space-between" : "flex-end")};
`;

export const LimitContainer = styled.div`
  border: 2px solid #000;
  padding: 10px;

  & > p {
    font-size: 24px;
    font-weight: bold;
    line-height: 1.6;
  }
`;
