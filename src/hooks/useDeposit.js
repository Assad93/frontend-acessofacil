import { useState } from "react";
import { format } from "date-fns";

const initialDepositState = {
  bankBranch: "",
  bankAccount: "",
  value: "",
  date: "",
  isSelfDeposit: false,
};

const useDeposit = () => {
  const [openConfirmDialog, isOpenConfirmDialog] = useState(false);
  const [deposit, setDeposit] = useState(initialDepositState);
  const [openPassDialog, isOpenPassDialog] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleCloseConfirmDialog = (newValue) => {
    isOpenConfirmDialog(false);
    setDeposit({ ...deposit, value: "" });

    if (newValue) {
      setDeposit({ ...deposit, value: newValue });
      isOpenPassDialog(true);
    }
  };

  const handleClosePassDialog = () => {
    isOpenPassDialog(false);
  };

  const handleCloseErrDialog = () => {
    setError(false);
    setDeposit({
      ...deposit,
      value: "",
      bankBranch: "",
      bankAccount: "",
    });
  };

  const getTodayDate = () => {
    // date format yyyy-MM-dd
    const dateFormatted = format(new Date(), "yyyy-MM-dd");
    setDeposit({ ...deposit, date: dateFormatted });
  };

  const checkDepositLimit = (value) => {
    if (Number(value) <= 5000) {
      return true;
    } else {
      return false;
    }
  };

  const stageDeposit = (value) => {
    getTodayDate();
    const isLimit = checkDepositLimit(value);
    if (isLimit) {
      isOpenConfirmDialog(true);
    } else {
      setError(true);
      setErrorMsg("O limite de depósito é de R$ 5.000,00");
    }
  };

  return {
    openConfirmDialog,
    isOpenConfirmDialog,
    deposit,
    setDeposit,
    openPassDialog,
    isOpenPassDialog,
    error,
    setError,
    errorMsg,
    setErrorMsg,
    handleCloseConfirmDialog,
    handleClosePassDialog,
    handleCloseErrDialog,
    stageDeposit,
  };
};

export default useDeposit;
