import React, { useState, useContext } from "react";
import useConsts from "../../hooks/useConsts";
import axios from "axios";
import { Card, CardContent } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/ErrorOutline";
import NumberFormat from "react-number-format";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../store/AuthProvider";
import Container from "../../ui/components/Container";
import ErrDialog from "../../ui/components/dialogs/ErrDialog";
import PrimaryButton from "../../ui/components/buttons/PrimaryButton";
import {
  Content,
  Title,
  SubTitle,
  InputGroup,
  Input,
  cardStyle,
  cardContentStyle,
  ErrorMsg,
} from "./styles";

const initialState = {
  bankBranch: "",
  numberAccount: "",
  password: "",
  errLogin: false,
  openDialog: false,
};

function Login() {
  const [API_URL] = useConsts();

  let history = useHistory();

  const { countFacialError, setToken, setUserId } = useContext(AuthContext);

  const [state, setState] = useState(initialState);

  async function auth(bankBranch, numberAccount, password) {
    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, {
        bankBranch,
        numberAccount,
        password,
      });

      const token = data.access_token;
      const userId = data.id;

      setToken(token);
      setUserId(userId);

      history.push("/facialAuth");
    } catch (error) {
      setState({ ...state, errLogin: true, openDialog: true });
    }
  }

  const handleCloseDialog = () => {
    setState({
      ...state,
      bankBranch: "",
      numberAccount: "",
      password: "",
      openDialog: false,
    });
  };

  return (
    <Container>
      <Content>
        {countFacialError >= 3 && (
          <ErrorMsg>
            <ErrorIcon style={{ fontSize: 50 }} />
            Reconhecimento Facial falhou 3 vezes
          </ErrorMsg>
        )}
        <Card style={cardStyle}>
          <CardContent style={cardContentStyle}>
            <Title>Acesso fácil</Title>
            <SubTitle>Digite seus dados para entrar</SubTitle>
            <InputGroup>
              <NumberFormat
                placeholder="Agência"
                format={"####-#"}
                inputmode="numeric"
                onValueChange={(values) => {
                  const { value } = values;

                  setState({ ...state, bankBranch: value });
                }}
                value={state.bankBranch}
                customInput={Input}
              />
              <NumberFormat
                placeholder="Conta"
                format={"#####-#"}
                inputmode="numeric"
                onValueChange={(values) => {
                  const { value } = values;

                  setState({ ...state, numberAccount: value });
                }}
                value={state.numberAccount}
                customInput={Input}
              />
              <Input
                placeholder="Senha"
                type="password"
                maxLength="6"
                value={state.password}
                onChange={(e) => {
                  setState({ ...state, password: e.target.value });
                }}
              />
            </InputGroup>
          </CardContent>
        </Card>
        <PrimaryButton
          fn={() => auth(state.bankBranch, state.numberAccount, state.password)}
        >
          Confirmar
        </PrimaryButton>
        {state.errLogin && (
          <ErrDialog
            keepMounted
            open={state.openDialog}
            onClose={handleCloseDialog}
            msg="Dado(s) incorreto(s)!"
          />
        )}
      </Content>
    </Container>
  );
}

export default Login;
