import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import {
  AuthProvider,
  AuthLoginController,
  ProtectedRoutes,
  ForgotPasswordController,
} from "./auth";
import { PagesAudit } from "./pages_audit";
//alert("EntryPoint");
const EntryPoint = () => (
  <Fragment>
    <AuthProvider>
      <Routes>
        <Route path="login" element={<AuthLoginController />} />
        <Route
          path="forgotpassword"
          element={<ForgotPasswordController screenFlag="password" />}
        />
        <Route
          path="forgot-totp"
          element={<ForgotPasswordController screenFlag="totp" />}
        />
        <Route
          path="*"
          element={
            <ProtectedRoutes>
              <PagesAudit />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </AuthProvider>
  </Fragment>
);

export default EntryPoint;
