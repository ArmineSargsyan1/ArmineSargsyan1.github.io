import React from 'react';
import {Route, Routes} from "react-router-dom";
import Login from "./component/common/pages/Login";
import ErrorPage from "./component/common/pages/ErrorPage";
import ForgotPassword from "./component/common/pages/ForgotPassword";

const LoginNavigation = () => {
  return (
    <Routes>
        <Route index element={<Login />} />
      <Route path="forgot-password" element={<ForgotPassword />} />

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default LoginNavigation;
