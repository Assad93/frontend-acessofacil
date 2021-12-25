import React from "react";
import NumberFormat from "react-number-format";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Container, InputGroup, Label, Input } from "./styles";

function PaymentInput({ paymentValue, fnPayment, barCode, fnBarCode }) {
  // function currencyFormatter(value) {
  //   if (!Number(value)) return "";
  //   const amount = new Intl.NumberFormat("pt-BR", {
  //     style: "currency",
  //     currency: "BRL",
  //   }).format(value / 100);

  //   return `${amount}`;
  // }

  return (
    <Container>
      <Card style={{ backgroundColor: "#1f46a1" }}>
        <CardContent>
          <InputGroup>
            <Label>Digite o código de barras:</Label>
            <NumberFormat
              placeholder="Cód. Barras"
              mask={"_"}
              format={"#####.##### #####.###### #####.###### # ##############"}
              inputmode="numeric"
              customInput={Input}
              onValueChange={(values) => {
                const { formattedValue } = values;
                fnBarCode(formattedValue);
              }}
              value={barCode}
            />
          </InputGroup>
          <InputGroup style={{ marginTop: 10 }}>
            <Label>Digite o valor:</Label>
            <NumberFormat
              prefix={"R$ "}
              inputmode="numeric"
              thousandSeparator={"."}
              decimalSeparator={","}
              onValueChange={(values) => {
                const { floatValue } = values;
                fnPayment(floatValue);
              }}
              value={paymentValue}
              customInput={Input}
            />
          </InputGroup>
        </CardContent>
      </Card>
    </Container>
  );
}

export default PaymentInput;
