import React from "react";
import { useIdleTimer } from "react-idle-timer";
import { useHistory } from "react-router";

// Create a timer to detect inactivity in 5 minutes
function IdleTimer({ children }) {
  let history = useHistory();

  const handleOnIdle = () => {
    history.push("/login");
  };

  useIdleTimer({
    timeout: 1000 * 60 * 5,
    onIdle: handleOnIdle,
    debounce: 500,
  });

  return <div>{children}</div>;
}

export default IdleTimer;
