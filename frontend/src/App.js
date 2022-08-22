import React, { useContext } from "react";
import Login from "./component/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./component/Signup";
import Bookstore from "./component/Bookstore";
import { AuthContext } from "./store/auth-context";
import Header from "./component/Header";

const App = () => {
  const authCtx = useContext(AuthContext);

  console.log(authCtx.isLoggedIn);
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={!authCtx.isLoggedIn && <Login />} />
        <Route
          path="/bookstore"
          element={authCtx.isLoggedIn && <Bookstore />}
        />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
