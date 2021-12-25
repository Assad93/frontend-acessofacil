import React from "react";
import BlockIcon from "@material-ui/icons/Block";
import PrimaryButton from "../../buttons/PrimaryButton";
import { Container, LimitContainer } from "./styles";

function Footer({ fn, limit = false, buttonDisabled = false }) {
  return (
    <Container isLimit={limit}>
      {limit && (
        <LimitContainer>
          <p>Limite de Saque Por Vez: R$ 1.500,00</p>
          <p>Limite de Saque Diário: R$ 3.000,00</p>
        </LimitContainer>
      )}
      <PrimaryButton buttonDisabled={buttonDisabled} fn={fn}>
        {buttonDisabled && <BlockIcon style={{ fontSize: 48 }} />}
        Confirmar
      </PrimaryButton>
    </Container>
  );
}

export default Footer;
