import React from "react";
import NumberFormat from "react-number-format";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Container, InputGroup, Label, Input } from "./styles";

function WithdrawInput({ value, fn }) {
  return (
    <Container>
      <Card style={{ backgroundColor: "#1f46a1" }}>
        <CardContent>
          <InputGroup>
            <Label>Digite o valor: </Label>
            {/* Input with Mask  */}
            <NumberFormat
              maxLength={8}
              prefix={"R$ "}
              inputmode="numeric"
              thousandSeparator={"."}
              decimalSeparator={","}
              onValueChange={(values) => {
                const { floatValue } = values;
                fn(floatValue);
              }}
              value={value}
              customInput={Input}
            />
          </InputGroup>
        </CardContent>
      </Card>
    </Container>
  );
}

export default WithdrawInput;
