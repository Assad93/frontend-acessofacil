import React, { useEffect, useState } from "react";
import useBankOps from "../../../hooks/useBankOps";
import NumberFormat from "react-number-format";
import { CircularProgress } from "@material-ui/core";
import MouseIcon from "@material-ui/icons/Mouse";
import PrimaryButton from "../buttons/PrimaryButton";
import { Button, Title, ErrMsg, ReturnOption } from "./styles";

function FastBalance() {
  const { balance, getBalance } = useBankOps();
  const [open, IsOpen] = useState(false);

  // fetch the balance data in api
  useEffect(() => {
    async function fetchBalanceData() {
      await getBalance();
    }
    fetchBalanceData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <>
      {!open ? (
        <PrimaryButton
          fn={() => {
            IsOpen(!open);
          }}
        >
          Ver Saldo
        </PrimaryButton>
      ) : (
        <Button
          onClick={() => {
            IsOpen(!open);
          }}
        >
          {!balance.value ? (
            !balance.error ? (
              <CircularProgress />
            ) : (
              <ErrMsg>
                <span>Erro...</span> Tente Novamente!
              </ErrMsg>
            )
          ) : (
            <>
              <Title>Saldo:</Title>
              <NumberFormat
                value={balance.value}
                displayType={"text"}
                thousandSeparator={"."}
                decimalSeparator={","}
                prefix={"R$ "}
                style={{ fontWeight: "bold" }}
              />
            </>
          )}
          <ReturnOption>
            <MouseIcon />
            Retornar
          </ReturnOption>
        </Button>
      )}
    </>
  );
}

export default FastBalance;
