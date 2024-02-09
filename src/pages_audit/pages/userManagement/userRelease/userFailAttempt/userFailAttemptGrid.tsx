import { ClearCacheContext, queryClient } from "cache";
import { useQuery } from "react-query";
import { useEffect, useContext } from "react";
import { Alert } from "components/common/alert";
import GridWrapper from "components/dataTableStatic";
import { GridMetaDataType } from "components/dataTable/types";
import * as API from "../api";
import { Transition } from "pages_audit/common";
import { Dialog, Toolbar, AppBar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { UserFailAttemptGridMetaData } from "./gridMetadataBlckDtl";
import { LoaderPaperComponent } from "components/common/loaderPaper";
import Button from "components/styledComponent/button/button";

export const useDialogStyles = makeStyles({
  topScrollPaper: {
    alignItems: "center",
  },
  topPaperScrollBody: {
    verticalAlign: "top",
  },
  title: {
    flex: "1 1 100%",
    color: "var(--white)",
    letterSpacing: "1px",
    fontSize: "1.5rem",
  },
});

export const UserFailAttempt = ({ isOpen, onCloseDialog, userName }) => {
  const classes = useDialogStyles();
  const { getEntries } = useContext(ClearCacheContext);

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery<
    any,
    any
  >(["getUsrBlckDtlData", userName], () =>
    API.getUsrBlckDtlData({
      userName,
    })
  );

  useEffect(() => {
    return () => {
      queryClient.removeQueries(["getUsrBlckDtlData"]);
    };
  }, [getEntries]);

  return (
    <Dialog
      open={isOpen}
      //@ts-ignore
      TransitionComponent={Transition}
      PaperProps={{
        style: {
          width: "100%",
        },
      }}
      maxWidth="md"
      classes={{
        scrollPaper: classes.topScrollPaper,
        paperScrollBody: classes.topPaperScrollBody,
      }}
    >
      <div style={{ padding: "10px" }}>
        {isLoading || isFetching ? (
          <LoaderPaperComponent />
        ) : isError ? (
          <Alert
            severity="error"
            errorMsg={error?.error_msg ?? "Error"}
            errorDetail={error?.error_detail ?? ""}
            color="error"
          />
        ) : null}
        <AppBar
          position="relative"
          color="secondary"
          style={{ marginBottom: "10px" }}
        >
          <Toolbar variant="dense">
            <Typography
              className={classes.title}
              color="inherit"
              variant={"h6"}
              component="div"
            >
              List of Failed Login Attempts
            </Typography>

            <Button onClick={onCloseDialog} color="primary">
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <GridWrapper
          key={`UserFailAttemptGrid`}
          finalMetaData={UserFailAttemptGridMetaData as GridMetaDataType}
          data={data ?? []}
          setData={() => null}
          loading={isLoading || isFetching}
          refetchData={() => refetch()}
          hideHeader={true}
        />
      </div>
    </Dialog>
  );
};
