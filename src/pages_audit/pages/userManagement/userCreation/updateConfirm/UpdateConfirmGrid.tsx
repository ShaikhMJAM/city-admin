import { ClearCacheContext, queryClient } from "cache";
import { useQuery } from "react-query";
import { useEffect, useContext, useRef } from "react";
import * as API from "../api";
import { UpdateGridMetaData } from "./gridMetadata";
import { useDialogStyles } from "pages_audit/common/dialogStyles";
import { AppBar, Dialog, Toolbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { Transition } from "pages_audit/common/transition";
import { GradientButton } from "components/styledComponent/button";
import { GridWrapper } from "components/dataTableStatic/gridWrapper";

//import { ReleaseUsersAPIWrapper } from "../releaseUsers";
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
export const UpdateConfirm = ({ closeDialog, rowData }) => {
  const myGridRef = useRef<any>(null);
  const { getEntries } = useContext(ClearCacheContext);
  const headerClasses = useHeaderStyles();

  const { data, isLoading, isFetching, refetch } = useQuery<any, any>(
    ["getUpdateConfirmGridData"],
    () => API.getUpdateConfirmGridData(rowData?.USER_NAME)
  );
  useEffect(() => {
    return () => {
      let entries = getEntries() as any[];
      if (Array.isArray(entries) && entries.length > 0) {
        entries.forEach((one) => {
          queryClient.removeQueries(one);
        });
      }
      queryClient.removeQueries(["getUpdateConfirmGridData"]);
    };
  }, [getEntries]);

  return (
    <>
      <div style={{ padding: "9px" }}>
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
              Confirmation Column Details
            </Typography>
            <GradientButton onClick={closeDialog}>Close</GradientButton>
          </Toolbar>
        </AppBar>
        <GridWrapper
          key={`UserUpdate`}
          finalMetaData={UpdateGridMetaData}
          data={data ?? []}
          setData={() => null}
          loading={isLoading || isFetching}
          actions={[]}
          setAction={[]}
          refetchData={() => refetch()}
          ref={myGridRef}
        />
      </div>
    </>
  );
};

export const UpdateConfirmGridWrapper = ({ open, closeDialog, rowData }) => {
  const classes = useDialogStyles();
  return (
    <>
      <Dialog
        open={open}
        //@ts-ignore
        TransitionComponent={Transition}
        PaperProps={{
          style: {
            width: "76%",
          },
        }}
        maxWidth={"lg"}
        classes={{
          scrollPaper: classes.topScrollPaper,
          paperScrollBody: classes.topPaperScrollBody,
        }}
      >
        <UpdateConfirm closeDialog={closeDialog} rowData={rowData} />
      </Dialog>
    </>
  );
};
