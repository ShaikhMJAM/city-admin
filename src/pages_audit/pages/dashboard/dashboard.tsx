import { Transactions } from "../../../components/dashboard/transactions";
import { TrafficByDevice } from "../../../components/dashboard/traffic-by-device";
import { DashboardLayout } from "./dashboard-layout";
import { Box, Grid } from "@mui/material";
import { DashboardBox } from "components/dashboard/dashboardBox";
import { Alert } from "components/common/alert";
import { useQuery } from "react-query";
import * as API from "./api";
import { LoaderPaperComponent } from "components/common/loaderPaper";
import { Fragment } from "react";
import { PendingRequestChart } from "components/dashboard/pendingRequest";

// import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

const Dashboard = () => {
  const { data, isLoading, isFetching, isError, error, refetch } = useQuery<
    any,
    any
  >(["getDashboardData"], () => API.getDashboardData());

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          // py: 8,
        }}
      >
        <div style={{ paddingTop: "14px" }}>
          <Grid container spacing={2}>
            {isLoading || isFetching ? (
              <Grid item lg={12} md={12} xl={12} xs={12}>
                <LoaderPaperComponent />
              </Grid>
            ) : isError ? (
              <Fragment>
                <div style={{ width: "100%", paddingTop: "10px" }}>
                  <Alert
                    severity={error?.severity ?? "error"}
                    errorMsg={error?.error_msg ?? "Error"}
                    errorDetail={error?.error_detail ?? ""}
                  />
                </div>
              </Fragment>
            ) : (
              <>
                {data?.[0]?.BOXES?.map((item, index) => (
                  <Grid key={"grid" + index} item xl={3} lg={3} sm={6} xs={12}>
                    <DashboardBox
                      key={"board" + index}
                      title={item?.TITLE}
                      body={item?.DEFAULT}
                      isfooterVisible={item?.ISFOOTERVISIBLE}
                      icon={item?.ICON}
                      apiName={item?.APINAME}
                    />
                  </Grid>
                ))}
                {data?.[0]?.CHART1?.ISCHARTVISIBLE ? (
                  <Grid item lg={8} md={12} xl={8} xs={12}>
                    <Transactions />
                  </Grid>
                ) : null}
                {data?.[0]?.CHART2?.ISCHARTVISIBLE ? (
                  <Grid item lg={4} md={6} xl={4} xs={12}>
                    <TrafficByDevice sx={{ height: "100%" }} />
                  </Grid>
                ) : null}
              </>
            )}

            {/* <Grid item lg={4} md={6} xl={3} xs={12}>
            <LatestProducts sx={{ height: "100%" }} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <LatestOrders />
          </Grid> */}
          </Grid>
          <Grid container mt={2}>
            <Grid item xs={12}>
              <PendingRequestChart />
            </Grid>
          </Grid>
        </div>
      </Box>
    </>
  );
};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
