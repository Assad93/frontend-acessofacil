import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import useBankOps from "../../hooks/useBankOps";
import useDeposit from "../../hooks/useDeposit";
import IdleTimer from "../../hooks/useIdleTimer";
import BankForm from "../../ui/components/BankForm";
import Container from "../../ui/components/Container";
import ConfirmationDialog from "../../ui/components/dialogs/ConfirmationDialog";
import ErrDialog from "../../ui/components/dialogs/ErrDialog";
import PasswordDialog from "../../ui/components/dialogs/PasswordDialog";
import Footer from "../../ui/components/surfaces/Footer";
import Header from "../../ui/components/surfaces/Header";
import { Content } from "./styles";

function BankDeposit() {
  let history = useHistory();
  const [reAuth, isReAuth] = useState(false);
  const { bankDeposit } = useBankOps();
  const {
    deposit,
    setDeposit,
    openConfirmDialog,
    handleCloseConfirmDialog,
    openPassDialog,
    handleClosePassDialog,
    error,
    handleCloseErrDialog,
    errorMsg,
    stageDeposit,
  } = useDeposit();

  useEffect(() => {
    if (reAuth) {
      const makeDeposit = async () => {
        const status = await bankDeposit(
          deposit.value,
          deposit.date,
          deposit.isSelfDeposit
        );
        if (status === -1) {
          history.push("/error");
        } else {
          history.push({
            pathname: "/success/Deposito",
            state: { value: deposit.value },
          });
        }
      };
      makeDeposit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reAuth]);

  return (
    <IdleTimer>
      <Container>
        <Header value="Depósito" />
        <Content>
          <BankForm
            type="deposit"
            operation={deposit}
            setOperation={setDeposit}
          />
        </Content>
        <Footer
          fn={() => stageDeposit(deposit.value)}
          buttonDisabled={
            !(
              deposit.value &&
              (deposit.isSelfDeposit ||
                (deposit.bankBranch && deposit.bankAccount))
            )
          }
        />
        <ConfirmationDialog
          keepMounted
          open={openConfirmDialog}
          onClose={handleCloseConfirmDialog}
          value={deposit.value}
          type="depósito"
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

export default BankDeposit;
