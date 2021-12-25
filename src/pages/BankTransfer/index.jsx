import React, { useEffect, useState } from "react";
import useBankOps from "../../hooks/useBankOps";
import IdleTimer from "../../hooks/useIdleTimer";
import useTransfer from "../../hooks/useTransfer";
import BankForm from "../../ui/components/BankForm";
import Header from "../../ui/components/surfaces/Header";
import Container from "../../ui/components/Container";
import { Content } from "./styles";
import { useHistory } from "react-router";
import Footer from "../../ui/components/surfaces/Footer";
import ConfirmationDialog from "../../ui/components/dialogs/ConfirmationDialog";
import PasswordDialog from "../../ui/components/dialogs/PasswordDialog";
import ErrDialog from "../../ui/components/dialogs/ErrDialog";

function BankTransfer() {
  let history = useHistory();
  const [reAuth, isReAuth] = useState(false);
  const { bankTransfer } = useBankOps();
  const {
    transfer,
    setTransfer,
    openConfirmDialog,
    handleCloseConfirmDialog,
    openPassDialog,
    handleClosePassDialog,
    error,
    handleCloseErrDialog,
    errorMsg,
    stageTransfer,
  } = useTransfer();

  useEffect(() => {
    if (reAuth) {
      const makeTransfer = async () => {
        const status = await bankTransfer(
          transfer.value,
          transfer.date,
          transfer.transferType
        );
        if (status === -1) {
          history.push("/error");
        } else {
          history.push({
            pathname: "/success/Transferencia",
            state: { value: transfer.value },
          });
        }
      };
      makeTransfer();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reAuth]);

  return (
    <IdleTimer>
      <Container>
        <Header value="Transferência" />
        <Content>
          <BankForm
            type="transfer"
            operation={transfer}
            setOperation={setTransfer}
          />
        </Content>
        <Footer
          fn={() => stageTransfer(transfer.value)}
          buttonDisabled={
            !(
              transfer.value &&
              transfer.bankBranch &&
              transfer.bankAccount &&
              transfer.transferType
            )
          }
        />
        <ConfirmationDialog
          keepMounted
          open={openConfirmDialog}
          onClose={handleCloseConfirmDialog}
          value={transfer.value}
          type="transferência"
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

export default BankTransfer;
