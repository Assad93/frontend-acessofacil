import React from "react";
import NumberFormat from "react-number-format";
import PrimaryButton from "../buttons/PrimaryButton";
import Title from "../Title";

import { Container, Centralizer } from "./styles";

function FastWithdraw({ fnWithdraw }) {
  return (
    <Container>
      <Centralizer>
        <Title size="36">Saque Rápido</Title>
      </Centralizer>
      <PrimaryButton fn={() => fnWithdraw(1000)}>
        <NumberFormat
          value={1000.0}
          displayType={"text"}
          thousandSeparator={"."}
          decimalSeparator={","}
          prefix={"R$ "}
        />
      </PrimaryButton>
      <PrimaryButton fn={() => fnWithdraw(500)}>
        <NumberFormat
          value={500.0}
          displayType={"text"}
          thousandSeparator={"."}
          decimalSeparator={","}
          prefix={"R$ "}
        />
      </PrimaryButton>
      <PrimaryButton fn={() => fnWithdraw(250)}>
        <NumberFormat
          value={250.0}
          displayType={"text"}
          thousandSeparator={"."}
          decimalSeparator={","}
          prefix={"R$ "}
        />
      </PrimaryButton>
      <PrimaryButton fn={() => fnWithdraw(100)}>
        <NumberFormat
          value={100.0}
          displayType={"text"}
          thousandSeparator={"."}
          decimalSeparator={","}
          prefix={"R$ "}
        />
      </PrimaryButton>
    </Container>
  );
}

export default FastWithdraw;
