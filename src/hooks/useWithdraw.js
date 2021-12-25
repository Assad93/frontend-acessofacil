import { useContext, useState } from "react";
import axios from "axios";
import useConsts from "./useConsts";
import { AuthContext } from "../store/AuthProvider";
import { useHistory } from "react-router";

function useWithdraw() {
  let history = useHistory();
  const { userId } = useContext(AuthContext);
  const [API_URL, REQ_SIMPLE_CONFIG] = useConsts();
  const [withdrawValue, setWithdrawValue] = useState("");
  const [openConfirmDialog, isOpenConfirmDialog] = useState(false);
  const [openPassDialog, isOpenPassDialog] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  function handleCloseConfirmDialog(newValue) {
    isOpenConfirmDialog(false);
    setWithdrawValue("");

    //if user press confirm button
    if (newValue) {
      setWithdrawValue(newValue);
      isOpenPassDialog(true);
    }
  }

  function handleClosePassDialog() {
    isOpenPassDialog(false);
  }

  function handleCloseErrDialog() {
    setError(false);
  }

  function availableBills(value) {
    if (Number(value) % 5 === 0) {
      return true;
    } else {
      return false;
    }
  }

  function checkWithdrawLimit(value) {
    if (Number(value) <= 1500) {
      return true;
    } else {
      return false;
    }
  }

  async function checkDailyLimit(value) {
    const today = new Date();
    const fmtTodayDate = today.toLocaleDateString("pt-BR");

    try {
      const { data } = await axios.get(
        `${API_URL}/operations?date=${fmtTodayDate}&accountId=${userId}&type=Saque`,
        REQ_SIMPLE_CONFIG
      );

      let withdrawToday = 0;
      data.forEach((operation) => {
        withdrawToday += operation.value;
      });

      const amount = withdrawToday + value;

      if (amount <= 3000) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      history.push("/error");
    }
  }

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

  async function stageWithdraw(value) {
    const isBalance = await checkBalance(value);
    const isDailyLimit = await checkDailyLimit(value);
    const available = availableBills(value);
    const isLimit = checkWithdrawLimit(value);
    if (available && isLimit && isDailyLimit && isBalance) {
      setWithdrawValue(value);
      isOpenConfirmDialog(true);
    } else {
      setError(true);
      if (!isDailyLimit) {
        setErrorMsg("O limite diário de saque é de R$ 3.000,00");
      } else if (!isLimit) {
        setErrorMsg("O limite de saque, por vez, é de R$ 1.500,00");
      } else if (!available) {
        setErrorMsg(
          "Somente disponível notas de R$ 5,00 - R$ 10,00 - R$ 20,00 - R$ 50,00 - R$ 100,00"
        );
      } else {
        setErrorMsg("Você NÃO POSSUI SALDO suficiente!");
      }
    }
  }

  return {
    withdrawValue,
    setWithdrawValue,
    openConfirmDialog,
    openPassDialog,
    error,
    errorMsg,
    handleCloseConfirmDialog,
    handleCloseErrDialog,
    handleClosePassDialog,
    stageWithdraw,
  };
}

export default useWithdraw;
