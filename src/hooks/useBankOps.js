import { useContext, useState } from "react";
import { AuthContext } from "../store/AuthProvider";
import axios from "axios";
import useConsts from "./useConsts";
import { format } from "date-fns";
import parseISO from "date-fns/parseISO";

function useBankOps() {
  const [API_URL, REQ_SIMPLE_CONFIG] = useConsts();
  const { userId } = useContext(AuthContext);
  const [balance, setBalance] = useState({ value: "", error: false });
  const [benefits, setBenefits] = useState("");
  const [operations, setOperations] = useState({ value: "", error: false });

  async function withdraw(value) {
    try {
      const data = await getUserData();
      const fmtValue = Number((data.balance - value).toFixed(2));
      const tempAccount = { ...data, balance: fmtValue };
      await axios.put(
        `${API_URL}/accounts/${userId}`,
        tempAccount,
        REQ_SIMPLE_CONFIG
      );

      const date = new Date();
      const fmtDate = date.toLocaleDateString("pt-BR");

      const operation = {
        accountId: userId,
        date: fmtDate,
        type: "Saque",
        value: value,
        remainingBalance: tempAccount.balance,
      };

      await axios.post(`${API_URL}/operations`, operation, REQ_SIMPLE_CONFIG);
      return 0;
    } catch (error) {
      return -1;
    }
  }

  async function bankDeposit(value, date, isSelfDeposit) {
    try {
      const data = await getUserData();

      let tempAccount = { ...data, balance: data.balance };

      if (isSelfDeposit === true) {
        const fmtValue = Number((data.balance + value).toFixed(2));
        tempAccount = { ...data, balance: fmtValue };
        await axios.put(
          `${API_URL}/accounts/${userId}`,
          tempAccount,
          REQ_SIMPLE_CONFIG
        );
      }

      const dateFormatted = format(parseISO(date), "dd/MM/yyyy");

      const operation = {
        accountId: userId,
        date: dateFormatted,
        type: "Depósito",
        value: value,
        remainingBalance: tempAccount.balance,
      };

      await axios.post(`${API_URL}/operations`, operation, REQ_SIMPLE_CONFIG);
      return 0;
    } catch (error) {
      return -1;
    }
  }

  async function payment(value) {
    try {
      const data = await getUserData();
      const fmtValue = Number((data.balance - value).toFixed(2));
      const tempAccount = { ...data, balance: fmtValue };
      await axios.put(
        `${API_URL}/accounts/${userId}`,
        tempAccount,
        REQ_SIMPLE_CONFIG
      );
      const date = new Date();
      const fmtDate = date.toLocaleDateString("pt-BR");

      const operation = {
        accountId: userId,
        date: fmtDate,
        type: "Pagamento",
        value: value,
        remainingBalance: tempAccount.balance,
      };

      await axios.post(`${API_URL}/operations`, operation, REQ_SIMPLE_CONFIG);
      return 0;
    } catch (error) {
      return -1;
    }
  }

  async function bankTransfer(value, date, transferType) {
    try {
      const data = await getUserData();

      let tempAccount = {};

      let fmtValue = null;

      if (transferType === "TED" || transferType === "DOC") {
        fmtValue = Number((data.balance - value - 8.5).toFixed(2));
        tempAccount = { ...data, balance: fmtValue };
      }

      if (transferType === "sameBank") {
        fmtValue = Number((data.balance - value - 0.95).toFixed(2));
        tempAccount = { ...data, balance: fmtValue };
      }

      await axios.put(
        `${API_URL}/accounts/${userId}`,
        tempAccount,
        REQ_SIMPLE_CONFIG
      );

      const dateFormatted = format(parseISO(date), "dd/MM/yyyy");

      const operation = {
        accountId: userId,
        date: dateFormatted,
        type: "Transferência",
        value: value,
        remainingBalance: tempAccount.balance,
      };

      await axios.post(`${API_URL}/operations`, operation, REQ_SIMPLE_CONFIG);
      return 0;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }

  async function bankStatement() {
    try {
      const { data } = await axios.get(
        `${API_URL}/operations?accountId=${userId}`,
        REQ_SIMPLE_CONFIG
      );

      setOperations({ ...operations, value: data });
    } catch (error) {
      setOperations({ value: "", error: true });
    }
  }

  async function getUserData() {
    const { data } = await axios.get(
      `${API_URL}/accounts/${userId}`,
      REQ_SIMPLE_CONFIG
    );

    return data;
  }

  async function getBenefits() {
    try {
      const { data } = await axios.get(
        `${API_URL}/accounts/${userId}?_embed=benefits`,
        REQ_SIMPLE_CONFIG
      );
      const { benefits } = data;
      setBenefits(benefits);
    } catch (error) {
      setBenefits("");
    }
  }

  async function getBalance() {
    try {
      const data = await getUserData();

      setBalance({ ...balance, value: data.balance });
    } catch (error) {
      setBalance({ value: "", error: true });
    }
  }

  return {
    withdraw,
    bankDeposit,
    payment,
    bankTransfer,
    bankStatement,
    operations,
    balance,
    getBalance,
    benefits,
    getBenefits,
  };
}

export default useBankOps;
