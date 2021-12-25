import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import IdleTimer from "../../hooks/useIdleTimer";
import useBankOps from "../../hooks/useBankOps";
import useWithdraw from "../../hooks/useWithdraw";
import ConfirmationDialog from "../../ui/components/dialogs/ConfirmationDialog";
import WithdrawInput from "../../ui/components/inputs/WithdrawInput";
import Header from "../../ui/components/surfaces/Header";
import Container from "../../ui/components/Container";
import FastBalance from "../../ui/components/FastBalance";
import Footer from "../../ui/components/surfaces/Footer";
import PasswordDialog from "../../ui/components/dialogs/PasswordDialog";
import ErrDialog from "../../ui/components/dialogs/ErrDialog";
import FastWithdraw from "../../ui/components/FastWithdraw";
import Benefits from "../../ui/components/Benefits";
import { Content, CenterContent, AvailableInfo } from "./styles";

function Withdraw() {
  let history = useHistory();
  const { withdraw } = useBankOps();
  const {
    withdrawValue,
    setWithdrawValue,
    stageWithdraw,
    openConfirmDialog,
    handleCloseConfirmDialog,
    openPassDialog,
    handleClosePassDialog,
    error,
    errorMsg,
    handleCloseErrDialog,
  } = useWithdraw();

  const [reAuth, isReAuth] = useState(false);

  useEffect(() => {
    if (reAuth) {
      async function makeWithdraw() {
        const status = await withdraw(withdrawValue);
        if (status === -1) {
          history.push("/error");
        } else {
          history.push({
            pathname: "/success/Saque",
            state: { value: withdrawValue },
          });
        }
      }
      makeWithdraw();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reAuth]);

  return (
    <IdleTimer>
      <Container>
        <Header value="Saque" />
        <Content>
          <FastWithdraw fnWithdraw={stageWithdraw} />
          <CenterContent>
            <AvailableInfo>
              <span>Notas disponíveis:</span>
              <p>R$ 5,00 - R$ 10,00 - R$ 20,00 - R$ 50,00 - R$ 100,00</p>
            </AvailableInfo>
            <WithdrawInput fn={setWithdrawValue} value={withdrawValue} />
            <FastBalance />
          </CenterContent>
          <Benefits fnWithdraw={stageWithdraw} />
        </Content>
        <Footer
          fn={() => stageWithdraw(withdrawValue)}
          limit
          buttonDisabled={!withdrawValue}
        />
        <ConfirmationDialog
          keepMounted
          open={openConfirmDialog}
          onClose={handleCloseConfirmDialog}
          value={withdrawValue}
          type="saque"
        />
        <PasswordDialog
          open={openPassDialog}
          onClose={handleClosePassDialog}
          fn={isReAuth}
        />
        <ErrDialog open={error} onClose={handleCloseErrDialog} msg={errorMsg} />
      </Container>
    </IdleTimer>
  );
}

export default Withdraw;
