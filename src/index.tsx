import { StrictMode, useEffect, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "registry"; //register functions to be used across application
import "components/tableCellComponents"; //register table cell components
import "typeface-roboto";
import { FullScreenLoader } from "components/common/loaderPaper";
import "languages/languagesConfiguration";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { AuthSDK } from "registry/fns/auth";

//const AUD = lazy(() => import("app/audit"));
const AppTheme1 = lazy(() => import("app/audit/appTheme1"));
const AppTheme2 = lazy(() => import("app/audit/appTheme2"));
const ErrorPage = lazy(() => import("app/error"));

// require("dotenv").config();
const Redirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/netbanking");
  }, [navigate]);
  return null;
};
const App = ({ API_URL }) => {
  const { i18n } = useTranslation();

  let languageCode = Cookies.get("netbanking.admin.i18n.language.code");
  if (languageCode) {
    i18n.changeLanguage(languageCode);
  }
  AuthSDK.setDisplayLanguage(i18n.resolvedLanguage);
  AuthSDK.inititateAPI(
    `${new URL("./", API_URL).href}` ?? "",
    process?.env?.REACT_APP_API_PROJECT_NAME ?? ""
  );
  //console.log(`${new URL("./", process.env.REACT_APP_API_URL).href}` ?? "", process?.env?.REACT_APP_API_PROJECT_NAME ?? "", API_URL);
  return (
    <StrictMode>
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          <Suspense fallback={<FullScreenLoader />}>
            {/* <ErrorBoundary> */}
            <Routes>
              <Route path="netbanking/*" element={<AppTheme1 />} />
              <Route path="error/*" element={<ErrorPage />} />
              <Route path="*" element={<Redirect />} />
            </Routes>
            {/* </ErrorBoundary> */}
          </Suspense>
        </BrowserRouter>
      </DndProvider>
    </StrictMode>
  );
};
const container: any = document.getElementById("root");
container.innerText = "Loading..";
fetch(`${new URL(window.location.href).origin}/config/configuration.json`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const root = createRoot(container!); // createRoot(container!) if you use TypeScript
    root.render(<App API_URL={data.API_URL} />);
  })
  .catch((err) => {
    container.innerHTML = `<img src="${
      new URL(window.location.href).origin
    }/internal-server-error.svg"  style="aspect-ratio:2/0.9;"/>`;
  });

// If you want your app to work offline and load faster,yarh some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//register();
