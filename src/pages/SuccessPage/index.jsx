import React, { useEffect } from "react";
import IdleTimer from "../../hooks/useIdleTimer";
import useBankOps from "../../hooks/useBankOps";
import { useHistory, useParams } from "react-router-dom";
import NumberFormat from "react-number-format";
import { Card } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import Payment from "@material-ui/icons/Payment";
import LocalAtm from "@material-ui/icons/LocalAtm";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import PrimaryButton from "../../ui/components/buttons/PrimaryButton";
import Header from "../../ui/components/surfaces/Header";
import {
  Container,
  Info,
  ButtonContainer,
  Content,
  NumberLabel,
  BalanceContainer,
  Balance,
} from "./styles";

function SuccessPage(props) {
  let { operation } = useParams();
  let history = useHistory();
  const { balance, getBalance } = useBankOps();

  useEffect(() => {
    async function fetchBalanceData() {
      await getBalance();
    }
    fetchBalanceData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getOperationName(operation) {
    switch (operation) {
      case "Saque":
        return "Saque";
      case "Deposito":
        return "Depósito";
      case "Pagamento":
        return "Pagamento";
      case "Transferencia":
        return "Transferência";
      default:
        break;
    }
  }

  return (
    <IdleTimer>
      <Container>
        <Header />
        <Card>
          <CardContent>
            <Content>
              {operation === "Pagamento" && (
                <Payment style={{ fontSize: 150 }} />
              )}
              {operation === "Deposito" && (
                <AccountBalanceWalletIcon style={{ fontSize: 150 }} />
              )}
              {operation === "Saque" && (
                <AttachMoneyIcon style={{ fontSize: 250, color: "green" }} />
              )}
              {operation === "Transferencia" && (
                <LocalAtm style={{ fontSize: 150 }} />
              )}
              <Info>
                {getOperationName(operation)}
                {" de "}
                <NumberLabel>
                  <NumberFormat
                    value={props.location.state.value}
                    displayType={"text"}
                    thousandSeparator={"."}
                    decimalSeparator={","}
                    prefix={"R$"}
                    style={{ color: "#fff" }}
                  />
                </NumberLabel>
                {operation === "Transferencia" ? " realizada" : " realizado"}{" "}
                com sucesso!
              </Info>
              <ButtonContainer>
                <BalanceContainer>
                  <Balance>
                    Saldo:{" "}
                    <NumberFormat
                      value={balance.value}
                      displayType={"text"}
                      thousandSeparator={"."}
                      decimalSeparator={","}
                      prefix={"R$ "}
                      style={{ color: "#fff" }}
                    />
                  </Balance>
                </BalanceContainer>
                <PrimaryButton
                  fn={() => {
                    history.push("/bankStatement");
                  }}
                >
                  Extrato
                </PrimaryButton>
              </ButtonContainer>
            </Content>
          </CardContent>
        </Card>
      </Container>
    </IdleTimer>
  );
}

export default SuccessPage;
