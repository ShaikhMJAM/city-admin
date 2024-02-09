import { useState, Fragment, lazy, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { AppBar } from "./appBar";
import { Drawer } from "./drawer";
import { MySideBar } from "./sideBar";
import { Content } from "./content";
import { useStyles } from "./style";
import { PageNotFound } from "app/pageNotFound/notFound";
import { useMediaQuery, useTheme } from "@mui/material";
const Dashboard = lazy(() => import("./pages/dashboard/dashboard"));
const AllScreensGridWrapper = lazy(() => import("./pages/allScreens"));
const Profile = lazy(() => import("./pages/profile"));
const OperationsMenu = lazy(() => import("./pages/operations"));
const ConfigurationsMenu = lazy(() => import("./pages/configurations"));
const TechnicalSupport = lazy(() => import("./pages/technicalSupport"));
const UserManagementMenu = lazy(() => import("./pages/userManagement"));
const ConfirmationMenu = lazy(() => import("./pages/confirmations"));
const DynamicReports = lazy(() => import("./pages/reports/dynamicReports"));
const Reports = lazy(() => import("./pages/reports"));

export const PagesAudit = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerState] = useState(!isTablet);
  const handleDrawerOpen = () => setDrawerState(true);
  const handleDrawerClose = () => setDrawerState(false);
  const isValidURL = props?.isValidURL ?? true;

  useEffect(() => {
    setDrawerState(!isTablet);
  }, [isTablet]);

  return (
    <Fragment>
      <div className={classes.root}>
        <AppBar open={drawerOpen} handleDrawerOpen={handleDrawerOpen} />
        <Drawer
          open={drawerOpen}
          handleDrawerClose={handleDrawerClose}
          handleDrawerOpen={handleDrawerOpen}
        >
          <MySideBar handleDrawerOpen={handleDrawerOpen} open={drawerOpen} />
        </Drawer>
        <Content>
          <Routes>
            {isValidURL ? (
              <>
                <Route
                  path="technical-support/*"
                  element={<TechnicalSupport />}
                />
                <Route path="operation/*" element={<OperationsMenu />} />
                <Route
                  path="all-screens/*"
                  element={<AllScreensGridWrapper />}
                />
                <Route path="config/*" element={<ConfigurationsMenu />} />
                <Route path="adminuser/*" element={<UserManagementMenu />} />
                <Route path="confirm/*" element={<ConfirmationMenu />} />
                <Route path="profile" element={<Profile />} />
                <Route path="dashboard/*" element={<Dashboard />} />
                <Route path="report/*" element={<DynamicReports />} />
                <Route path="reports/*" element={<Reports />} />
              </>
            ) : null}
            <Route
              path="*"
              element={<RedirectComponent isValidURL={isValidURL} />}
            />

            <Route path="not-found/" element={<PageNotFound />} />
          </Routes>
          {/* <div
            style={{
              position: "absolute",
              right: "0px",
              bottom: "0px",
              zIndex: "1501",
            }}
          >
            <ChatMessageBox />Switch 
          </div> */}
        </Content>
      </div>
    </Fragment>
  );
};

const RedirectComponent = ({ isValidURL }) => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (
      location.pathname === "/netbanking" ||
      location.pathname === "/netbanking/"
    ) {
      navigate("/netbanking/dashboard");
    } else if (!isValidURL) {
      navigate("/netbanking/not-found");
    } else {
      navigate(location.pathname);
    }
  }, [navigate, location.pathname]);
  return null;
};
