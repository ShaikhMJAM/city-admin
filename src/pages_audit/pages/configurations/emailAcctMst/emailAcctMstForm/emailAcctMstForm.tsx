import { FC, useEffect, useState, useContext, useRef, useMemo } from "react";
import { useMutation } from "react-query";
import { ClearCacheContext, queryClient } from "cache";
import { InitialValuesType, SubmitFnType } from "packages/form";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import FormWrapper, { MetaDataType } from "components/dynamicForm";
import { useSnackbar } from "notistack";
import { useLocation } from "react-router-dom";
import { useDialogStyles } from "pages_audit/common/dialogStyles";
import { Transition } from "pages_audit/common/transition";
import * as API from "./api";
import { EmailAcctMstFormMetadata } from "./metaData";
import { PopupMessageAPIWrapper } from "components/custom/popupMessage";
import { extractMetaData, utilFunction } from "components/utils";
import { AuthContext } from "pages_audit/auth";

interface updateAUTHDetailDataType {
  data: any;
  displayData?: any;
  endSubmit?: any;
  setFieldError?: any;
}

const updateAUTHDetailDataWrapperFn =
  (updateAUTHDetailData) =>
  async ({ data }: updateAUTHDetailDataType) => {
    return updateAUTHDetailData({ data });
  };

const EmailAcctMstForm: FC<{
  isDataChangedRef: any;
  closeDialog?: any;
  formView?: string;
  AtmLocCode: string;
}> = ({ isDataChangedRef, closeDialog, formView, AtmLocCode }) => {
  const { enqueueSnackbar } = useSnackbar();
  const isErrorFuncRef = useRef<any>(null);
  const [isOpenSave, setIsOpenSave] = useState(false);
  const { state: rows }: any = useLocation();
  const authController = useContext(AuthContext);
  const { authState } = useContext(AuthContext);

  const mutation = useMutation(
    updateAUTHDetailDataWrapperFn(API.updEmailAcctMstFormData),

    {
      onError: (error: any, { endSubmit }) => {
        let errorMsg = "Unknown Error occured";
        if (typeof error === "object") {
          errorMsg = error?.error_msg ?? errorMsg;
        }
        endSubmit(false, errorMsg, error?.error_detail ?? "");
        enqueueSnackbar(errorMsg, { variant: "error" });
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
  const onActionCancel = () => {
    setIsOpenSave(false);
  };
  const onPopupYes = (rowsData) => {
    mutation.mutate({
      TRAN_CD: rows?.[0]?.data?.TRAN_CD,
      ...isErrorFuncRef.current,
    });
  };
  const onSubmitHandler: SubmitFnType = (
    data,
    displayData,
    endSubmit,
    setFieldError,
    actionFlag
  ) => {
    //@ts-ignore
    endSubmit(true);

    let newData = data;
    if (!(formView === "new")) {
      let upd: any = utilFunction.transformDetailsData(data, rows?.[0]?.data);
      newData["SSL"] = Boolean(newData["SSL"]) ? "Y" : "N";
      newData["SPA"] = Boolean(newData["SPA"]) ? "Y" : "N";
      newData["SMTP_PASS_AUTH"] = Boolean(newData["SMTP_PASS_AUTH"])
        ? "Y"
        : "N";

      upd["_OLDROWVALUE"] = {
        ...upd["_OLDROWVALUE"],
        SSL: Boolean(upd["_OLDROWVALUE"]?.SSL) ? "Y" : "N",
        SPA: Boolean(upd["_OLDROWVALUE"]?.SPA) ? "Y" : "N",
        SMTP_PASS_AUTH: Boolean(upd["_OLDROWVALUE"]?.SMTP_PASS_AUTH)
          ? "Y"
          : "N",
      };
      if (upd["_UPDATEDCOLUMNS"]?.length === 0) {
        closeDialog();
        return;
      }
      newData = {
        ...newData,
        ...upd,
        COMP_CD: authController.authState.companyID,
      };
    } else {
      let newData = data;
      newData["SSL"] = "Y";
      newData["SPA"] = "Y";
      newData["SMTP_PASS_AUTH"] = "Y";

      newData["COMP_CD"] = authState.companyID;
    }
    newData["_isNewRow"] = formView === "new" ? true : false;
    isErrorFuncRef.current = {
      data: newData,
      displayData,
      endSubmit,
      setFieldError,
    };
    setIsOpenSave(true);
  };
  const masterMetadata: MetaDataType = useMemo(
    () => extractMetaData(EmailAcctMstFormMetadata, formView),
    [EmailAcctMstFormMetadata, formView, ""]
  ) as MetaDataType;
  return (
    <>
      <FormWrapper
        key={"EmailAcctMstForm"}
        metaData={masterMetadata}
        initialValues={(rows?.[0]?.data ?? {}) as InitialValuesType}
        onSubmitHandler={onSubmitHandler}
        //@ts-ignore
        displayMode={formView}
        formStyle={{
          background: "white",
          // height: "40vh",
          // overflowY: "auto",
          // overflowX: "hidden",
        }}
      >
        {({ isSubmitting, handleSubmit }) => (
          <>
            <Button
              onClick={(event) => {
                handleSubmit(event, "Save");
              }}
              disabled={isSubmitting}
              //endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
              color={"primary"}
            >
              Save
            </Button>
            <Button
              onClick={closeDialog}
              color={"primary"}
              disabled={isSubmitting}
            >
              Close
            </Button>
          </>
        )}
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
  );
};

export const EmailAcctMstFormWrapper = ({
  handleDialogClose,
  isDataChangedRef,
  formView,
}) => {
  const classes = useDialogStyles();
  const { state: rows }: any = useLocation();
  const { getEntries } = useContext(ClearCacheContext);
  useEffect(() => {
    return () => {
      let entries = getEntries() as any[];
      if (Array.isArray(entries) && entries.length > 0) {
        entries.forEach((one) => {
          queryClient.removeQueries(one);
        });
      }
    };
  }, [getEntries]);
  return (
    <>
      <Dialog
        open={true}
        //@ts-ignore
        TransitionComponent={Transition}
        PaperProps={{
          style: {
            width: "60%",
            overflowX: "hidden",
          },
        }}
        maxWidth="md"
        classes={{
          scrollPaper: classes.topScrollPaper,
          paperScrollBody: classes.topPaperScrollBody,
        }}
      >
        <EmailAcctMstForm
          AtmLocCode={rows?.[0]?.data?.AtmLoc_CD ?? ""}
          isDataChangedRef={isDataChangedRef}
          closeDialog={handleDialogClose}
          formView={formView}
        />
      </Dialog>
    </>
  );
};
