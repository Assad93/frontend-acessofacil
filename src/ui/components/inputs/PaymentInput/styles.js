import styled from "styled-components";

export const Container = styled.div`
  width: 700px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-align: center;
`;

export const Label = styled.span`
  font-size: 30px;
  color: #fff;
`;

export const Input = styled.input`
  height: 70px;
  width: 600px;
  padding: 10px;
  border-radius: 10px;
  border: 2px solid #152f6e;
  font-size: 36px;
`;
