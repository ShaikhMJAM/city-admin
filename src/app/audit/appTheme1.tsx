import { lazy } from "react";
import "./index.css";
const AUD = lazy(() => import("app/audit"));

const AppTheme1 = () => {
  return (
    <>
      <AUD />
    </>
  );
};

export default AppTheme1;
