import { ClearCacheContext, queryClient } from "cache";
import { useQuery } from "react-query";
import { useEffect, useContext, useMemo } from "react";
import { GridMetaDataType } from "components/dataTable/types";
import { ActionTypes } from "components/dataTable";
import * as API from "../api";
import { AmountLabelsGridMetaData } from "./gridMetadata";
import { useDialogStyles } from "pages_audit/common/dialogStyles";
import { AppBar, Button, Dialog, Toolbar, Typography } from "@mui/material";
import { Transition } from "pages_audit/common/transition";
import { GradientButton } from "components/styledComponent/button";
import { AmountLabelDetailsUpdate } from "./amountLabels";
//import { ReleaseUsersAPIWrapper } from "../releaseUsers";
const actions: ActionTypes[] = [
  {
    actionName: "view-details",
    actionLabel: "Edit Detail",
    multiple: false,
    rowDoubleClick: false,
  },
];

const transformData = (data: any) => {
  if (Array.isArray(data)) {
    return data.map((one, index) => ({
      ...one,
      id: index,
      _hidden: false,
      _isNewRow: false,
    }));
  } else {
    return data;
  }
};

export const ServiceAmountLabels = ({ closeDialog, rowData }) => {
  const { getEntries } = useContext(ClearCacheContext);

  const { data, isLoading, isFetching, isError, error } = useQuery<any, any>(
    ["getAmountLabelsGridData"],
    () => API.getAmountLabelsGridData(rowData?.[0]?.data?.TRAN_CD)
  );
  useEffect(() => {
    return () => {
      let entries = getEntries() as any[];
      if (Array.isArray(entries) && entries.length > 0) {
        entries.forEach((one) => {
          queryClient.removeQueries(one);
        });
      }
      queryClient.removeQueries(["getAmountLabelsGridData"]);
    };
  }, [getEntries]);

  const GidData = useMemo(() => transformData(data), [data]);
  return (
    <>
      <div style={{ padding: "9px" }}>
        {isLoading || isFetching ? (
          <AmountLabelDetailsUpdate
            key={"Loading-CustomerLimitDetailsUpdate"}
            metadata={AmountLabelsGridMetaData as GridMetaDataType}
            ClosedEventCall={closeDialog}
            data={[]}
            isEditableForm={true}
            isLoading={isLoading}
            transactionID={rowData?.[0]?.data?.TRAN_CD}
            ErrorMessage={error?.error_msg ?? "Error"}
          >
            {({ handelCloseEvent, handleSubmit, classes }) => (
              <>
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
                      Amount Label Mapping
                    </Typography>
                    <Button onClick={handelCloseEvent} color="primary">
                      Close
                    </Button>
                  </Toolbar>
                </AppBar>
              </>
            )}
          </AmountLabelDetailsUpdate>
        ) : isError ? (
          <AmountLabelDetailsUpdate
            key={"Error-CustomerLimitDetailsUpdate"}
            metadata={AmountLabelsGridMetaData as GridMetaDataType}
            ClosedEventCall={closeDialog}
            data={[]}
            isEditableForm={true}
            isError={isError}
            transactionID={rowData?.[0]?.data?.TRAN_CD}
            ErrorMessage={error?.error_msg ?? "Error"}
          >
            {({ handelCloseEvent, handleSubmit, classes }) => (
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
                    Amount Label Mapping
                  </Typography>
                  {/* <GradientButton onClick={refetch()} color="primary">
                    Retry
                  </GradientButton> */}
                  <Button onClick={handelCloseEvent} color="primary">
                    Close
                  </Button>
                </Toolbar>
              </AppBar>
            )}
          </AmountLabelDetailsUpdate>
        ) : (
          <AmountLabelDetailsUpdate
            key={"edit"}
            metadata={AmountLabelsGridMetaData as GridMetaDataType}
            ClosedEventCall={closeDialog}
            data={GidData}
            // actions={actions}
            isEditableForm={true}
            mode={"edit"}
            transactionID={rowData?.[0]?.data?.TRAN_CD}
          >
            {({
              handelCloseEvent,
              handleSubmit,
              classes,
              handelActionEvent,
            }) => (
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
                    Amount Label Mapping
                  </Typography>
                  <Button
                    onClick={() => {
                      handelActionEvent({ name: "Add" });
                    }}
                    color="primary"
                  >
                    Add
                  </Button>
                  <Button onClick={handleSubmit} color="primary">
                    Save
                  </Button>
                  <Button onClick={closeDialog} color="primary">
                    Close
                  </Button>
                </Toolbar>
              </AppBar>
            )}
          </AmountLabelDetailsUpdate>
        )}
      </div>
    </>
  );
};

export const AmountLabelsGridWrapper = ({ open, closeDialog, rowData }) => {
  const classes = useDialogStyles();
  return (
    <>
      <Dialog
        open={open}
        //@ts-ignore
        TransitionComponent={Transition}
        // PaperProps={{
        //   style: {
        //     width: "80%",
        //     minHeight: "60vh",
        //     height: "70vh",
        //   },
        // }}
        // maxWidth=""
        classes={{
          scrollPaper: classes.topScrollPaper,
          paperScrollBody: classes.topPaperScrollBody,
        }}
      >
        <ServiceAmountLabels closeDialog={closeDialog} rowData={rowData} />
      </Dialog>
    </>
  );
};
