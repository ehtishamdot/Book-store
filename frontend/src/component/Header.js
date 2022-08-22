import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/auth-context";

const Header = (props) => {
  const AuthCtx = useContext(AuthContext);

  const navigate = useNavigate();

  const logoutHandler = () => {
    AuthCtx.logout();
    navigate("/login");
  };

  return <button onClick={logoutHandler}>LOGOUT</button>;
};

export default Header;
