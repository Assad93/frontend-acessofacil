import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../store/AuthProvider";
import useConsts from "./useConsts";

function usePayment() {
  const { userId } = useContext(AuthContext);
  const [API_URL, REQ_SIMPLE_CONFIG] = useConsts();
  const [paymentValue, setPaymentValue] = useState("");
  const [barCode, setBarCode] = useState("");
  const [openConfirmDialog, isOpenConfirmDialog] = useState(false);
  const [openPassDialog, isOpenPassDialog] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  function handleCloseConfirmDialog(newValue) {
    isOpenConfirmDialog(false);
    setPaymentValue("");
    setBarCode("");

    if (newValue) {
      setPaymentValue(newValue);
      isOpenPassDialog(true);
    }
  }

  function handleClosePassDialog() {
    isOpenPassDialog(false);
    setPaymentValue("");
    setBarCode("");
  }

  function handleCloseErrDialog() {
    setError(false);
    setPaymentValue("");
    setBarCode("");
  }

  function validBarCode(barCode) {
    const cleanBarCode = barCode.replace("_", "");
    if (cleanBarCode.length === 54) {
      return true;
    } else {
      return false;
    }
  }

  const checkPaymentLimit = (value) => {
    return Number(value) <= 20000 ? true : false;
  };

  const checkBalance = async (value) => {
    const { data } = await axios.get(
      `${API_URL}/accounts/${userId}`,
      REQ_SIMPLE_CONFIG
    );
    if (Number(value) <= data.balance) {
      return true;
    } else {
      return false;
    }
  };

  async function stagePayment(barCode, value) {
    const isValidBarCode = validBarCode(barCode);
    const isLimit = checkPaymentLimit(value);
    const isBalance = await checkBalance(value);
    if (isValidBarCode) {
      if (isLimit) {
        if (isBalance) {
          setPaymentValue(value);
          isOpenConfirmDialog(true);
        } else {
          setErrorMsg("Você NÃO POSSUI SALDO suficiente!");
          setError(true);
        }
      } else {
        setErrorMsg("O limite para um pagamento é R$ 20.000,00");
        setError(true);
      }
    } else {
      setErrorMsg("Código de barras inválido!");
      setError(true);
    }
  }

  return {
    paymentValue,
    setPaymentValue,
    barCode,
    setBarCode,
    openConfirmDialog,
    openPassDialog,
    stagePayment,
    error,
    errorMsg,
    handleCloseConfirmDialog,
    handleCloseErrDialog,
    handleClosePassDialog,
  };
}

export default usePayment;
