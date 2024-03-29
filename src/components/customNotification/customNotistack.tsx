import { useState, forwardRef, useCallback, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import { useSnackbar, SnackbarContent, CustomContentProps } from "notistack";
import Collapse from "@mui/material/Collapse";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { LinearProgress, Stack } from "@mui/material";
import { useWorkerContext } from "pages_audit/pages/reports/context/exportWorkerContext";
import { WORKER_STATUS } from "@koale/useworker";
import CircularProgress from "@mui/material/CircularProgress";

const useStyles = makeStyles(() => ({
  root: {
    "@media (min-width:600px)": {
      minWidth: "344px !important",
    },
  },
  card: {
    width: "100%",
  },
  typography: {
    color: "var(--theme-color1)",
  },
  actionRoot: {
    padding: "8px 8px 8px 16px",
    justifyContent: "space-between",
  },
  icons: {
    marginLeft: "auto",
  },
  expand: {
    padding: "8px 8px",
    transform: "rotate(0deg)",
    color: "var(--theme-color1)",
    transition: "all .2s",
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  paper: {
    backgroundColor: "#fff",
    padding: 16,

    "& span": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: ".5rem",
    },
  },
  checkIcon: {
    fontSize: 20,
    paddingRight: 4,
  },
  button: {
    padding: 0,
    textTransform: "none",
  },
}));

export const CustomSnackbarContent = forwardRef<
  HTMLDivElement,
  CustomContentProps
>(({ id, ...props }, ref) => {
  const { status, workerQueue, setWorkerQueue } = useWorkerContext();
  const classes = useStyles();
  const { closeSnackbar } = useSnackbar();
  const [expanded, setExpanded] = useState(true);

  const handleExpandClick = useCallback(() => {
    setExpanded((oldExpanded) => !oldExpanded);
  }, []);

  const handleDismiss = useCallback(() => {
    // setWorkerQueue([]);
    closeSnackbar(id);
  }, [id, closeSnackbar]);

  useEffect(() => {
    const isRunning = workerQueue.length > 0;
    if (!isRunning) {
      handleDismiss();
    }
  }, [workerQueue]);

  return (
    <SnackbarContent ref={ref} className={classes.root}>
      <Card
        className={classes.card}
        style={{ backgroundColor: "var(--theme-color2)" }}
      >
        <CardActions classes={{ root: classes.actionRoot }}>
          <Typography variant="h6" className={classes.typography}>
            <ImportExportIcon />
            &nbsp;{props.message}
          </Typography>
          <div className={classes.icons}>
            <IconButton
              aria-label="Show more"
              size="small"
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
            >
              <ExpandMoreIcon />
            </IconButton>
            <IconButton
              size="small"
              className={classes.expand}
              onClick={handleDismiss}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        </CardActions>
        {status.excelStatus === WORKER_STATUS.RUNNING ||
        status.pdfStatus === WORKER_STATUS.RUNNING ||
        status.csvStatus === WORKER_STATUS.RUNNING ||
        status.textStatus === WORKER_STATUS.RUNNING ||
        status.xmlStatus === WORKER_STATUS.RUNNING ||
        status.htmlStatus === WORKER_STATUS.RUNNING ? (
          <LinearProgress color="secondary" />
        ) : null}
        <Collapse
          style={{ maxHeight: "124px", overflowY: "auto" }}
          in={expanded}
          timeout="auto"
          unmountOnExit
        >
          <Paper className={classes.paper}>
            <Stack
              gap={1}
              divider={
                <div
                  style={{
                    height: "1px",
                    width: "100%",
                    background: "#e7e7e7",
                  }}
                />
              }
            >
              {workerQueue.map((queue) => (
                <Typography
                  gutterBottom
                  variant="body2"
                  style={{ display: "block" }}
                >
                  {!queue.isCompleted ? (
                    <span style={{ color: "#aaa" }}>
                      {queue.title}...
                      <CircularProgress size={16} color="secondary" />
                    </span>
                  ) : (
                    <span>
                      {queue.title}
                      <CheckCircleIcon fontSize="small" color="success" />
                    </span>
                  )}
                </Typography>
              ))}
            </Stack>
          </Paper>
        </Collapse>
      </Card>
    </SnackbarContent>
  );
});
