import React from "react";
import { useHistory } from "react-router-dom";
import CircleButton from "../../buttons/CircleButton";
import Title from "../../Title";
import { Container, CornerLeftButton, CornerRightButton } from "./styles";

function Header({ value }) {
  let history = useHistory();
  return (
    <Container>
      <CornerLeftButton>
        <CircleButton
          fn={() => {
            history.push("/");
          }}
        >
          Menu
        </CircleButton>
      </CornerLeftButton>
      <Title size="72">{value}</Title>
      <CornerRightButton>
        <CircleButton
          fn={() => {
            history.push("/login");
          }}
        >
          Sair
        </CircleButton>
      </CornerRightButton>
    </Container>
  );
}

export default Header;
