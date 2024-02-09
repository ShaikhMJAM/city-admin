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
import { leavesMasterDetailsMetaData } from "./leavesMasterMetaData";
import { PopupMessageAPIWrapper } from "components/custom/popupMessage";
import { useSnackbar } from "notistack";
import { AuthContext } from "pages_audit/auth";
import { isValidDate } from "components/utils/utilFunctions/function";

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

const ViewEditLeavesMasterForm: FC<{
  isDataChangedRef: any;
  closeDialog?: any;
  defaultView?: any;
  readOnly?: boolean;
  transactionID: number;
  data: any;
}> = ({
  isDataChangedRef,
  closeDialog,
  defaultView = "view",
  readOnly = false,
  transactionID,
  data: reqData,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const { authState } = useContext(AuthContext);
  const [formMode, setFormMode] = useState(defaultView);
  const [openAccept, setopenAccept] = useState(false);
  const isErrorFuncRef = useRef<any>(null);
  const moveToViewMode = useCallback(() => setFormMode("view"), [setFormMode]);
  const moveToEditMode = useCallback(() => setFormMode("edit"), [setFormMode]);
  // const moveToNewMode = useCallback(() => setFormMode("new"), [setFormMode]);

  const myRef = useRef<any>(null);
  const mutation = useMutation(
    editMasterFormDataFnWrapper(API.leavessavedata()),
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

  function formatDateToDDMMYYYYHHMMSS(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  }

  const onSubmitHandler = ({ data, displayData, endSubmit, setFieldError }) => {
    //@ts-ignore
    endSubmit(true);

    if (formMode === "new") {
      data["ACTIVE"] = "Y";
    } else {
      data["ACTIVE"] = Boolean(data["ACTIVE"]) ? "Y" : "N";
    }

    if (data?._UPDATEDCOLUMNS.includes("ACTIVE")) {
      let deactiveDate = reqData?.[0]?.data?.DEACTIVE_DT ?? "";
      if (isValidDate(deactiveDate)) {
        deactiveDate = formatDateToDDMMYYYYHHMMSS(deactiveDate);
      }
      if (data?.ACTIVE === "N") {
        data["DEACTIVE_DT"] = new Date();

        data["_OLDROWVALUE"] = {
          ...data["_OLDROWVALUE"],
          DEACTIVE_DT: deactiveDate ?? "",
        };
        data["_UPDATEDCOLUMNS"] = [...data?._UPDATEDCOLUMNS, "DEACTIVE_DT"];
      } else {
        data["DEACTIVE_DT"] = "";
        data["_OLDROWVALUE"] = {
          ...data["_OLDROWVALUE"],
          DEACTIVE_DT: deactiveDate ?? "",
        };
        data["_UPDATEDCOLUMNS"] = [...data?._UPDATEDCOLUMNS, "DEACTIVE_DT"];
      }
    }

    data["_OLDROWVALUE"] = {
      ...data["_OLDROWVALUE"],
      ACTIVE: Boolean(data["_OLDROWVALUE"]?.ACTIVE) ? "Y" : "N",
    };

    data["COMP_CD"] = authState.companyID;
    isErrorFuncRef.current = { data, displayData, endSubmit, setFieldError };
    if (
      isErrorFuncRef.current?.data?._UPDATEDCOLUMNS.length === 0 &&
      isErrorFuncRef.current?.data?.DETAILS_DATA?.isUpdatedRow.length === 0 &&
      isErrorFuncRef.current?.data?.DETAILS_DATA?.isDeleteRow.length === 0 &&
      isErrorFuncRef.current?.data?.DETAILS_DATA?.isNewRow.length === 0
    ) {
      setFormMode("view");
    } else {
      setopenAccept(true);
    }
  };

  const result = useQueries([
    {
      queryKey: ["getDetailsLeavesGridData", transactionID],
      queryFn: () => API.getDetailsLeavesGridData(transactionID, formMode),
    },
  ]);
  useEffect(() => {
    return () => {
      queryClient.removeQueries(["getDetailsLeavesGridData", transactionID]);
    };
  }, [transactionID]);

  const loading = result[0].isLoading || result[0].isFetching;
  let isError = result[0].isError;
  //@ts-ignore
  let errorMsg = `${result[0].error?.error_msg}`;
  errorMsg = Boolean(errorMsg.trim()) ? errorMsg : "Unknown error occured";

  //@ts-ignore
  let error_detail = `${result[0]?.error?.error_detail}`;

  const AddNewRow = () => {
    myRef.current?.addNewRow(true);
  };

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
  ) : formMode === "new" ? (
    <>
      <MasterDetailsForm
        key={"leavesMaster"}
        metaData={leavesMasterDetailsMetaData}
        ref={myRef}
        initialData={{ _isNewRow: true, DETAILS_DATA: [] }}
        displayMode={"new"}
        onSubmitData={onSubmitHandler}
        isNewRow={true}
        formStyle={{
          background: "white",
          height: "15vh",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {({ isSubmitting, handleSubmit }) => {
          return (
            <>
              <Button
                onClick={AddNewRow}
                disabled={isSubmitting}
                color={"primary"}
              >
                Add Row
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                color={"primary"}
              >
                Save
              </Button>
              <Button
                onClick={closeDialog}
                disabled={isSubmitting}
                color={"primary"}
              >
                Cancel
              </Button>
            </>
          );
        }}
      </MasterDetailsForm>
      {openAccept ? (
        <PopupMessageAPIWrapper
          MessageTitle="Confirmation"
          Message="Do you want to save this Request?"
          onActionYes={(rowVal) => onPopupYesAccept(rowVal)}
          onActionNo={() => onActionCancel()}
          rows={isErrorFuncRef.current?.data}
          open={openAccept}
          loading={mutation.isLoading}
        />
      ) : null}
    </>
  ) : formMode === "view" ? (
    <MasterDetailsForm
      key={"leavesMaster" + formMode}
      metaData={leavesMasterDetailsMetaData}
      ref={myRef}
      initialData={{
        _isNewRow: false,
        ...reqData[0].data,
        DETAILS_DATA: result[0].data,
      }}
      displayMode={formMode}
      isLoading={true}
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
            <Button onClick={moveToEditMode} color={"primary"}>
              Edit
            </Button>
            <Button onClick={closeDialog} color={"primary"}>
              Close
            </Button>
          </>
        );
      }}
    </MasterDetailsForm>
  ) : formMode === "edit" ? (
    <>
      <MasterDetailsForm
        key={"leavesMaster" + formMode}
        metaData={leavesMasterDetailsMetaData}
        ref={myRef}
        initialData={{
          _isNewRow: false,
          ...reqData[0].data,
          DETAILS_DATA: result[0].data,
        }}
        displayMode={formMode}
        // isLoading={false}
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
              <Button
                onClick={AddNewRow}
                disabled={isSubmitting}
                color={"primary"}
              >
                Add Row
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
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
          );
        }}
      </MasterDetailsForm>
      {openAccept ? (
        <PopupMessageAPIWrapper
          MessageTitle="Confirmation"
          Message="Do you want to save this Request?"
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

export const ViewEditLeavesMasterWrapperForm = ({
  isDataChangedRef,
  closeDialog,
  defaultView,
}) => {
  const { state: data }: any = useLocation();
  return (
    <Fragment>
      <Dialog
        open={true}
        onClose={closeDialog}
        PaperProps={{
          style: {
            width: "65%",
            // minHeight: "60vh",
            //height: "100vh",
          },
        }}
        maxWidth="md"
      >
        <ViewEditLeavesMasterForm
          transactionID={data?.[0]?.data?.TRAN_CD}
          isDataChangedRef={isDataChangedRef}
          closeDialog={closeDialog}
          data={data}
          defaultView={defaultView}
        />
      </Dialog>
    </Fragment>
  );
};
