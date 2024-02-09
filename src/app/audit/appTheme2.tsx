import { lazy } from "react";
import "./index-theme-2.css";
const AUD = lazy(() => import("app/audit"));

const AppTheme2 = () => {
  return (
    <>
      <AUD />
    </>
  );
};

export default AppTheme2;
