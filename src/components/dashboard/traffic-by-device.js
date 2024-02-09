import { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { useQuery } from "react-query";
import * as API from "./api";
import Tooltip from "@mui/material/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { GradientButton } from "components/styledComponent/button";
import { useStyles } from "./style";

Chart.register(ArcElement);

export const TrafficByDevice = (props) => {
  const theme = useTheme();
  const [showMore, setShowMore] = useState(false);
  const classes = useStyles();

  let reqID = Math.floor(new Date().getTime() / 300000);
  const result = useQuery(["getTrafficChartData", reqID], () =>
    API.getTrafficChartData()
  );
  const showErrorData = () => {
    setShowMore(true);
  };
  const getPerData = (value, totalLoginUser) => {
    return (
      Number.parseFloat(
        totalLoginUser > 0 && Number.parseInt(value) > 0
          ? (Number.parseInt(value) / totalLoginUser) * 100
          : Boolean(value)
          ? value
          : "0"
      ).toFixed(2) + "%"
    );
  };
  const data = {
    datasets: [
      {
        data: [
          result?.data?.[0]?.WEB,
          result?.data?.[0]?.IOS,
          result?.data?.[0]?.ANDROID,
          result?.data?.[0]?.HUAWEI,
        ],
        backgroundColor: ["#3F51B5", "#e53935", "#FB8C00", "#06681B"],
        borderWidth: 8,
        borderColor: "#FFFFFF",
        hoverBorderColor: "#FFFFFF",
      },
    ],
    labels: [" Web", " IOS", " Android", "Huawei"],
  };

  const options = {
    animation: true,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
  };

  const devices = useMemo(() => {
    return [
      {
        title: "Web",
        value: result?.data?.[0]?.WEB ?? "0",
        icon: LaptopMacIcon,
        color: "#3F51B5",
      },
      {
        title: "IOS",
        value: result?.data?.[0]?.IOS ?? "0",
        icon: PhoneIphoneIcon,
        color: "#E53935",
      },
      {
        title: "Android",
        value: result?.data?.[0]?.ANDROID ?? "0",
        icon: PhoneAndroidIcon,
        color: "#FB8C00",
      },
      {
        title: "Huawei",
        value: result?.data?.[0]?.HUAWEI ?? "0",
        icon: PhoneAndroidIcon,
        color: "#06681B",
      },
    ];
  }, [result.data]);
  const totalLoginUser = useMemo(() => {
    let total = devices.reduce((accu, item) => {
      //console.log(accu, item);
      if (!isNaN(item.value)) {
        accu += Number.parseInt(item.value);
      }
      return accu;
    }, 0);
    //console.log(total);
    return total;
  }, [devices]);
  //console.log(totalLoginUser);
  return (
    <>
      <Card className={classes.dashboardCard} {...props}>
        <CardHeader
          title="Traffic By Device"
          style={{ color: "var(--theme-color1)" }}
        />
        <Divider />
        <CardContent style={{ padding: "10px", height: "44vh" }}>
          <Box
            sx={{
              height: "60%",
              position: "relative",
              margin: "auto",
              display: "grid",
              width: "80%",
            }}
          >
            <Doughnut data={data} options={options} />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 1,
              flexWrap: "wrap",
              overflow: "auto",
            }}
          >
            {devices.map(({ color, icon: Icon, title, value }) => (
              <Box
                key={title}
                sx={{
                  p: 1,
                  textAlign: "center",
                }}
              >
                <Icon color="action" />
                <Typography color="textPrimary" variant="body1">
                  {title}
                </Typography>
                <Typography style={{ color }} variant="h6">
                  {getPerData(value, totalLoginUser)}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
            pt: 2,
          }}
          style={{ paddingTop: "5px" }}
        >
          {result.isError || result.isLoading || result.isFetching ? (
            <>
              {result.isError ? (
                <>
                  <Tooltip title={"Error"}>
                    <span>
                      <FontAwesomeIcon
                        icon={["fas", "circle-exclamation"]}
                        color={"red"}
                        style={{ cursor: "pointer" }}
                        onClick={showErrorData}
                      />
                    </span>
                  </Tooltip>
                  <Tooltip title={"Refetch"}>
                    <span>
                      <FontAwesomeIcon
                        icon={["fas", "rotate-right"]}
                        color={"var(--theme-color1)"}
                        style={{ cursor: "pointer", marginLeft: "3px" }}
                        onClick={() => {
                          result.refetch();
                        }}
                      />
                    </span>
                  </Tooltip>
                </>
              ) : (
                <Tooltip title={"Feching..."}>
                  <span>
                    <FontAwesomeIcon
                      icon={["fas", "spinner"]}
                      className={"rotating"}
                      style={{
                        margin: "0px 12px 0px 0px",
                        // paddingBottom: "6px",
                      }}
                    />
                  </span>
                </Tooltip>
              )}
            </>
          ) : (
            <>
              <Tooltip title={"Refresh"}>
                <span>
                  <FontAwesomeIcon
                    icon={["fas", "rotate-right"]}
                    color={"var(--theme-color1)"}
                    style={{
                      cursor: "pointer",
                      margin: "0px 13px 0px 0px",
                      paddingBottom: "6px",
                    }}
                    onClick={() => {
                      result.refetch();
                    }}
                  />
                </span>
              </Tooltip>
            </>
          )}
        </Box>
      </Card>
      {result.isError ? (
        <Dialog
          open={showMore}
          fullWidth={false}
          onKeyUp={(event) => {
            if (event.key === "Escape") {
              setShowMore(false);
            }
          }}
        >
          <DialogTitle>Error Details</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {result.error?.error_msg ?? "Error"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <GradientButton onClick={() => setShowMore(false)}>
              OK
            </GradientButton>
          </DialogActions>
        </Dialog>
      ) : null}
    </>
  );
};
