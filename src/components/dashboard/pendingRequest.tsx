import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Tooltip,
} from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip as ChartTootTip,
  Legend,
  ChartArea,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { useStyles } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GradientButton } from "components/styledComponent/button";
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTootTip,
  Legend
);

export function PendingRequestChart() {
  const classes = useStyles();
  const [showMore, setShowMore] = useState(false);

  const result = {
    isError: false,
    error: {
      error_msg: "Test error",
    },
    isLoading: false,
    isFetching: false,
  };

  const options = {
    responsive: true,
    scales: {
      yAxes: {
        beginAtZero: true,
        ticks: {
          stepSize: 5,
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const labels = [
    "Label 1",
    "Label 2",
    "Label 3",
    "Label 4",
    "Label 4",
    "Label 5",
    "Label 6",
    "Label 7",
    "Label 8",
    "Label 9",
    "Label 10",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() => Math.floor(Math.random() * 250)),
        barThickness: 50,
        borderRadius: 4,
      },
    ],
  };

  return (
    <Card className={classes.dashboardCard} sx={{ mb: 2 }}>
      <CardHeader
        title="Pending Requests"
        style={{ color: "var(--theme-color1)" }}
      />
      <Divider />
      <CardContent>
        <Bar
          options={{
            ...options,
            elements: {
              bar: {
                backgroundColor: (context: any) => {
                  const gradient = context.chart.canvas
                    .getContext("2d")
                    .createLinearGradient(50, 0, 0, 400); // x0, y0, x1, y1
                  gradient.addColorStop(0, "#D7DDE8");
                  gradient.addColorStop(1, "#757F9A");
                  return gradient;
                },
              },
            },
          }}
          data={data}
          style={{ maxHeight: "400px" }}
        />
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          height: "32px",
          p: 1,
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
                      onClick={() => setShowMore(true)}
                    />
                  </span>
                </Tooltip>
              </>
            ) : (
              <>
                <Tooltip title={"Feching..."} style={{ paddingRight: "10px" }}>
                  <span>
                    <FontAwesomeIcon
                      icon={["fas", "spinner"]}
                      className={"rotating"}
                    />
                  </span>
                </Tooltip>
              </>
            )}
          </>
        ) : (
          <>
            <Tooltip title={"Refresh"}>
              <span>
                <FontAwesomeIcon
                  icon={["fas", "rotate-right"]}
                  color={"var(--theme-color1)"}
                  style={{ cursor: "pointer", margin: "0px 15px 0px 0px" }}
                  onClick={() => {
                    console.log("refresh");
                    // result.mutate({ type: optionValue });
                  }}
                />
              </span>
            </Tooltip>
          </>
        )}
      </Box>
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
    </Card>
  );
}
