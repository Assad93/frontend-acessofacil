import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import IdleTimer from "../../hooks/useIdleTimer";
import usePayment from "../../hooks/usePayment";
import useBankOps from "../../hooks/useBankOps";
import ConfirmationDialog from "../../ui/components/dialogs/ConfirmationDialog";
import PaymentInput from "../../ui/components/inputs/PaymentInput";
import Header from "../../ui/components/surfaces/Header";
import Container from "../../ui/components/Container";
import Footer from "../../ui/components/surfaces/Footer";
import FastBalance from "../../ui/components/FastBalance";
import PasswordDialog from "../../ui/components/dialogs/PasswordDialog";
import ErrDialog from "../../ui/components/dialogs/ErrDialog";
import { Content } from "./styles";

function Payments() {
  let history = useHistory();
  const { payment } = useBankOps();
  const {
    paymentValue,
    setPaymentValue,
    barCode,
    setBarCode,
    openConfirmDialog,
    handleCloseConfirmDialog,
    openPassDialog,
    handleClosePassDialog,
    error,
    errorMsg,
    handleCloseErrDialog,
    stagePayment,
  } = usePayment();

  const [reAuth, isReAuth] = useState(false);

  useEffect(() => {
    if (reAuth) {
      async function makePayment() {
        const status = await payment(paymentValue);
        if (status === -1) {
          history.push("/error");
        } else {
          history.push({
            pathname: "/success/Pagamento",
            state: { value: paymentValue },
          });
        }
      }
      makePayment();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reAuth]);

  return (
    <IdleTimer>
      <Container>
        <Header value="Pagamentos" />
        <Content>
          <PaymentInput
            paymentValue={paymentValue}
            fnPayment={setPaymentValue}
            barCode={barCode}
            fnBarCode={setBarCode}
          />
          <FastBalance />
        </Content>
        <Footer
          fn={() => stagePayment(barCode, paymentValue)}
          buttonDisabled={!(paymentValue && barCode)}
        />
        <ConfirmationDialog
          keepMounted
          open={openConfirmDialog}
          onClose={handleCloseConfirmDialog}
          value={paymentValue}
          type="pagamento"
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

export default Payments;
