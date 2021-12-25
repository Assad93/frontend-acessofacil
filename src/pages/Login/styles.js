import styled from "styled-components";

export const Content = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const Title = styled.span`
  font-size: 64px;
  color: #fff;
`;

export const SubTitle = styled.span`
  font-size: 36px;
  color: #fff;
  text-decoration: underline;
`;

export const InputGroup = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-align: center;
`;

export const Input = styled.input`
  width: 300px;
  height: 80px;
  padding: 10px;
  font-size: 40px;
  text-align: center;
  color: #000;
  background-color: #ffffff;
  border: 5px solid #152f6e;
  border-radius: 10px;

  &:focus {
    border: 5px solid #2688c9;
  }

  &:focus::-webkit-input-placeholder {
    /* Edge */
    color: transparent;
  }

  &:focus:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: transparent;
  }

  &:focus:-moz-placeholder {
    /* Firefox 18- */
    color: transparent;
  }

  &:focus::-moz-placeholder {
    /* Firefox 19+ */
    color: transparent;
  }

  &:focus::placeholder {
    color: transparent;
  }
`;

// they aren´t styled-components, they are just stylesheets

export const cardStyle = {
  backgroundColor: "#1f46a1",
  padding: "10px",
};

export const cardContentStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
};

export const ErrorMsg = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 30px;
  font-weight: bold;
  color: #ff0000;
`;
