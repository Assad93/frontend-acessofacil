import React from "react";
import { useHistory } from "react-router-dom";
import CircleButton from "../../buttons/CircleButton";
import Title from "../../Title";
import { Container, RightOption } from "./styles";

function SimpleHeader({ value }) {
  let history = useHistory();
  return (
    <Container>
      {value && <Title size="64">{value}</Title>}
      <RightOption>
        <CircleButton
          fn={() => {
            history.push("/login");
          }}
        >
          Sair
        </CircleButton>
      </RightOption>
    </Container>
  );
}

export default SimpleHeader;
