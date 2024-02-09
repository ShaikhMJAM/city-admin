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
import { peoductNameMetaData } from "./productNameMetaData";
import { PopupMessageAPIWrapper } from "components/custom/popupMessage";
import { useSnackbar } from "notistack";
import { AuthContext } from "pages_audit/auth";
import { utilFunction } from "components/utils";

interface editProductDataType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
  SetLoadingOWN?: any;
}

const editProductDataFnWrapper =
  (editProductData) =>
  async ({ data }: editProductDataType) => {
    return editProductData(data);
  };

const ViewEditProductDisplayForm: FC<{
  isDataChangedRef: any;
  closeDialog?: any;
  defaultView?: any;
  readOnly?: boolean;
  transactionID: number;
  companyID: string;
  lineID: string;
  srCode: string;
  data: any;
  // formView:string;
}> = ({
  isDataChangedRef,
  closeDialog,
  defaultView = "view",
  readOnly = false,
  transactionID,
  companyID,
  lineID,
  srCode,
  data: reqData,
  // formView,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const { authState } = useContext(AuthContext);
  const [formMode, setFormMode] = useState(defaultView);
  const [openAccept, setopenAccept] = useState(false);
  const isErrorFuncRef = useRef<any>(null);
  const moveToViewMode = useCallback(() => setFormMode("view"), [setFormMode]);
  const moveToEditMode = useCallback(() => setFormMode("edit"), [setFormMode]);

  const myRef = useRef<any>(null);
  const mutation = useMutation(
    editProductDataFnWrapper(API.ProductNameInsert),
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
  const onSubmitHandler = ({ data, displayData, endSubmit, setFieldError }) => {
    //@ts-ignore
    endSubmit(true);

    // setopenAccept(true);
    if (formMode === "new") {
      data["ACTIVE"] = "Y";
    } else {
      data["ACTIVE"] = Boolean(data["ACTIVE"]) ? "Y" : "N";
    }
    // let upd = utilFunction.transformDetailsData(data, data?.[0]?.data ?? {});

    data["_OLDROWVALUE"] = {
      ...data["_OLDROWVALUE"],
      // ...upd,
      ACTIVE: Boolean(data["_OLDROWVALUE"]?.ACTIVE) ? "Y" : "N",
    };

    data["COMP_CD"] = authState.companyID;
    isErrorFuncRef.current = {
      data,
      displayData,
      endSubmit,
      setFieldError,
    };
    if (
      isErrorFuncRef.current?.data?._UPDATEDCOLUMNS.length === 0 &&
      isErrorFuncRef.current?.data?.DETAILS_DATA?.isUpdatedRow.length === 0 &&
      isErrorFuncRef.current?.data?.DETAILS_DATA?.isDeleteRow.length === 0 &&
      isErrorFuncRef.current?.data?.DETAILS_DATA?.isNewRow.length === 0
    ) {
      moveToViewMode();
    } else {
      setopenAccept(true);
    }
  };

  const result = useQueries([
    {
      queryKey: [
        "getProductNameDetail",
        transactionID,
        companyID,
        lineID,
        srCode,
      ],
      queryFn: () =>
        API.getProductNameDetail(
          transactionID,
          companyID,
          lineID,
          srCode,
          formMode
        ),
    },
  ]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries([
        "getProductNameDetail",
        transactionID,
        companyID,
        lineID,
        srCode,
      ]);
    };
  }, [transactionID, companyID, lineID, srCode]);

  const loading = result[0].isLoading || result[0].isFetching;
  let isError = result[0].isError;
  //@ts-ignore
  let errorMsg = `${result[0].error?.error_msg}`;
  errorMsg = Boolean(errorMsg.trim()) ? errorMsg : "Unknown error occured";

  //@ts-ignore
  let error_detail = `${result[0]?.error?.error_detail}`;

  const AddNewRow = () => {
    //myRef.current?.addNewRow(true);
    myRef.current?.addNewRow(true, { COMP_CD: authState.companyID });
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
        key={"productDisplay"}
        metaData={peoductNameMetaData}
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
                Close
              </Button>
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
  ) : formMode === "view" ? (
    <MasterDetailsForm
      key={"productDisplay" + formMode}
      metaData={peoductNameMetaData}
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
        key={"productDisplay" + formMode}
        metaData={peoductNameMetaData}
        ref={myRef}
        initialData={{
          _isNewRow: false,
          ...reqData[0].data,
          DETAILS_DATA: result[0].data,
        }}
        displayMode={formMode}
        isLoading={false}
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

export const ViewEditProductDisplayWrapperForm = ({
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
          },
        }}
        maxWidth="md"
      >
        <ViewEditProductDisplayForm
          transactionID={data?.[0]?.data?.TRAN_CD}
          companyID={data?.[0]?.data?.COMP_CD}
          lineID={data?.[0]?.data?.LINE_ID}
          srCode={data?.[0]?.data?.SR_CD}
          isDataChangedRef={isDataChangedRef}
          closeDialog={closeDialog}
          data={data}
          defaultView={defaultView}
        />
      </Dialog>
    </Fragment>
  );
};
