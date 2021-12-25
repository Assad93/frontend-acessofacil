import { useContext, useState } from "react";
import { format } from "date-fns";
import axios from "axios";
import { AuthContext } from "../store/AuthProvider";
import useConsts from "./useConsts";

const initialTransferState = {
  bankBranch: "",
  bankAccount: "",
  value: "",
  date: "",
  transferType: "",
};

const useTransfer = () => {
  const { userId } = useContext(AuthContext);
  const [API_URL, REQ_SIMPLE_CONFIG] = useConsts();
  const [openConfirmDialog, isOpenConfirmDialog] = useState(false);
  const [openPassDialog, isOpenPassDialog] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [transfer, setTransfer] = useState(initialTransferState);

  const handleCloseConfirmDialog = (newValue) => {
    isOpenConfirmDialog(false);
    setTransfer({ ...transfer, value: "" });

    if (newValue) {
      setTransfer({ ...transfer, value: newValue });
      isOpenPassDialog(true);
    }
  };

  const handleClosePassDialog = () => {
    isOpenPassDialog(false);
    setTransfer({ value: "", date: "", transferType: "" });
  };

  const handleCloseErrDialog = () => {
    setError(false);
    setTransfer({
      ...transfer,
      bankBranch: "",
      bankAccount: "",
      value: "",
      transferType: "",
    });
  };

  const getTodayDate = () => {
    // date format yyyy-MM-dd
    const dateFormatted = format(new Date(), "yyyy-MM-dd");
    setTransfer({ ...transfer, date: dateFormatted });
  };

  const checkTransferLimit = (value) => {
    if (Number(value) > 5000 && transfer.transferType === "DOC") {
      setErrorMsg("O limite de DOC é de R$5.000,00");
      return false;
    } else if (Number(value) > 10000 && transfer.transferType === "TED") {
      setErrorMsg("O limite de TED é de R$ 10.000,00");
      return false;
    } else if (Number(value) > 10000 && transfer.transferType === "sameBank") {
      setErrorMsg("O limite de transferência entre contas é de R$ 10.000,00");
      return false;
    } else {
      return true;
    }
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

  const stageTransfer = async (value) => {
    getTodayDate();
    const isLimit = checkTransferLimit(value);
    const isBalance = await checkBalance(value);
    if (isLimit) {
      if (isBalance) {
        isOpenConfirmDialog(true);
      } else {
        setErrorMsg("Você NÃO POSSUI SALDO suficiente!");
        setError(true);
      }
    } else {
      setError(true);
    }
  };

  return {
    openConfirmDialog,
    isOpenConfirmDialog,
    transfer,
    setTransfer,
    openPassDialog,
    isOpenPassDialog,
    error,
    setError,
    errorMsg,
    setErrorMsg,
    handleCloseConfirmDialog,
    handleClosePassDialog,
    handleCloseErrDialog,
    stageTransfer,
  };
};

export default useTransfer;
