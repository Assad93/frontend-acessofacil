import React from "react";
import ErrorIcon from "@material-ui/icons/ReportProblemOutlined";
import Container from "../../ui/components/Container";
import { Content, ErrorMsg } from "./styles";
import SimpleHeader from "../../ui/components/surfaces/SimpleHeader";

function Error() {
  return (
    <Container>
      <SimpleHeader />
      <Content>
        <ErrorIcon style={{ fontSize: 200, color: "#ff0000" }} />
        <ErrorMsg>
          Ops... Ocorreu um <span>erro</span> técnico!
        </ErrorMsg>
      </Content>
    </Container>
  );
}

export default Error;
