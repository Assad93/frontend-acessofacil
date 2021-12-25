import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useBankOps from "../../hooks/useBankOps";
import IdleTimer from "../../hooks/useIdleTimer";
import NumberFormat from "react-number-format";
import { CircularProgress } from "@material-ui/core";
import DataTable from "../../ui/components/DataTable";
import Header from "../../ui/components/surfaces/Header";
import Container from "../../ui/components/Container";
import PrimaryButton from "../../ui/components/buttons/PrimaryButton";
import { Content, Balance, NumberLabel } from "./styles";

function BankStatement() {
  let history = useHistory();
  const { balance, getBalance, operations, bankStatement } = useBankOps();

  useEffect(() => {
    async function fetchBalance() {
      await getBalance();
    }

    async function getOperations() {
      await bankStatement();
    }

    fetchBalance();
    getOperations();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IdleTimer>
      <Container>
        <Header value="Extrato" />
        {!balance.error ? (
          <Content>
            {balance.value && operations.value ? (
              <>
                <Balance>
                  Saldo:{" "}
                  <NumberLabel>
                    <NumberFormat
                      value={balance.value}
                      displayType={"text"}
                      thousandSeparator={"."}
                      decimalSeparator={","}
                      prefix={"R$"}
                      style={{ color: "#fff" }}
                    />
                  </NumberLabel>
                </Balance>
                <DataTable operations={operations.value} />
                <PrimaryButton fn={() => history.push("/withdraw")}>
                  Saque
                </PrimaryButton>
              </>
            ) : (
              <CircularProgress />
            )}
          </Content>
        ) : (
          history.push("/error")
        )}
      </Container>
    </IdleTimer>
  );
}

export default BankStatement;
