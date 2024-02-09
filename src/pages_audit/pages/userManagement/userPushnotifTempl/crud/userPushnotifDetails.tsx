import { AppBar, Button, Dialog, IconButton } from "@mui/material";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Transition } from "pages_audit/common";
import { useDialogStyles } from "pages_audit/common/dialogStyles";
import { MasterDetailsForm } from "components/formcomponent";
import { UserPushnotifDetailsMetaData } from "./metadata";
import { MasterDetailsMetaData } from "components/formcomponent/masterDetails/types";
import { useLocation } from "react-router-dom";
import { useMutation } from "react-query";
import * as API from "../api";
import { LoaderPaperComponent } from "components/common/loaderPaper";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { Alert } from "components/common/alert";
import { useSnackbar } from "notistack";
import { ClearCacheContext, queryClient } from "cache";
import { PopupMessageAPIWrapper } from "components/custom/popupMessage";

interface updateUserPushnotifDataType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
  setLoading?: any;
}
const updateUserPushnotifDetailsDataWrapperFn =
  (updateMasterData) =>
  async ({ data }: updateUserPushnotifDataType) => {
    return updateMasterData(data);
  };
export const UserPushnotifDetails = ({
  ClosedEventCall,
  isDataChangedRef,
  defaultmode = "view",
}) => {
  const classes = useDialogStyles();
  const myRef = useRef<any>(null);
  const { getEntries } = useContext(ClearCacheContext);
  const [formMode, setFormMode] = useState(defaultmode);
  const { state: rows }: any = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const [openAccept, setopenAccept] = useState(false);
  const isErrorFuncRef = useRef<any>(null);

  const mutationdtl: any = useMutation(API.getUserPushnotifDetailGridData, {
    onError: () => {},
    onSuccess: () => {},
  });
  const mutation = useMutation(
    updateUserPushnotifDetailsDataWrapperFn(
      API.updateUserPushnotifMasterDetailData
    ),
    {
      onError: (error: any, { endSubmit }) => {
        endSubmit(true, error?.error_msg, error?.error_detail);
        onActionCancel();
      },
      onSuccess: (data, { endSubmit }) => {
        endSubmit(true);
        enqueueSnackbar("Record Updated successfully.", {
          variant: "success",
        });
        isDataChangedRef.current = true;
        ClosedEventCall();
      },
    }
  );
  const AddNewRow = () => {
    myRef.current?.addNewRow(true);
  };

  const onPopupYesAccept = (rows) => {
    mutation.mutate({
      ...isErrorFuncRef.current,
    });
  };
  const onActionCancel = () => {
    setopenAccept(false);
  };

  const onSubmitHandler = ({
    data,
    resultValueObj,
    resultDisplayValueObj,
    endSubmit,
    setFieldErrors,
    actionFlag,
    displayData,
    setFieldError,
  }) => {
    endSubmit(true);
    data["CONFIRMED"] = "Y";
    isErrorFuncRef.current = { data, displayData, endSubmit, setFieldError };
    setopenAccept(true);
    // mutation.mutate({ data, endSubmit });
  };
  useEffect(() => {
    return () => {
      queryClient.removeQueries([
        "getUserPushnotifDTLData",
        rows[0]?.data?.TRAN_CD,
      ]);
    };
  }, [getEntries]);
  useEffect(() => {
    if (defaultmode !== "add") {
      mutationdtl.mutate({ reqdata: { TRAN_CD: rows[0]?.data?.TRAN_CD } });
    }
  }, [defaultmode]);
  return (
    <Fragment>
      <Dialog
        open={true}
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
        {mutationdtl.isLoading ? (
          <div style={{ height: 100, paddingTop: 10 }}>
            <div style={{ padding: 10 }}>
              <LoaderPaperComponent />
            </div>
            {typeof ClosedEventCall === "function" ? (
              <div style={{ position: "absolute", right: 0, top: 0 }}>
                <IconButton onClick={ClosedEventCall}>
                  <HighlightOffOutlinedIcon />
                </IconButton>
              </div>
            ) : null}
          </div>
        ) : mutationdtl.isError ? (
          <>
            <div
              style={{
                paddingRight: "10px",
                paddingLeft: "10px",
                height: 100,
                paddingTop: 10,
              }}
            >
              <AppBar position="relative" color="primary">
                <Alert
                  severity="error"
                  errorMsg={mutationdtl.error?.error_msg ?? "Unknow Error"}
                  errorDetail={mutationdtl.error?.error_detail ?? ""}
                  color="error"
                />
                {typeof ClosedEventCall === "function" ? (
                  <div style={{ position: "absolute", right: 0, top: 0 }}>
                    <IconButton onClick={ClosedEventCall}>
                      <HighlightOffOutlinedIcon />
                    </IconButton>
                  </div>
                ) : null}
              </AppBar>
            </div>
          </>
        ) : formMode === "view" ? (
          <MasterDetailsForm
            key={"userPushnotifDetails-" + formMode}
            metaData={UserPushnotifDetailsMetaData as MasterDetailsMetaData}
            ref={myRef}
            initialData={{
              _isNewRow: false,
              ...(rows?.[0]?.data ?? {}),
              DETAILS_DATA: mutationdtl.data || [],
            }}
            displayMode={"view"}
            isLoading={true}
            onSubmitData={onSubmitHandler}
            isNewRow={true}
            containerstyle={{
              padding: "10px",
            }}
            formStyle={{
              background: "white",
              // height: "25vh",
              // overflowY: "auto",
              // overflowX: "hidden",
            }}
            formName={"userPushnotifDetail"}
            formNameMaster={"userPushnotifMaster"}
          >
            {({ isSubmitting, handleSubmit }) => {
              return (
                <>
                  <Button
                    onClick={() => {
                      setFormMode("edit");
                    }}
                    // disabled={isSubmitting}
                    // endIcon={
                    //   isSubmitting ? <CircularProgress size={20} /> : null
                    // }
                    color={"primary"}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={ClosedEventCall}
                    // disabled={isSubmitting}
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
              key={"userPushnotifDetails-" + formMode}
              metaData={UserPushnotifDetailsMetaData as MasterDetailsMetaData}
              ref={myRef}
              initialData={{
                _isNewRow: false,
                ...(rows?.[0]?.data ?? {}),
                DETAILS_DATA: mutationdtl.data || [],
              }}
              displayMode={"edit"}
              isLoading={mutationdtl.isLoading}
              onSubmitData={onSubmitHandler}
              isNewRow={false}
              containerstyle={{
                padding: "10px",
              }}
              formStyle={{
                background: "white",
                // height: "25vh",
                // overflowY: "auto",
                // overflowX: "hidden",
              }}
              formName={"userPushnotifDetailEdit"}
              formNameMaster={"userPushnotifMasterEdit"}
              // onClickActionEvent={(index, id, data) => {
              //   mysubdtlRef.current = {
              //     ...mysubdtlRef.current,
              //     DB_COLUMN: data?.DB_COLUMN,
              //     DESCRIPTION: data?.DESCRIPTION,
              //     SR_CD: data?.SR_CD,
              //   };
              // setuserPushnotifSubDtl(true);
              // }}
            >
              {({ isSubmitting, handleSubmit }) => {
                return (
                  <>
                    <Button
                      onClick={AddNewRow}
                      // disabled={isSubmitting}
                      //endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                      color={"primary"}
                    >
                      Add Row
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      // disabled={isSubmitting}
                      // endIcon={
                      //   isSubmitting ? <CircularProgress size={20} /> : null
                      // }
                      color={"primary"}
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => {
                        setFormMode("view");
                      }}
                      // disabled={isSubmitting}
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
        ) : formMode === "add" ? (
          <>
            <MasterDetailsForm
              key={"userPushnotifDetails-" + formMode}
              metaData={UserPushnotifDetailsMetaData as MasterDetailsMetaData}
              ref={myRef}
              initialData={{
                _isNewRow: false,
                ...(rows?.[0]?.data ?? {}),
                DETAILS_DATA: [],
              }}
              displayMode={"new"}
              isLoading={mutation.isLoading}
              onSubmitData={onSubmitHandler}
              isNewRow={true}
              containerstyle={{
                padding: "10px",
              }}
              formStyle={{
                background: "white",
                // height: "25vh",
                // overflowY: "auto",
                // overflowX: "hidden",
              }}
              formName={"userPushnotifDetailEdit"}
              formNameMaster={"userPushnotifMasterEdit"}
              isError={mutation.isError}
              errorObj={mutation.error}
              // onClickActionEvent={(index, id, data) => {
              //   mysubdtlRef.current = {
              //     ...mysubdtlRef.current,
              //     DB_COLUMN: data?.DB_COLUMN,
              //     DESCRIPTION: data?.DESCRIPTION,
              //     SR_CD: data?.SR_CD,
              //   };
              // setuserPushnotifSubDtl(true);
              // }}
            >
              {({ isSubmitting, handleSubmit }) => {
                return (
                  <>
                    <Button
                      onClick={AddNewRow}
                      // disabled={isSubmitting}
                      //endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                      color={"primary"}
                    >
                      Add Row
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      // disabled={isSubmitting}
                      // endIcon={
                      //   isSubmitting ? <CircularProgress size={20} /> : null
                      // }
                      color={"primary"}
                    >
                      Save
                    </Button>
                    <Button
                      onClick={ClosedEventCall}
                      // disabled={isSubmitting}
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
                Message="Do you want to save this Request?"
                onActionYes={(rowVal) => onPopupYesAccept(rowVal)}
                onActionNo={() => onActionCancel()}
                rows={isErrorFuncRef.current?.data}
                open={openAccept}
                loading={mutation.isLoading}
              />
            ) : null}
          </>
        ) : null}
      </Dialog>
    </Fragment>
  );
};
