import { Button, Dialog } from "@mui/material";
import { useDialogStyles } from "pages_audit/common/dialogStyles";
import FormWrapper from "components/dynamicForm";
import { Transition } from "pages_audit/common";
import { useContext, useEffect, useRef, useState } from "react";
import { CRUDBankMasterMetadata } from "./metadata";
import { useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useMemo } from "react";
import { extractMetaData, utilFunction } from "components/utils";
import { useMutation } from "react-query";
import * as API from "../api";
import { AuthContext } from "pages_audit/auth";
import { PopupMessageAPIWrapper } from "components/custom/popupMessage";
import { cloneDeep } from "lodash";
interface updateBankMasterDataType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
}
const updateBankMasterDataWrapperFn =
  (updateMasterData) =>
  async ({ data }: updateBankMasterDataType) => {
    return updateMasterData(data);
  };

export const CRUDBankMaster = ({
  ClosedEventCall,
  isDataChangedRef,
  defaultmode = "view",
}) => {
  const [formMode, setFormMode] = useState(defaultmode);
  const classes = useDialogStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { state: rows }: any = useLocation();
  const { authState } = useContext(AuthContext);
  const isErrorFuncRef = useRef<any>(null);
  const [isOpenSave, setIsOpenSave] = useState(false);
  const rowsData = useMemo(() => {
    return cloneDeep(rows);
  }, [rows]);
  const mutation = useMutation(
    updateBankMasterDataWrapperFn(API.updateBankMastersData),
    {
      onError: (error: any, { endSubmit, setFieldError }) => {
        let errorMsg = "Unknown Error occured";
        let isPrimaryKeyError = "";
        if (typeof error === "object") {
          errorMsg = error?.error_msg ?? errorMsg;
          isPrimaryKeyError = error?.isPrimaryKeyError;
        }

        if (Boolean(isPrimaryKeyError)) {
          endSubmit(false, errorMsg);
          setFieldError({ ROUTING_NO: isPrimaryKeyError });
        } else {
          endSubmit(false, errorMsg, error?.error_detail ?? "");
        }
        onActionCancel();
      },
      onSuccess: (data, { endSubmit }) => {
        // queryClient.refetchQueries(["getFormData", transactionID]);
        endSubmit(true, "");
        enqueueSnackbar(data, {
          variant: "success",
        });
        isDataChangedRef.current = true;
        if (typeof ClosedEventCall === "function") {
          ClosedEventCall();
        }
      },
    }
  );

  const onActionCancel = () => {
    setIsOpenSave(false);
    isErrorFuncRef.current?.endSubmit(false);
  };
  const onPopupYes = (rows) => {
    mutation.mutate({
      ...isErrorFuncRef.current,
    });
  };
  useEffect(() => {
    if (rowsData.length === 0 && formMode !== "new") {
      enqueueSnackbar("Please select one user to get the details", {
        variant: "warning",
      });
      ClosedEventCall();
      return;
    }
  }, [rowsData, enqueueSnackbar, ClosedEventCall]);

  const onSubmitHandler = (
    data: any,
    displayData,
    endSubmit,
    setFieldErrors,
    setFieldError
  ) => {
    let updateValue: any = {};
    if (data.hasOwnProperty("NPSB_ENABLED")) {
      data["NPSB_ENABLED"] = Boolean(data["NPSB_ENABLED"]) ? "Y" : "N";
    }
    if (data.hasOwnProperty("BEFTN_ENABLED")) {
      data["BEFTN_ENABLED"] = Boolean(data["BEFTN_ENABLED"]) ? "Y" : "N";
    }
    if (data.hasOwnProperty("RTGS_ENABLED")) {
      data["RTGS_ENABLED"] = Boolean(data["RTGS_ENABLED"]) ? "Y" : "N";
    }
    let oldData = cloneDeep(rowsData?.[0]?.data);
    if (
      oldData?.hasOwnProperty("NPSB_ENABLED") &&
      typeof oldData["NPSB_ENABLED"] === "boolean"
    ) {
      oldData["NPSB_ENABLED"] = Boolean(oldData["NPSB_ENABLED"]) ? "Y" : "N";
    }
    if (
      oldData?.hasOwnProperty("BEFTN_ENABLED") &&
      typeof oldData["BEFTN_ENABLED"] === "boolean"
    ) {
      oldData["BEFTN_ENABLED"] = Boolean(oldData["BEFTN_ENABLED"]) ? "Y" : "N";
    }
    if (
      oldData?.hasOwnProperty("RTGS_ENABLED") &&
      typeof oldData["RTGS_ENABLED"] === "boolean"
    ) {
      oldData["RTGS_ENABLED"] = Boolean(oldData["RTGS_ENABLED"]) ? "Y" : "N";
    }
    // if (oldData?.hasOwnProperty("NPSB_ENABLED")) {
    //   oldData["NPSB_ENABLED"] = Boolean(oldData["NPSB_ENABLED"]) ? "Y" : "N";
    // }
    // if (oldData?.hasOwnProperty("BEFTN_ENABLED")) {
    //   oldData["BEFTN_ENABLED"] = Boolean(oldData["BEFTN_ENABLED"]) ? "Y" : "N";
    // }
    // if (oldData?.hasOwnProperty("RTGS_ENABLED")) {
    //   oldData["RTGS_ENABLED"] = Boolean(oldData["RTGS_ENABLED"]) ? "Y" : "N";
    // }
    if (formMode !== "new") {
      updateValue = utilFunction.transformDetailsData(data, oldData ?? {});
    }
    if (
      formMode !== "new" &&
      Array.isArray(updateValue?._UPDATEDCOLUMNS) &&
      updateValue?._UPDATEDCOLUMNS?.length === 0
    ) {
      endSubmit(true);
      setFormMode("view");
    } else {
      isErrorFuncRef.current = {
        data: {
          COMP_CD: authState.companyID,
          ...data,
          ...updateValue,
          _isNewRow: formMode === "new" ? true : false,
        },
        displayData,
        endSubmit,
        setFieldError,
      };
      setIsOpenSave(true);
    }
  };
  const metaData = useMemo(
    () => extractMetaData(CRUDBankMasterMetadata, formMode),
    [formMode]
  );
  return (
    <>
      <Dialog
        open={true}
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
        {formMode === "new" ? (
          <>
            <FormWrapper
              key={"BankMaster-" + formMode}
              metaData={metaData}
              initialValues={{}}
              onSubmitHandler={onSubmitHandler}
              displayMode={formMode}
              formStyle={{
                background: "white",
                // height: "35vh",
                // overflowY: "auto",
                // overflowX: "hidden",
              }}
            >
              {({ isSubmitting, handleSubmit }) => {
                return (
                  <>
                    <Button
                      onClick={handleSubmit}
                      color={"primary"}
                      // disabled={isSubmitting}
                      // endIcon={
                      //   isSubmitting ? <CircularProgress size={20} /> : null
                      // }
                    >
                      Save
                    </Button>
                    {typeof ClosedEventCall === "function" ? (
                      <Button
                        onClick={() => {
                          ClosedEventCall();
                        }}
                        color={"primary"}
                        // disabled={isSubmitting}
                      >
                        Cancel
                      </Button>
                    ) : null}
                  </>
                );
              }}
            </FormWrapper>
            {isOpenSave ? (
              <PopupMessageAPIWrapper
                MessageTitle="Confirmation"
                Message="Do you want to save this Request?"
                onActionYes={(rowVal) => onPopupYes(rowVal)}
                onActionNo={() => onActionCancel()}
                rows={isErrorFuncRef.current?.data}
                open={isOpenSave}
                loading={mutation.isLoading}
              />
            ) : null}
          </>
        ) : formMode === "edit" ? (
          <>
            <FormWrapper
              key={"BankMaster-" + formMode}
              metaData={metaData}
              initialValues={rowsData?.[0]?.data ?? {}}
              onSubmitHandler={onSubmitHandler}
              displayMode={formMode}
              formStyle={{
                background: "white",
                // height: "35vh",
                // overflowY: "auto",
                // overflowX: "hidden",
              }}
            >
              {({ isSubmitting, handleSubmit }) => {
                return (
                  <>
                    <Button
                      onClick={handleSubmit}
                      color={"primary"}
                      // disabled={isSubmitting}
                      // endIcon={
                      //   isSubmitting ? <CircularProgress size={20} /> : null
                      // }
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => {
                        setFormMode("view");
                      }}
                      color={"primary"}
                      // disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                  </>
                );
              }}
            </FormWrapper>
            {isOpenSave ? (
              <PopupMessageAPIWrapper
                MessageTitle="Confirmation"
                Message="Do you want to save this Request?"
                onActionYes={(rowVal) => onPopupYes(rowVal)}
                onActionNo={() => onActionCancel()}
                rows={isErrorFuncRef.current?.data}
                open={isOpenSave}
                loading={mutation.isLoading}
              />
            ) : null}
          </>
        ) : (
          <FormWrapper
            key={"BankMaster-" + formMode}
            metaData={metaData}
            initialValues={rowsData?.[0]?.data ?? {}}
            onSubmitHandler={onSubmitHandler}
            displayMode={formMode}
            formStyle={{
              background: "white",
              // height: "35vh",
              // overflowY: "auto",
              // overflowX: "hidden",
            }}
          >
            <>
              <Button
                onClick={() => {
                  setFormMode("edit");
                }}
                color={"primary"}
              >
                Edit
              </Button>
              {typeof ClosedEventCall === "function" ? (
                <Button onClick={ClosedEventCall} color={"primary"}>
                  Close
                </Button>
              ) : null}
            </>
          </FormWrapper>
        )}
      </Dialog>
    </>
  );
};
