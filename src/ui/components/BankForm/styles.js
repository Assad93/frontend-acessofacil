import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

export const InputGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export const Label = styled.span`
  font-size: 42px;
  color: #fff;
`;

export const Input = styled.input`
  width: 296px;
  height: 65px;
  border: 2px solid #152f6e;
  background-color: #ffffff;
  font-size: 36px;
  padding: 10px;
  border-radius: 10px;

  &:disabled {
    background-color: #888;
  }
`;

export const Button = styled.button`
  padding: 10px;
  background-color: #1f46a1;
  border: none;
  font-size: 36px;
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
`;

export const InfoContainer = styled.div`
  border: 2px solid #000000;
  padding: 10px;
  background-color: #ffffff;
  position: absolute;
  bottom: 120px;
  right: 10px;
  display: flex;
  flex-direction: column;
`;

export const Info = styled.span`
  font-size: 36px;
`;

export const ConfirmButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const CardStyles = {
  backgroundColor: "#1f46a1",
  padding: "10px",
  width: "1020px",
  height: "225px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const CardContentStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
};

export const CardSecondaryStyles = {
  backgroundColor: "#1f46a1",
  padding: "15px",
};

export const CardContentSecondaryStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
};

export const MUIradioStyles = {
  "& .MuiSvgIcon-root": {
    fontSize: 48,
    color: "#FFF",
    fontWeight: "bold",
    marginLeft: 5,
  },
};

export const MUIFormControlLabelStyles = {
  ".MuiFormControlLabel-label": {
    fontSize: 32,
    fontWeight: "bold",
    marginLeft: 1,
  },
};
