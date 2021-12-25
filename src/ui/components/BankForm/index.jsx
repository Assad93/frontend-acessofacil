import React from "react";
import NumberFormat from "react-number-format";
import { format } from "date-fns";
import { Card, CardContent } from "@material-ui/core";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import CheckBox from "../inputs/CheckBox";
import {
  Container,
  FormWrapper,
  InputGroup,
  Label,
  Input,
  CardStyles,
  CardContentStyles,
  CardSecondaryStyles,
  CardContentSecondaryStyles,
  MUIradioStyles,
  MUIFormControlLabelStyles,
} from "./styles";

function BankForm({ type, operation, setOperation }) {
  return (
    <Container>
      <Card style={CardStyles}>
        <CardContent style={CardContentStyles}>
          <FormWrapper>
            <InputGroup>
              <Label>Agência:</Label>
              <NumberFormat
                placeholder="Agência"
                format={"####-#"}
                inputmode="numeric"
                value={operation.bankBranch}
                onChange={(e) =>
                  setOperation({ ...operation, bankBranch: e.target.value })
                }
                customInput={Input}
                disabled={operation.isSelfDeposit}
              />
            </InputGroup>
            <InputGroup>
              <Label>Conta:</Label>
              <NumberFormat
                placeholder="Conta"
                format={"#####-#"}
                inputmode="numeric"
                value={operation.bankAccount}
                onChange={(e) =>
                  setOperation({ ...operation, bankAccount: e.target.value })
                }
                customInput={Input}
                disabled={operation.isSelfDeposit}
              />
            </InputGroup>
          </FormWrapper>
          <FormWrapper>
            <InputGroup>
              <Label>Valor:</Label>
              <NumberFormat
                prefix={"R$ "}
                inputmode="numeric"
                thousandSeparator={"."}
                decimalSeparator={","}
                onValueChange={(values) => {
                  const { floatValue } = values;
                  setOperation({ ...operation, value: floatValue });
                }}
                value={operation.value}
                customInput={Input}
              />
            </InputGroup>
            <InputGroup>
              <Label>Data:</Label>
              <Input
                type="date"
                value={format(new Date(), "yyyy-MM-dd")}
                disabled={true}
              />
            </InputGroup>
          </FormWrapper>
        </CardContent>
      </Card>

      {type === "deposit" && (
        <Card style={CardSecondaryStyles}>
          <CardContent style={CardContentSecondaryStyles}>
            <Label>Depósito na própria conta?</Label>
            <CheckBox
              label={"Sim"}
              fn={() =>
                setOperation({
                  ...operation,
                  bankBranch: "",
                  bankAccount: "",
                  isSelfDeposit: !operation.isSelfDeposit,
                })
              }
            />
          </CardContent>
        </Card>
      )}

      {type === "transfer" && (
        <Card style={CardSecondaryStyles}>
          <CardContent style={CardContentSecondaryStyles}>
            <Label>Tipo de transferência:</Label>
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="gender"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="TED"
                  control={<Radio name="TransferOpt" sx={MUIradioStyles} />}
                  label="TED"
                  onChange={(e) =>
                    setOperation({
                      ...operation,
                      transferType: e.target.value,
                    })
                  }
                  sx={MUIFormControlLabelStyles}
                />
                <FormControlLabel
                  value="DOC"
                  control={<Radio name="TransferOpt" sx={MUIradioStyles} />}
                  label="DOC"
                  onChange={(e) => {
                    setOperation({
                      ...operation,
                      transferType: e.target.value,
                    });
                  }}
                  sx={MUIFormControlLabelStyles}
                />
                <FormControlLabel
                  value="sameBank"
                  control={<Radio name="TransferOpt" sx={MUIradioStyles} />}
                  label="Mesmo Banco"
                  onChange={(e) =>
                    setOperation({
                      ...operation,
                      transferType: e.target.value,
                    })
                  }
                  sx={MUIFormControlLabelStyles}
                />
              </RadioGroup>
            </FormControl>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}

export default BankForm;
