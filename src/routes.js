import React, { useContext } from "react";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import AuthProvider, { AuthContext } from "./store/AuthProvider";
import BankDeposit from "./pages/BankDeposit";
import BankStatement from "./pages/BankStatement";
import BankTransfer from "./pages/BankTransfer";
import FacialRecAuth from "./pages/FacialRecAuth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Payments from "./pages/Payments";
import SuccessPage from "./pages/SuccessPage";
import Withdraw from "./pages/Withdraw";
import Error from "./pages/Error";

// Securing routes
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { token } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const Routes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/facialAuth" component={FacialRecAuth} />
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/withdraw" component={Withdraw} />
        <PrivateRoute path="/bankStatement" component={BankStatement} />
        <PrivateRoute path="/bankDeposit" component={BankDeposit} />
        <PrivateRoute path="/payments" component={Payments} />
        <PrivateRoute path="/bankTransfer" component={BankTransfer} />
        <PrivateRoute path="/success/:operation" component={SuccessPage} />
        <Route path="/error" component={Error} />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Routes;
