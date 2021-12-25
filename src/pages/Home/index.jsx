import React from "react";
import { useHistory } from "react-router-dom";
import IdleTimer from "../../hooks/useIdleTimer";
import FastBalance from "../../ui/components/FastBalance";
import PrimaryButton from "../../ui/components/buttons/PrimaryButton";
import Container from "../../ui/components/Container";
import SimpleHeader from "../../ui/components/surfaces/SimpleHeader";
import Title from "../../ui/components/Title";
import { OperationsContainer, CentralComponent, CornerButton } from "./styles";

function Home() {
  let history = useHistory();

  return (
    <IdleTimer>
      <Container>
        <CornerButton>
          <FastBalance />
        </CornerButton>
        <SimpleHeader />
        <CentralComponent>
          <Title size="72">Acesso Fácil</Title>
          <PrimaryButton
            fn={() => {
              history.push("/withdraw");
            }}
          >
            Saque
          </PrimaryButton>
        </CentralComponent>
        <OperationsContainer>
          <PrimaryButton
            fn={() => {
              history.push("/bankStatement");
            }}
          >
            Extrato
          </PrimaryButton>
          <PrimaryButton
            fn={() => {
              history.push("/payments");
            }}
          >
            Pagamentos
          </PrimaryButton>
        </OperationsContainer>
        <OperationsContainer>
          <PrimaryButton
            fn={() => {
              history.push("/bankDeposit");
            }}
          >
            Depósito
          </PrimaryButton>
          <PrimaryButton
            fn={() => {
              history.push("/bankTransfer");
            }}
          >
            Transferências
          </PrimaryButton>
        </OperationsContainer>
      </Container>
    </IdleTimer>
  );
}

export default Home;
