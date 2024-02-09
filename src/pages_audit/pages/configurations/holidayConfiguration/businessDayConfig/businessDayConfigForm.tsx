import {
  FC,
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";
import { queryClient } from "cache";
import { useMutation, useQueries } from "react-query";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import Dialog from "@mui/material/Dialog";
import { Alert } from "components/common/alert";
import * as API from "../api";
import { LoaderPaperComponent } from "components/common/loaderPaper";
import { MasterDetailsForm } from "components/formcomponent";
import { BusinessDayConfigMetadata } from "./metaData";
import { PopupMessageAPIWrapper } from "components/custom/popupMessage";
import { useSnackbar } from "notistack";
import { AuthContext } from "pages_audit/auth";
import { format } from "date-fns";

interface editMasterDataType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
  SetLoadingOWN?: any;
}

const editMasterFormDataFnWrapper =
  (editMasterData) =>
  async ({ data }: editMasterDataType) => {
    return editMasterData(data);
  };

const BusinessDayConfigForm: FC<{
  isDataChangedRef: any;
  closeDialog?: any;
  defaultView?: any;
  transactionID: number;
  compCD: number;
  data: any;
}> = ({
  isDataChangedRef,
  closeDialog,
  defaultView = "view",
  transactionID,
  compCD,
  data: reqData,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const { authState } = useContext(AuthContext);
  const [formMode, setFormMode] = useState(defaultView);
  const mysubdtlRef = useRef<any>({});
  const [openAccept, setopenAccept] = useState(false);
  const isErrorFuncRef = useRef<any>(null);
  const moveToViewMode = useCallback(() => setFormMode("view"), [setFormMode]);
  const moveToEditMode = useCallback(() => setFormMode("edit"), [setFormMode]);
  // const moveToNewMode = useCallback(() => setFormMode("new"), [setFormMode]);
  const myRef = useRef<any>(null);

  const result = useQueries([
    {
      queryKey: ["getBusinessDayDetailGridData", transactionID, compCD],
      queryFn: () => API.getBusinessDayDetailGridData(transactionID, compCD),
    },
  ]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries([
        "getBusinessDayDetailGridData",
        transactionID,
        compCD,
      ]);
    };
  }, [transactionID, compCD]);

  const mutation = useMutation(
    editMasterFormDataFnWrapper(API.updBusinessDayConfig),
    {
      onError: (error: any) => {
        let errorMsg = "Unknown Error occured";
        if (typeof error === "object") {
          errorMsg = error?.error_msg ?? errorMsg;
        }
        if (isErrorFuncRef.current == null) {
          enqueueSnackbar(errorMsg, {
            variant: "error",
          });
        } else {
          isErrorFuncRef.current?.endSubmit(
            false,
            errorMsg,
            error?.error_detail ?? ""
          );
        }
        onActionCancel();
      },
      onSuccess: (data) => {
        enqueueSnackbar(data, {
          variant: "success",
        });

        isDataChangedRef.current = true;
        closeDialog();
      },
    }
  );

  const onSubmitHandler = ({
    data,
    displayData,
    endSubmit,
    setFieldErrors,
  }) => {
    //@ts-ignore
    endSubmit(true);
    if (
      data?._isNewRow === false &&
      data?._UPDATEDCOLUMNS?.length === 0 &&
      data?.DETAILS_DATA?.isNewRow?.length === 0 &&
      data?.DETAILS_DATA?.isUpdatedRow?.length === 0 &&
      data?.DETAILS_DATA?.isNewRow?.length === 0
    ) {
      closeDialog();
    } else {
      isErrorFuncRef.current = {
        data,
        displayData,
        endSubmit,
        setFieldErrors,
      };
      setopenAccept(true);
    }
  };

  const loading = result[0].isLoading || result[0].isFetching;
  let isError = result[0].isError;
  //@ts-ignore
  let errorMsg = `${result[0].error?.error_msg}`;
  errorMsg = Boolean(errorMsg.trim()) ? errorMsg : "Unknown error occured";

  //@ts-ignore
  let error_detail = `${result[0]?.error?.error_detail}`;

  const onPopupYesAccept = (rows) => {
    mutation.mutate({
      data: rows,
    });
  };
  const onActionCancel = () => {
    setopenAccept(false);
  };

  const renderResult = loading ? (
    <div style={{ margin: "2rem" }}>
      <LoaderPaperComponent />
      {typeof closeDialog === "function" ? (
        <div style={{ position: "absolute", right: 0, top: 0 }}>
          <IconButton onClick={closeDialog}>
            <HighlightOffOutlinedIcon />
          </IconButton>
        </div>
      ) : null}
    </div>
  ) : isError === true ? (
    <>
      <div style={{ margin: "1.2rem" }}>
        <Alert
          severity="error"
          errorMsg={errorMsg}
          errorDetail={error_detail ?? ""}
        />
      </div>
      {typeof closeDialog === "function" ? (
        <div style={{ position: "absolute", right: 0, top: 0 }}>
          <IconButton onClick={closeDialog}>
            <HighlightOffOutlinedIcon />
          </IconButton>
        </div>
      ) : null}
    </>
  ) : formMode === "view" || formMode === "edit" ? (
    <>
      <MasterDetailsForm
        key={"BusinessDayConfig" + formMode}
        metaData={BusinessDayConfigMetadata}
        ref={myRef}
        initialData={{
          _isNewRow: false,
          ...reqData[0].data,
          DETAILS_DATA: result[0].data,
        }}
        displayMode={formMode}
        isLoading={formMode === "view" ? true : false}
        onSubmitData={onSubmitHandler}
        isNewRow={false}
        formStyle={{
          background: "white",
          height: "15vh",
          overflowY: "auto",
          overflowX: "hidden",
        }}
        containerstyle={{ padding: "10px" }}
      >
        {({ isSubmitting, handleSubmit }) => {
          return (
            <>
              {formMode === "view" ? (
                <>
                  <Button onClick={moveToEditMode} color={"primary"}>
                    Edit
                  </Button>
                  <Button onClick={closeDialog} color={"primary"}>
                    Close
                  </Button>
                </>
              ) : formMode === "edit" ? (
                <>
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    endIcon={
                      isSubmitting ? <CircularProgress size={20} /> : null
                    }
                    color={"primary"}
                  >
                    Save
                  </Button>
                  <Button
                    onClick={moveToViewMode}
                    disabled={isSubmitting}
                    color={"primary"}
                  >
                    Cancel
                  </Button>
                </>
              ) : null}
            </>
          );
        }}
      </MasterDetailsForm>
      {openAccept ? (
        <PopupMessageAPIWrapper
          MessageTitle="Confirmation"
          Message="Do You want to save this Request?"
          onActionYes={(rowVal) => onPopupYesAccept(rowVal)}
          onActionNo={() => onActionCancel()}
          rows={isErrorFuncRef.current?.data}
          open={openAccept}
          loading={mutation.isLoading}
        />
      ) : null}
    </>
  ) : null;

  return renderResult;
};

export const BusinessDayFormWrapper = ({
  isDataChangedRef,
  closeDialog,
  defaultView,
}) => {
  const { state: data }: any = useLocation();
  return (
    <Fragment>
      <Dialog
        open={true}
        PaperProps={{
          style: {
            width: "65%",
          },
        }}
        maxWidth="md"
      >
        <BusinessDayConfigForm
          transactionID={data?.[0]?.data?.TRAN_CD}
          compCD={data?.[0]?.data?.COMP_CD}
          isDataChangedRef={isDataChangedRef}
          closeDialog={closeDialog}
          data={data}
          defaultView={defaultView}
        />
      </Dialog>
    </Fragment>
  );
};
