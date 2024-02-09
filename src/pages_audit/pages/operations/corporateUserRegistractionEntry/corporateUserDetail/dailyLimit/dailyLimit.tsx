import { AppBar, Button, Dialog, Toolbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Transition } from "pages_audit/common";
import { Alert } from "components/common/alert";
import { LoaderPaperComponent } from "components/common/loaderPaper";
import { useContext, useEffect, useRef, useState } from "react";
import GridWrapper, { GridMetaDataType } from "components/dataTableStatic";
import { DailyLimitGridMetaData } from "./gridMetadata";
import { useMutation, useQuery } from "react-query";
import * as API from "../../api";
import { ClearCacheContext, queryClient } from "cache";
import { useSnackbar } from "notistack";
import { CreateDetailsRequestData, utilFunction } from "components/utils";
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
export const DailyLimitGrid = ({ isOpen, formMode, onClose, reqDataRef }) => {
  const classes = useDialogStyles();
  const [girdData, setGridData] = useState<any>([]);
  const myGridRef = useRef<any>(null);
  const { getEntries } = useContext(ClearCacheContext);
  const { enqueueSnackbar } = useSnackbar();
  const { data, isLoading, isFetching, isError, error, refetch } = useQuery<
    any,
    any
  >(["getDailyLimitGridData"], () => API.getDailyLimitGridData());

  useEffect(() => {
    return () => {
      queryClient.removeQueries(["getDailyLimitGridData"]);
    };
  }, [getEntries]);
  useEffect(() => {
    if (Array.isArray(data)) {
      setGridData(data);
    } else {
      setGridData([]);
    }
  }, [data]);
  const AddNewRow = async () => {
    let { hasError, data: dataold } = await myGridRef.current?.validate();
    if (hasError === true) {
      if (dataold) {
        setGridData(dataold);
      }
    } else {
      // let TotalRowData = girdData.reduce((accu, item) => {
      //   if (Boolean(item._hidden)) {
      //     return accu;
      //   }
      //   return accu + 1;
      // }, 0);
      setGridData((old) => {
        if (!Array.isArray(old)) {
          return [
            {
              EFFECTIVE_DATE: new Date(),
              LIMIT_AMT: "",
              id: 1,
              LINE_ID: 1,
              _isNewRow: true,
            },
          ];
        } else {
          let srCount = utilFunction.GetMaxCdForDetails(old, "LINE_ID");
          const myNewRowObj = {
            EFFECTIVE_DATE: new Date(),
            LIMIT_AMT: "",
            id: srCount,
            LINE_ID: String(srCount),
            _isNewRow: true,
          };
          return [...old, myNewRowObj];
        }
      });
    }
  };
  const onSaveRecord = async () => {
    // let { hasError, data: dataold } = await myGridRef.current?.validate();
    // if (hasError === true) {
    //   if (dataold) {
    //     setGridData(dataold);
    //   }
    // } else {
    //   let result = myGridRef?.current?.cleanData?.();
    //   if (!Array.isArray(result)) {
    //     result = [result];
    //   }
    //   let finalResult = result.filter(
    //     (one) => !(Boolean(one?._hidden) && Boolean(one?._isNewRow))
    //   );
    //   if (finalResult.length === 0) {
    //     onClose();
    //   } else {
    //     finalResult = CreateDetailsRequestData(finalResult);
    //     if (
    //       finalResult?.isDeleteRow?.length === 0 &&
    //       finalResult?.isNewRow?.length === 0 &&
    //       finalResult?.isUpdatedRow?.length === 0
    //     ) {
    //       onClose();
    //     } else {
    //       let reqData = {
    //         _isNewRow: false,
    //         _UPDATEDCOLUMNS: [],
    //         _OLDROWVALUE: {},
    //         ...reqDataRef.current,
    //         DETAILS_DATA: finalResult,
    //       };
    //     }
    //   }
    // }
    onClose();
  };
  return (
    <Dialog
      open={isOpen}
      //@ts-ignore
      TransitionComponent={Transition}
      PaperProps={{
        style: {
          width: "50%",
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
              Effective Daily Limit
            </Typography>
            {isLoading || isFetching || isError ? null : (
              <>
                <Button onClick={AddNewRow} color="primary">
                  Add
                </Button>
                <Button
                  onClick={onSaveRecord}
                  color="primary"
                  // endIcon={
                  //   mutation.isLoading ? <CircularProgress size={20} /> : null
                  // }
                >
                  Save
                </Button>
              </>
            )}
            <Button onClick={onClose} color="primary">
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <GridWrapper
          key={"operatorMasterSpecialAmount"}
          finalMetaData={DailyLimitGridMetaData as GridMetaDataType}
          data={formMode === "add" ? [] : girdData}
          setData={setGridData}
          loading={isLoading || isFetching || isError}
          actions={[]}
          setAction={() => {}}
          refetchData={refetch}
          ref={myGridRef}
        />
      </div>
    </Dialog>
  );
};
