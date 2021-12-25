import React from "react";
import { Button } from "./styles";

function PrimaryButton({ fn, buttonDisabled, children }) {
  return (
    <Button disabled={buttonDisabled} onClick={() => fn()}>
      {children}
    </Button>
  );
}

export default PrimaryButton;
