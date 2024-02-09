import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { GradientButton } from "components/styledComponent/button";
import "pages_audit/sideBar/icons";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import * as API from "./api";
import "./style.css";
import { useStyles } from "./style";
import Tooltip from "@mui/material/Tooltip";
import CountUp from "react-countup";

export const DashboardBox = ({
  title = "",
  body = "",
  isfooterVisible = false,
  icon = "home",
  apiName = "",
  color = "",
}) => {
  const [showMore, setShowMore] = useState(false);
  let reqID = Math.floor(new Date().getTime() / 300000);
  const classes = useStyles();
  const result = useQuery(["getDynamicBoxData", apiName, reqID], () =>
    API.getDynamicBoxData(apiName)
  );

  const showErrorData = () => {
    setShowMore(true);
  };
  return (
    <>
      <Card sx={{ height: "100%" }} className={classes.card}>
        <CardContent style={{ height: "22%" }}>
          <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
            <Grid item xl={6} lg={3} sm={3} xs={12}>
              <Avatar
                className={classes.avtar}
                sx={{
                  backgroundColor: "error.main",
                  height: 50,
                  width: 50,
                  // top: "50px",
                }}
                style={{
                  backgroundColor: "var(--theme-color1)",
                  color: "var(--theme-color2)",
                }}
              >
                {/* <MoneyIcon /> */}
                {Boolean(icon) ? (
                  <FontAwesomeIcon
                    icon={["fas", icon]}
                    className={"zoom-in-out-box"}
                  />
                ) : null}
              </Avatar>
            </Grid>
            <Grid
              item
              xl={6}
              lg={9}
              sm={9}
              xs={12}
              style={{ height: "16vh", position: "relative" }}
            >
              <Typography
                color="secondary"
                gutterBottom
                variant="overline"
                className={classes.typographytext}
              >
                {`${title}`}
              </Typography>
              <Typography
                color="textPrimary"
                variant="h4"
                style={{
                  textAlign: "right",
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  // borderBottom: "1px solid #93242433",
                }}
              >
                {/* without counting animation */}
                {/* {`${new Intl.NumberFormat("en-IN").format(
                  result?.data?.[0]?.BOX_BODY ?? body
                )}`} */}

                {/* with counting animation */}
                <CountUp
                  end={result?.data?.[0]?.BOX_BODY ?? body}
                  useIndianSeparators
                  duration={3}
                />
              </Typography>
            </Grid>
          </Grid>
          <div
            style={{
              borderBottom: "1px solid #93242433",
              marginBottom: "5px",
            }}
          ></div>
          <Box
            sx={{
              pt: 2,
              display: "flex",
              alignItems: "center",
              height: "30px",
            }}
          >
            {isfooterVisible ? (
              <>
                {Boolean(result?.data?.[0]?.FOOTER_ICON) ? (
                  <FontAwesomeIcon
                    icon={["fas", result?.data?.[0]?.FOOTER_ICON ?? ""]}
                    color={result?.data?.[0]?.FOOTER_ICON_COLOR ?? ""}
                  />
                ) : null}{" "}
                {/* <ArrowDownwardIcon color="error" /> */}
                <Typography
                  sx={{
                    mr: 2,
                  }}
                  variant="body2"
                  style={{
                    paddingLeft: "3px",
                    // borderTop: "1px solid #93242433",
                    color: result?.data?.[0]?.FOOTER_ICON_COLOR ?? "",
                  }}
                >
                  {result?.data?.[0]?.FOOTER}
                </Typography>
                {/* <Typography
                  color="textSecondary"
                  variant="caption"
                ></Typography> */}
              </>
            ) : null}
            <div
              // className="rotating"
              style={{
                flex: "auto",
                textAlign: "right",
              }}
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
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          result.refetch();
                        }}
                      />
                    </span>
                  </Tooltip>
                </>
              )}
            </div>
          </Box>
        </CardContent>
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

// const CountingAnimation = ({ start, end, duration }) => {
//   const [count, setCount] = useState(start);

//   useEffect(() => {
//     let startTime;

//     const animateCount = (timestamp) => {
//       if (!startTime) startTime = timestamp;
//       const progress = timestamp - startTime;
//       const percentage = Math.min(progress / duration, 1);

//       setCount(Math.floor(start + percentage * (end - start)));

//       if (percentage < 1) {
//         requestAnimationFrame(animateCount);
//       }
//     };

//     const animationFrame = requestAnimationFrame(animateCount);

//     return () => cancelAnimationFrame(animationFrame);
//   }, [start, end, duration]);

//   return <span>{count}</span>;
// };
