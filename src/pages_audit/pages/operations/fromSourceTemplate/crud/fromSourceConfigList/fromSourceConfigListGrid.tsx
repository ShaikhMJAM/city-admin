import { ClearCacheContext, queryClient } from "cache";
import { Alert } from "components/common/alert";
import GridWrapper, { GridMetaDataType } from "components/dataTableStatic";
import { useContext, useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import * as API from "../../api";
import { FromSourceConfigListGridMetaData } from "./gridMetadata";
import { useLocation, useNavigate } from "react-router-dom";
import { Transition } from "pages_audit/common";
import { AppBar, Button, Dialog, Toolbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { LoaderPaperComponent } from "components/common/loaderPaper";
import { useSnackbar } from "notistack";
import { PopupMessageAPIWrapper } from "components/custom/popupMessage";
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

export const FromSourceConfigListGridWrapper = ({ open, onClose }) => {
  const navigate = useNavigate();

  const [gridData, setGridData] = useState<any>([]);
  const myGridRef = useRef<any>(null);
  const { getEntries } = useContext(ClearCacheContext);
  const [isOpenSave, setIsOpenSave] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { state: rows }: any = useLocation();
  const classes = useDialogStyles();

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery<
    any,
    any
  >(
    [
      "getFromSourceConfigGridData",
      rows?.[0]?.data?.DB_COLUMN,
      rows?.[0]?.data?.TRAN_CD,
    ],
    () =>
      API.getFromSourceConfigGridData(
        rows?.[0]?.data?.DB_COLUMN,
        rows?.[0]?.data?.TRAN_CD
      )
  );
  useEffect(() => {
    return () => {
      queryClient.removeQueries([
        "getFromSourceConfigGridData",
        rows?.[0]?.data?.DB_COLUMN,
        rows?.[0]?.data?.TRAN_CD,
      ]);
    };
  }, [getEntries, rows?.[0]?.data?.DB_COLUMN, rows?.[0]?.data?.TRAN_CD]);

  const mutation = useMutation(API.fromSourceTemplatedata, {
    onError: (error: any) => {},
    onSuccess: (data) => {
      enqueueSnackbar(data, {
        variant: "success",
      });
      onClose();
    },
  });
  useEffect(() => {
    if (Array.isArray(data)) {
      setGridData(data);
    } else {
      setGridData([]);
    }
  }, [data]);

  const onActionCancel = () => {
    setIsOpenSave(false);
  };
  const onPopupYes = (rowsData) => {
    mutation.mutate({
      TEMPLATE_LIST: gridData.map((data) => {
        return {
          ...data,
          TEMPLATE_TRAN_CD: rows?.[0]?.data?.TRAN_CD ?? "",
          DB_COLUMN: rows?.[0]?.data?.DB_COLUMN ?? "",
        };
      }),
    });
  };

  const onSaveRecord = async () => {
    setIsOpenSave(true);
    // mutation.mutate({
    //   TEMPLATE_LIST: gridData.map((data) => {
    //     return {
    //       ...data,
    //       TEMPLATE_TRAN_CD: trancd ?? "",
    //       DB_COLUMN: dbcolumn ?? "",
    //     };
    //   }),

    // });
  };

  return (
    <Dialog
      open={open}
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
        ) : mutation.isError ? (
          <Alert
            severity="error"
            errorMsg={mutation.error?.error_msg ?? "Error"}
            errorDetail={mutation.error?.error_detail ?? ""}
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
              Set From Source Key Template Of {rows?.[0]?.data?.DB_COLUMN}
            </Typography>

            <Button
              onClick={onSaveRecord}
              color="primary"
              // disabled={mutation.isLoading}
              // endIcon={
              //   mutation.isLoading ? <CircularProgress size={20} /> : null
              // }
            >
              Save
            </Button>

            <Button
              onClick={onClose}
              color="primary"
              // disabled={mutation.isLoading}
            >
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <GridWrapper
          key={`fromSourceConfigListGrid`}
          finalMetaData={FromSourceConfigListGridMetaData as GridMetaDataType}
          data={gridData}
          setData={setGridData}
          loading={isLoading || isFetching || isError}
          refetchData={() => refetch()}
          ref={myGridRef}
        />
      </div>
      {isOpenSave ? (
        <PopupMessageAPIWrapper
          MessageTitle="Confirmation"
          Message="Do you want to save this Request?"
          onActionYes={(rowVal) => onPopupYes(rowVal)}
          onActionNo={() => onActionCancel()}
          rows={{}}
          open={isOpenSave}
          loading={mutation.isLoading}
        />
      ) : null}
    </Dialog>
  );
};
