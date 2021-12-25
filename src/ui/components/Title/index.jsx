import React from "react";

import { StyledTitle } from "./styles";

function Title({ size, children }) {
  return <StyledTitle size={size}>{children}</StyledTitle>;
}

export default Title;
