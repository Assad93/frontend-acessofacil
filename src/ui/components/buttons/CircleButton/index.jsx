import React from "react";

import { Button } from "./styles";

function CircleButton({ fn, children }) {
  return <Button onClick={() => fn()}>{children}</Button>;
}

export default CircleButton;
