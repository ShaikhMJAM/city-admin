import {
  FC,
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { queryClient } from "cache";
import { useSnackbar } from "notistack";
import { cloneDeep } from "lodash-es";
import { useMutation, useQueries } from "react-query";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import Dialog from "@mui/material/Dialog";
import { Alert } from "components/common/alert";
import * as API from "../api";
import { vCardProdTypeMasterDetailsMetaData } from "./metaData";
import { LoaderPaperComponent } from "components/common/loaderPaper";
import { MasterDetailsMetaData } from "components/formcomponent/masterDetails/types";
import { MasterDetailsForm } from "components/formcomponent";
import { AuthContext } from "pages_audit/auth";
import { PopupMessageAPIWrapper } from "components/custom/popupMessage";
interface updateMasterDataType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
}

const updateMasterDataWrapperFn =
  (updateMasterData) =>
  async ({ data }: updateMasterDataType) => {
    return updateMasterData(data);
  };

const ViewEditVCardProdType: FC<{
  isDataChangedRef: any;
  closeDialog?: any;
  defaultView?: "add" | "view" | "edit" | "confirm";
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
  const [formMode, setFormMode] = useState(defaultView);
  const [openAccept, setOpenAccept] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [isOpenAccept, setIsOpenAccept] = useState(false);
  const [isDetailHide, setIsDetailHide] = useState(false);
  const isErrorFuncRef = useRef<any>(null);
  const moveToViewMode = useCallback(() => setFormMode("view"), [setFormMode]);
  const moveToEditMode = useCallback(() => setFormMode("edit"), [setFormMode]);
  const { authState } = useContext(AuthContext);
  const myRef = useRef<any>(null);

  const result = useQueries([
    {
      queryKey: ["getvCardProdTypeDetailsGridData", transactionID],
      queryFn: () =>
        API.getvCardProdTypeDetailsGridData(transactionID, formMode),
    },
  ]);

  const mutation = useMutation(
    updateMasterDataWrapperFn(API.insertUpdateData()),
    {
      onError: (error: any, { endSubmit }) => {
        let errorMsg = "Unknown Error occured";
        if (typeof error === "object") {
          errorMsg = error?.error_msg ?? errorMsg;
        }
        endSubmit(false, errorMsg, error?.error_detail ?? "");
        onActionCancel();
      },
      onSuccess: (data, { endSubmit }) => {
        // queryClient.refetchQueries(["getFormData", transactionID]);
        endSubmit(true, "");
        enqueueSnackbar(data, {
          variant: "success",
        });
        isDataChangedRef.current = true;

        // moveToViewMode();
        if (typeof closeDialog === "function") {
          closeDialog();
        }
      },
    }
  );

  const onPopupAccept = (rows) => {
    mutation.mutate({
      ...isErrorFuncRef.current,
    });
  };

  const mutationConfirm = useMutation(API.updVirtualCardProdTypeConfirm, {
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
    onSuccess: (data) => {
      enqueueSnackbar(data, {
        variant: "success",
      });
      isDataChangedRef.current = true;
      if (typeof closeDialog === "function") {
        closeDialog();
      }
      onActionCancel();
    },
    onSettled: () => {
      onActionCancel();
    },
  });

  const onSubmitHandler = ({ data, displayData, endSubmit, setFieldError }) => {
    //@ts-ignore
    endSubmit(true);

    data["ACTIVE"] =
      formMode === "add" ? "Y" : Boolean(data["ACTIVE"]) ? "Y" : "N";
    data["ALLOW_IN_INTRO"] = Boolean(data["ALLOW_IN_INTRO"]) ? "Y" : "N";

    if (
      Array.isArray(data?._UPDATEDCOLUMNS) &&
      data._UPDATEDCOLUMNS.length === 0 &&
      Array.isArray(data?.DETAILS_DATA?.isDeleteRow) &&
      data?.DETAILS_DATA?.isDeleteRow?.length === 0 &&
      Array.isArray(data?.DETAILS_DATA?.isNewRow) &&
      data?.DETAILS_DATA?.isNewRow?.length === 0 &&
      Array.isArray(data?.DETAILS_DATA?.isUpdatedRow) &&
      data?.DETAILS_DATA?.isUpdatedRow?.length === 0
    ) {
      // endSubmit(true);
      moveToViewMode();
    } else {
      isErrorFuncRef.current = { data, displayData, endSubmit, setFieldError };
      setIsOpenAccept(true);
    }

    // mutation.mutate({ data, displayData, endSubmit, setFieldError });
  };

  useEffect(() => {
    return () => {
      queryClient.removeQueries([
        "getvCardProdTypeDetailsGridData",
        transactionID,
      ]);
    };
  }, [transactionID]);

  useEffect(() => {
    if (reqData?.[0]?.data?.PRODUCT_TYPE === "PREPAID CARD") {
      setIsDetailHide(true);
    } else {
      setIsDetailHide(false);
    }
  }, [reqData?.[0]?.data?.PRODUCT_TYPE]);

  // const dataUniqueKey = `${result[0].dataUpdatedAt}`;
  const loading = result[0].isLoading || result[0].isFetching;
  let isError = result[0].isError;
  //@ts-ignore
  let errorMsg = `${result[0].error?.error_msg}`;
  errorMsg = Boolean(errorMsg.trim()) ? errorMsg : "Unknown error occured";

  //@ts-ignore
  let error_detail = `${result[0]?.error?.error_detail}`;

  let metadata: MasterDetailsMetaData = {} as MasterDetailsMetaData;
  metadata = cloneDeep(
    vCardProdTypeMasterDetailsMetaData
  ) as MasterDetailsMetaData;
  const metaData = useMemo(() => {
    let myColumns = metadata.detailsGrid.columns;
    if (formMode === "view" || formMode === "confirm") {
      myColumns = metadata.detailsGrid.columns.filter(
        (one) => one.accessor !== "_hidden"
      );
    }
    if (formMode === "confirm") {
      metadata.masterForm.form.label =
        "Virtual Card Product Type Configuration Confirmation";
    } else {
      metadata.masterForm.form.label =
        "Virtual Card Product Type Configuration";
    }
    return {
      ...metadata,
      detailsGrid: { ...metadata.detailsGrid, columns: myColumns },
    };
  }, [formMode, metadata]);

  const AddNewRow = () => {
    myRef.current?.addNewRow(true);
  };

  const onPopupYesAccept = (rows) => {
    mutationConfirm.mutate({ confirmed: "Y", trancd: rows?.TRAN_CD });
  };

  const onPopupYesReject = (rows) => {
    mutationConfirm.mutate({ confirmed: "R", trancd: rows?.TRAN_CD });
  };

  const onActionCancel = () => {
    setOpenAccept(false);
    setOpenReject(false);
    setIsOpenAccept(false);
  };

  const onChangeProductType = (
    fieldKey,
    field,
    dependentFieldsState,
    formState
  ) => {
    if (fieldKey === "PRODUCT_TYPE" && field?.value === "PREPAID CARD") {
      setIsDetailHide(true);
    } else {
      setIsDetailHide(false);
    }
    return "";
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
  ) : formMode === "add" ? (
    <>
      <MasterDetailsForm
        key={"vCardProdTypeConfig" + formMode}
        metaData={metaData}
        ref={myRef}
        initialData={{ _isNewRow: true, DETAILS_DATA: [] }}
        displayMode={"New"}
        // isLoading={isLoading}
        onSubmitData={onSubmitHandler}
        isNewRow={true}
        formStyle={
          {
            //   background: "white",
            //   height: "15vh",
            //   overflowY: "auto",
            //   overflowX: "hidden",
          }
        }
        containerstyle={{ padding: "10px" }}
        formName={"vCardProductType"}
        onFormDataChange={onChangeProductType}
        isDetailHide={isDetailHide}
      >
        {({ isSubmitting, handleSubmit }) => {
          return (
            <>
              {!isDetailHide && (
                <Button
                  onClick={AddNewRow}
                  // disabled={isSubmitting}
                  //endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                  color={"primary"}
                >
                  Add Row
                </Button>
              )}
              <Button
                onClick={handleSubmit}
                // disabled={isSubmitting}
                // endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                color={"primary"}
              >
                Save
              </Button>
              <Button
                onClick={closeDialog}
                // disabled={isSubmitting}
                color={"primary"}
              >
                Close
              </Button>
            </>
          );
        }}
      </MasterDetailsForm>
      {isOpenAccept ? (
        <PopupMessageAPIWrapper
          MessageTitle="Confirmation"
          Message="Do you want to save this Request?"
          onActionYes={(rowVal) => onPopupAccept(rowVal)}
          onActionNo={() => onActionCancel()}
          rows={isErrorFuncRef.current?.data}
          open={isOpenAccept}
          loading={mutation.isLoading}
        />
      ) : null}
    </>
  ) : formMode === "view" ? (
    <MasterDetailsForm
      key={"vCardProdTypeConfig" + formMode}
      metaData={metaData}
      ref={myRef}
      initialData={{
        _isNewRow: false,
        ...reqData?.[0]?.data,
        DETAILS_DATA: result?.[0]?.data,
      }}
      displayMode={formMode}
      isLoading={true}
      onSubmitData={onSubmitHandler}
      // isNewRow={false}
      formStyle={
        {
          //   background: "white",
          //   height: "15vh",
          //   overflowY: "auto",
          //   overflowX: "hidden",
        }
      }
      containerstyle={{ padding: "10px" }}
      formName={"vCardProdType"}
      onFormDataChange={onChangeProductType}
      isDetailHide={isDetailHide}
    >
      {({ isSubmitting, handleSubmit }) => {
        return (
          <>
            <Button
              onClick={moveToEditMode}
              //disabled={isSubmitting}
              //endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
              color={"primary"}
            >
              Edit
            </Button>
            <Button
              onClick={closeDialog}
              //disabled={isSubmitting}
              color={"primary"}
            >
              Close
            </Button>
          </>
        );
      }}
    </MasterDetailsForm>
  ) : formMode === "edit" ? (
    <>
      <MasterDetailsForm
        key={"vCardProdTypeConfig" + formMode}
        metaData={metaData}
        ref={myRef}
        initialData={{
          _isNewRow: false,
          ...reqData?.[0]?.data,
          DETAILS_DATA: result?.[0]?.data,
        }}
        displayMode={formMode}
        // isLoading={false}
        onSubmitData={onSubmitHandler}
        // isNewRow={false}
        formStyle={
          {
            //   background: "white",
            //   height: "15vh",
            //   overflowY: "auto",
            //   overflowX: "hidden",
          }
        }
        containerstyle={{ padding: "10px" }}
        formName={"vCardProdType"}
        onFormDataChange={onChangeProductType}
        isDetailHide={isDetailHide}
      >
        {({ isSubmitting, handleSubmit }) => {
          return (
            <>
              {!isDetailHide && (
                <Button
                  onClick={AddNewRow}
                  // disabled={isSubmitting}
                  //endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                  color={"primary"}
                >
                  Add Row
                </Button>
              )}
              <Button
                onClick={handleSubmit}
                // disabled={isSubmitting}
                // endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                color={"primary"}
              >
                Save
              </Button>
              <Button
                onClick={moveToViewMode}
                // disabled={isSubmitting}
                color={"primary"}
              >
                Cancel
              </Button>
            </>
          );
        }}
      </MasterDetailsForm>
      {isOpenAccept ? (
        <PopupMessageAPIWrapper
          MessageTitle="Confirmation"
          Message="Do you want to save this Request?"
          onActionYes={(rowVal) => onPopupAccept(rowVal)}
          onActionNo={() => onActionCancel()}
          rows={isErrorFuncRef.current?.data}
          open={isOpenAccept}
          loading={mutation.isLoading}
        />
      ) : null}
    </>
  ) : formMode === "confirm" ? (
    <>
      <MasterDetailsForm
        key={"vCardProdTypeconfirm"}
        metaData={metaData}
        ref={myRef}
        initialData={{
          _isNewRow: false,
          ...reqData[0].data,
          DETAILS_DATA: result[0].data,
        }}
        displayMode={"view"}
        isLoading={true}
        onSubmitData={onSubmitHandler}
        isNewRow={false}
        formStyle={
          {
            //   background: "white",
            //   height: "15vh",
            //   overflowY: "auto",
            //   overflowX: "hidden",
          }
        }
        containerstyle={{ padding: "10px" }}
        formName={"vCardProdType"}
        isDetailHide={isDetailHide}
      >
        {({ isSubmitting, handleSubmit }) => {
          return (
            <>
              <Button
                //disabled={isSubmitting}
                //endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                color={"primary"}
                // onClick={closeDialog}
                onClick={(event) => {
                  if (reqData[0].data?.LAST_ENTERED_BY === authState.user.id) {
                    enqueueSnackbar("You can not confirm your own Entry.", {
                      variant: "warning",
                    });
                  } else {
                    setOpenAccept(true);
                  }
                }}
              >
                Accept
              </Button>
              <Button
                //disabled={isSubmitting}
                //endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                color={"primary"}
                // onClick={closeDialog}
                onClick={(event) => {
                  if (reqData[0].data?.LAST_ENTERED_BY === authState.user.id) {
                    enqueueSnackbar("You can not reject your own Entry.", {
                      variant: "warning",
                    });
                  } else {
                    setOpenReject(true);
                  }
                }}
              >
                Reject
              </Button>
              <Button
                onClick={closeDialog}
                //disabled={isSubmitting}
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
          Message="Do You want to accept this Request?"
          onActionYes={onPopupYesAccept}
          onActionNo={() => onActionCancel()}
          rows={reqData[0].data}
          open={openAccept}
          loading={mutationConfirm.isLoading}
        />
      ) : null}
      {openReject ? (
        <PopupMessageAPIWrapper
          MessageTitle="Confirmation"
          Message="Do You want to reject this Request?"
          onActionYes={onPopupYesReject}
          onActionNo={() => onActionCancel()}
          rows={reqData[0].data}
          open={openReject}
          loading={mutationConfirm.isLoading}
        />
      ) : null}
    </>
  ) : null;
  return renderResult;
};

export const ViewEditVCardProdTypeWrapper = ({
  isDataChangedRef,
  closeDialog,
  defaultView,
}) => {
  const { state: data }: any = useLocation();
  return (
    <Fragment>
      <Dialog open={true} maxWidth="lg" fullWidth>
        <ViewEditVCardProdType
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
