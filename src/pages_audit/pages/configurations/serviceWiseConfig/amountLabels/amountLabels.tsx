import { useRef, useState, useMemo } from "react";
import AppBar from "@mui/material/AppBar";
import { makeStyles } from "@mui/styles";
import GridWrapper from "components/dataTableStatic";
import { GridMetaDataType } from "components/dataTable/types";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Alert } from "components/common/alert";
import { LoaderPaperComponent } from "components/common/loaderPaper";
import { CreateDetailsRequestData, utilFunction } from "components/utils";
import { useSnackbar } from "notistack";
import { useMutation } from "react-query";
import * as API from "../api";
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

const initialData = {
  AMOUNT: "",
  _isNewRow: true,
};

export const AmountLabelDetailsUpdate = ({
  metadata,
  ClosedEventCall,
  data: initConfigData,
  children,
  isLoading = false,
  isError = false,
  ErrorMessage = "",
  actions = [],
  mode = "view",
  isEditableForm = false,
  // refID = {},
  transactionID,
}) => {
  const [girdData, setGridData] = useState<any>(initConfigData);
  const classes = useDialogStyles();
  const myGridRef = useRef<any>(null);
  const { enqueueSnackbar } = useSnackbar();
  const [serverError, setServerError] = useState("");
  const handelCloseEvent = () => {
    ClosedEventCall();
  };
  const [openAccept, setopenAccept] = useState(false);
  const isErrorFuncRef = useRef<any>(null);

  const mutation = useMutation(API.serviceAmountLableData, {
    onError: (error: any) => {
      let errorMsg = "Unknown Error occured";
      if (typeof error === "object") {
        errorMsg = error?.error_msg ?? errorMsg;
      }
      enqueueSnackbar(errorMsg, {
        variant: "error",
      });
      onActionCancel();
    },
    onSuccess: (data: any) => {
      enqueueSnackbar(data, {
        variant: "success",
      });
      setopenAccept(false);
      ClosedEventCall();
    },
  });

  const metaData = useMemo(() => {
    let myColumns = metadata.columns;
    if (mode === "view") {
      myColumns = metadata.columns.filter((one) => one.accessor !== "_hidden");
    }
    return { ...metadata, columns: myColumns };
  }, [mode, metadata]);
  const handelActionEvent = async (data) => {
    if (data.name === "Add") {
      let { hasError, data: dataold } = await myGridRef.current?.validate();
      if (hasError === true) {
        if (dataold) {
          setGridData(dataold);
        }
        //setGridData(dataold);
      } else {
        let TotalRowData = girdData.reduce((accu, item) => {
          if (Boolean(item._hidden)) {
            return accu;
          }
          return accu + 1;
        }, 0);
        if (TotalRowData >= 6) {
          enqueueSnackbar("Up to six rows are allowed to be added.", {
            variant: "warning",
          });
        } else {
          setGridData((old) => {
            if (!Array.isArray(old)) {
              return [
                {
                  ...initialData,
                  id: 1,
                  TRAN_CD: transactionID,
                  SR_CD: 1,
                  SR_NO: 1,
                },
              ];
            } else {
              let srCount = utilFunction.GetMaxCdForDetails(old, "SR_CD");
              const myNewRowObj = {
                ...initialData,
                id: srCount,
                TRAN_CD: transactionID,
                SR_CD: srCount,
                SR_NO: srCount,
              };
              return [...old, myNewRowObj];
            }
          });
        }
      }
    }
  };

  const onPopupYesAccept = (rows) => {
    mutation.mutate({
      ...isErrorFuncRef.current?.data,
    });
  };
  const onActionCancel = () => {
    setopenAccept(false);
  };

  const handleSubmit = async () => {
    let { hasError, data: dataold } = await myGridRef.current?.validate();
    if (hasError === true) {
      if (dataold) {
        setGridData(dataold);
      }
    } else {
      let result = myGridRef?.current?.cleanData?.();
      if (!Array.isArray(result)) {
        result = [result];
      }
      let finalResult = result.filter(
        (one) => !(Boolean(one?._hidden) && Boolean(one?._isNewRow))
      );
      if (finalResult.length === 0) {
      } else {
        finalResult = CreateDetailsRequestData(finalResult);
        if (
          finalResult?.isDeleteRow?.length === 0 &&
          finalResult?.isNewRow?.length === 0 &&
          finalResult?.isUpdatedRow?.length === 0
        ) {
          ClosedEventCall();
        } else {
          let reqData = {
            _isNewRow: false,
            _UPDATEDCOLUMNS: [],
            _OLDROWVALUE: {},
            DETAILS_DATA: finalResult,
          };
          isErrorFuncRef.current = {
            data: reqData,
            setServerError,
          };

          setopenAccept(true);
        }
      }
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      {isError ? (
        <Alert
          severity="error"
          errorMsg={ErrorMessage}
          errorDetail={""}
          color="error"
        />
      ) : Boolean(serverError) ? (
        <Alert errorMsg={serverError} errorDetail="" severity="error" />
      ) : null}

      {!Boolean(children) ? (
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
              Ok
            </Typography>
            <Button onClick={handelCloseEvent} color="primary">
              Close
            </Button>
          </Toolbar>
        </AppBar>
      ) : typeof children === "function" ? (
        children({
          handelCloseEvent,
          handleSubmit,
          classes,
          handelActionEvent,
        })
      ) : (
        children
      )}
      {isLoading ? (
        <LoaderPaperComponent />
      ) : (
        <>
          <GridWrapper
            key={"customerDetailsGrid"}
            finalMetaData={metaData as GridMetaDataType}
            data={girdData}
            setData={setGridData}
            loading={isEditableForm ? mode === "view" : isLoading}
            actions={actions}
            setAction={handelActionEvent}
            refetchData={null}
            ref={myGridRef}
            hideFooter={true}
          />

          {openAccept ? (
            <PopupMessageAPIWrapper
              MessageTitle="Confirmation"
              Message="Do You want to accept this Request?"
              onActionYes={(rowVal) => onPopupYesAccept(rowVal)}
              onActionNo={() => onActionCancel()}
              rows={isErrorFuncRef.current?.data}
              open={openAccept}
              loading={mutation.isLoading}
            />
          ) : null}
        </>
      )}
    </div>
  );
};
