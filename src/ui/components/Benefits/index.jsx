import React, { useEffect } from "react";
import NumberFormat from "react-number-format";
import useBankOps from "../../../hooks/useBankOps";
import PrimaryButton from "../buttons/PrimaryButton";
import Title from "../Title";

import { Centralizer, Container } from "./styles";

function Benefits({ fnWithdraw }) {
  const { benefits, getBenefits } = useBankOps();

  useEffect(() => {
    async function getUserBenefits() {
      await getBenefits();
    }
    getUserBenefits();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Centralizer>
        <Title size="36">{benefits ? "Benefícios" : "Saque Rápido"}</Title>
      </Centralizer>
      {benefits ? (
        benefits.map((benefit, index) => {
          const { value, type, id } = benefit;
          return (
            <PrimaryButton key={id} fn={() => fnWithdraw(value)}>
              {type}
            </PrimaryButton>
          );
        })
      ) : (
        <>
          <PrimaryButton fn={() => fnWithdraw(50)}>
            <NumberFormat
              value={50.0}
              displayType={"text"}
              thousandSeparator={"."}
              decimalSeparator={","}
              prefix={"R$ "}
            />
          </PrimaryButton>
          <PrimaryButton fn={() => fnWithdraw(20)}>
            <NumberFormat
              value={20.0}
              displayType={"text"}
              thousandSeparator={"."}
              decimalSeparator={","}
              prefix={"R$ "}
            />
          </PrimaryButton>
        </>
      )}
    </Container>
  );
}

export default Benefits;
