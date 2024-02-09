import { FC, useEffect, useState, useContext, useRef } from "react";
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
import { EmailSMSTemplateFormMetadata } from "./metaData";
import { PopupMessageAPIWrapper } from "components/custom/popupMessage";
import { SMSTemplateWrapper } from "./smsTemplate";
import { EmailTemplateWrapper } from "./emailTemplate";
import { utilFunction } from "components/utils";
import { format } from "date-fns";
import { getParsedDate } from "components/utils/utilFunctions/function";

interface updateAUTHDetailDataType {
  data: any;
  endSubmit?: any;
  displayData?: any;
  setFieldError?: any;
}

const updateAUTHDetailDataWrapperFn =
  (updateAUTHDetailData) =>
  async ({ data }: updateAUTHDetailDataType) => {
    return updateAUTHDetailData(data);
  };

const EmailSMSTemplateForm: FC<{
  isDataChangedRef: any;
  closeDialog?: any;
  formView?: string;
  branchCode: string;
}> = ({ isDataChangedRef, closeDialog, formView, branchCode }) => {
  const { enqueueSnackbar } = useSnackbar();
  const isErrorFuncRef = useRef<any>(null);
  const isEmailNewRef = useRef<any>({});
  const [isOpenSave, setIsOpenSave] = useState(false);
  const [isOpenSMS, setIsOpenSMS] = useState(false);
  const [isOpenEmail, setIsOpenEmail] = useState(false);
  const { state: rows }: any = useLocation();
  const mutation = useMutation(
    updateAUTHDetailDataWrapperFn(API.updateEmailSMSConfig),
    {
      onError: (error: any, { endSubmit }) => {
        console.log("error", error);
        let errorMsg = "Unknown Error occured";
        onActionCancel();
        if (typeof error === "object") {
          errorMsg = error?.error_msg ?? errorMsg;
        }
        endSubmit(false, errorMsg, error?.error_detail ?? "");
      },
      onSuccess: (data, { endSubmit }) => {
        endSubmit(true, "");
        enqueueSnackbar(data, {
          variant: "success",
        });
        onActionCancel();
        isDataChangedRef.current = true;
        if (typeof closeDialog === "function") {
          closeDialog();
        }
      },
    }
  );
  const onActionCancel = () => {
    setIsOpenSave(false);
  };
  const onPopupYes = (rows) => {
    mutation.mutate({ ...isErrorFuncRef.current });
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
    data["MAIL_MSG"] = isEmailNewRef.current?.MAIL_MSG;
    // data["MAIL_MSG_JSON"] = JSON.stringify(
    //   isEmailNewRef.current?.MAIL_MSG_JSON
    // );
    data["USER_MSG_TXT"] = isEmailNewRef.current?.USER_MSG_TXT;
    if (Boolean(data["EFFECTIVE_FROM_DT"])) {
      data["EFFECTIVE_FROM_DT"] = format(
        new Date(data["EFFECTIVE_FROM_DT"]),
        "dd/MM/yyyy HH:mm:ss"
      );
    }
    if (Boolean(rows[0].data["EFFECTIVE_FROM_DT"])) {
      rows[0].data["EFFECTIVE_FROM_DT"] = format(
        getParsedDate(rows[0].data["EFFECTIVE_FROM_DT"]),
        "dd/MM/yyyy HH:mm:ss"
      );
    }
    if (Boolean(rows[0].data["EFFECTIVE_FROM_DT"])) {
      rows[0].data["EFFECTIVE_FROM_DT"] = format(
        getParsedDate(rows[0].data["EFFECTIVE_FROM_DT"]),
        "dd/MM/yyyy"
      );
    }
    let updateValue = utilFunction.transformDetailsData(
      data,
      rows[0]?.data ?? {}
    );
    if (updateValue?._UPDATEDCOLUMNS?.length === 0) {
      closeDialog();
    } else {
      isErrorFuncRef.current = {
        data: { ...data, ...updateValue },
        displayData,
        endSubmit,
        setFieldError,
      };
      setIsOpenSave(true);
    }
  };

  const ClosedEventCall = () => {
    setIsOpenSMS(false);
    setIsOpenEmail(false);
  };

  /**
   * updated_at: 29/jan/2024
   * create separate api for fetch and updated sms / email template
   * below functions no longer needed
   */
  // const onSaveSMSData = (smsText) => {
  //   isEmailNewRef.current = {
  //     ...isEmailNewRef.current,
  //     USER_MSG_TXT: smsText,
  //   };
  //   setIsOpenSMS(false);
  // };
  // const onSaveEmailData = (emailText) => {
  //   isEmailNewRef.current = {
  //     ...isEmailNewRef.current,
  //     MAIL_MSG: emailText,
  //     // MAIL_MSG_JSON: emailJson,
  //   };
  //   // isEmailNewRef.current = {
  //   //   ...isEmailNewRef.current,
  //   //   USER_MSG_TXT: smsText,
  //   // };
  //   setIsOpenEmail(false);
  // };
  useEffect(() => {
    isEmailNewRef.current = {
      MAIL_MSG: rows?.[0]?.data?.MAIL_MSG,
      MAIL_MSG_JSON: rows?.[0]?.data?.MAIL_MSG_JSON,
      USER_MSG_TXT: rows?.[0]?.data?.USER_MSG_TXT,
      TRAN_CD: rows?.[0]?.data?.TRAN_CD,
      COMP_CD: rows?.[0]?.data?.COMP_CD,
    };
  }, []);

  return (
    <>
      <FormWrapper
        key={"EmailSMSTemplateForm"}
        metaData={EmailSMSTemplateFormMetadata as MetaDataType}
        initialValues={rows?.[0]?.data as InitialValuesType}
        onSubmitHandler={onSubmitHandler}
        //@ts-ignore
        // displayMode={formMode}
        formStyle={{
          background: "white",
          // height: "calc(68vh - 16vh)",
          // overflowY: "auto",
          // overflowX: "hidden",
        }}
      >
        {({ isSubmitting, handleSubmit }) => (
          <>
            <Button
              onClick={(event) => {
                setIsOpenSMS(true);
              }}
              disabled={isSubmitting}
              //endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
              color={"primary"}
            >
              SMS
            </Button>
            <Button
              onClick={(event) => {
                setIsOpenEmail(true);
              }}
              disabled={isSubmitting}
              //endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
              color={"primary"}
            >
              Email
            </Button>
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
            {/* <Button
            onClick={moveToViewMode}
            disabled={isSubmitting}
																		  
            color={"primary"}
          >
            Cancel
          </Button> */}
          </>
        )}
      </FormWrapper>
      {isOpenSave ? (
        <PopupMessageAPIWrapper
          MessageTitle="Confirmation"
          Message="Do you want to save this Request?"
          onActionYes={(rowVal) => onPopupYes(rowVal)}
          onActionNo={() => onActionCancel()}
          rows={rows?.[0]?.data}
          open={isOpenSave}
          loading={mutation.isLoading}
        />
      ) : null}
      {isOpenSMS ? (
        <SMSTemplateWrapper
          open={isOpenSMS}
          handleDialogClose={ClosedEventCall}
          trnCode={isEmailNewRef.current?.TRAN_CD}
          compCode={isEmailNewRef.current?.COMP_CD}
        />
      ) : null}
      {isOpenEmail ? (
        <EmailTemplateWrapper
          open={isOpenEmail}
          handleDialogClose={ClosedEventCall}
          trnCode={isEmailNewRef.current?.TRAN_CD}
          compCode={isEmailNewRef.current?.COMP_CD}
        />
      ) : null}
    </>
  );
};

export const EmailSMSTemplateFormWrapper = ({
  handleDialogClose,
  isDataChangedRef,
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
            width: "100%",
          },
        }}
        maxWidth="md"
        classes={{
          scrollPaper: classes.topScrollPaper,
          paperScrollBody: classes.topPaperScrollBody,
        }}
      >
        <EmailSMSTemplateForm
          branchCode={rows[0]?.data.BRANCH_CD ?? ""}
          isDataChangedRef={isDataChangedRef}
          closeDialog={handleDialogClose}
          formView={"edit"}
        />
      </Dialog>
    </>
  );
};
