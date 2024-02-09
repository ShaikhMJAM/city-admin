import { useRef, useEffect, useContext, useCallback } from "react";
import { Transition } from "pages_audit/common";
import { CustomerCardDetailsGridMetaData } from "./gridMetadata";
import GridWrapper from "components/dataTableStatic";
import { Alert } from "components/common/alert";
import { GridMetaDataType } from "components/dataTable/types";
import { ClearCacheContext, queryClient } from "cache";
import { useQuery } from "react-query";
import * as API from "../api";
import { AppBar, Dialog, Toolbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { useDialogStyles } from "components/detailPopupGridData";
import { GradientButton } from "components/styledComponent/button";
import { ActionTypes } from "components/dataTable";
const useHeaderStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    background: "var(--theme-color1)",
  },
  title: {
    flex: "1 1 100%",
    color: "var(--white)",
    letterSpacing: "1px",
    fontSize: "1.5rem",
  },
  refreshiconhover: {
    // "&:hover": {
    //   backgroundColor: "var(--theme-color2)",
    //   color: "var(--theme-color1)",
    // },
  },
}));

const actions: ActionTypes[] = [
  {
    actionName: "confirm",
    actionLabel: "Confirm",
    multiple: false,
    rowDoubleClick: false,
  },
];
export const CustomerCardDetailWrapper = ({
  open,
  closeDialog,
  clientID,
  onClickConfirm,
}) => {
  const myGridRef = useRef<any>(null);
  const { getEntries } = useContext(ClearCacheContext);
  const classes = useDialogStyles();
  const headerClasses = useHeaderStyles();

  const setCurrentAction = useCallback((data) => {
    onClickConfirm(data?.rows?.[0]?.data);
  }, []);

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery<
    any,
    any
  >(["getBillerFieldOptionsGridData", clientID], () =>
    API.getCustomerCardDetailThroughCB({
      clientID,
    })
  );

  useEffect(() => {
    return () => {
      queryClient.removeQueries(["getBillerFieldOptionsGridData", clientID]);
    };
  }, [getEntries]);

  return (
    <Dialog
      open={open}
      //@ts-ignore
      TransitionComponent={Transition}
      PaperProps={{
        style: {
          // width: "55%",
          //minHeight: "60vh",
          //height: "66.5vh",
        },
      }}
      maxWidth="lg"
      classes={{
        scrollPaper: classes.topScrollPaper,
        paperScrollBody: classes.topPaperScrollBody,
      }}
    >
      <div style={{ padding: "9px" }}>
        {isError && (
          <Alert
            severity="error"
            errorMsg={error?.error_msg ?? "Something went to wrong.."}
            errorDetail={error?.error_detail}
            color="error"
          />
        )}
        <AppBar
          position="relative"
          color="secondary"
          style={{ marginBottom: "5px" }}
        >
          <Toolbar className={headerClasses.root} variant={"dense"}>
            <Typography
              className={headerClasses.title}
              color="inherit"
              variant={"h6"}
              component="div"
            >
              Customer Card Details
            </Typography>
            <GradientButton onClick={closeDialog}>Close</GradientButton>
          </Toolbar>
        </AppBar>

        <GridWrapper
          key={`CustomerCardDetails`}
          finalMetaData={CustomerCardDetailsGridMetaData as GridMetaDataType}
          data={data?.[0]?.CARD_DTL ?? []}
          setData={() => null}
          actions={actions}
          setAction={setCurrentAction}
          loading={isLoading || isFetching}
          refetchData={() => refetch()}
          ref={myGridRef}
        />
      </div>
    </Dialog>
  );
};
