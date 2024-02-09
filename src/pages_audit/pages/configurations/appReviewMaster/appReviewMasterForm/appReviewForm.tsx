import { FC, useState, useContext, useRef } from "react";
import { useMutation } from "react-query";
import { InitialValuesType, SubmitFnType } from "packages/form";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import FormWrapper, { MetaDataType } from "components/dynamicForm";
import { useSnackbar } from "notistack";
import { useLocation } from "react-router-dom";
import { useDialogStyles } from "pages_audit/common/dialogStyles";
import { Transition } from "pages_audit/common/transition";
import * as API from "../api";
import { MobileAppReviewMetaData } from "./metaData";
import { PopupMessageAPIWrapper } from "components/custom/popupMessage";
import { AuthContext } from "pages_audit/auth";
import { extractMetaData, utilFunction } from "components/utils";
import { format } from "date-fns";

interface updateMasterDataType {
  data: any;
  displayData?: any;
  endSubmit?: any;
  setFieldError?: any;
}

const updateMasterDataWrapperFn =
  (updateAUTHDetailData) =>
  async ({ data }: updateMasterDataType) => {
    return updateAUTHDetailData({ data });
  };

const AppReviewUserForm: FC<{
  isDataChangedRef: any;
  closeDialog?: any;
  formView?: string;
}> = ({ isDataChangedRef, closeDialog, formView }) => {
  const { enqueueSnackbar } = useSnackbar();
  const isErrorFuncRef = useRef<any>(null);
  const [isOpenSave, setIsOpenSave] = useState(false);
  const { state: rows }: any = useLocation();
  const { authState } = useContext(AuthContext);

  const mutation = useMutation(API.updAppReviewGridData, {
    onError: (error: any) => {
      let errorMsg = "Unknown Error occured";
      if (typeof error === "object") {
        errorMsg = error?.error_msg ?? errorMsg;
      }
      // endSubmit(false, errorMsg, error?.error_detail ?? "");
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
      setIsOpenSave(false);
      closeDialog();
    },
  });
  const onActionCancel = () => {
    setIsOpenSave(false);
  };
  const onPopupYes = (rows) => {
    mutation.mutate({
      // userName: rows?.USER_NAME,
      tranDate: rows?.TRAN_DT,
      ...isErrorFuncRef.current,
    });
  };

  const onSubmitHandler: SubmitFnType = (
    data: any,
    displayData,
    endSubmit,
    setFieldError,
    actionFlag
  ) => {
    // @ts-ignore
    endSubmit(true);
    let newData = data;
    let oldData = rows?.[0]?.data;
    if (formView === "add") {
      newData["ACTIVE"] = "Y";
    } else {
      newData["ACTIVE"] = Boolean(newData["ACTIVE"]) ? "Y" : "N";
      oldData["ACTIVE"] = Boolean(oldData["ACTIVE"]) ? "Y" : "N";
    }

    let upd: any = utilFunction.transformDetailsData(newData, oldData ?? {});
    if (Boolean(upd?._OLDROWVALUE?.VALID_UPTO)) {
      upd._OLDROWVALUE.VALID_UPTO = format(
        new Date(upd?._OLDROWVALUE?.VALID_UPTO),
        "dd/MM/yyyy HH:mm:ss"
      );
    }
    if (Boolean(newData["VALID_UPTO"])) {
      newData["VALID_UPTO"] = format(
        new Date(newData["VALID_UPTO"]),
        "dd/MM/yyyy HH:mm:ss"
      );
    }
    newData = {
      ...newData,
      ...upd,
      TRAN_DT: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
      COMP_CD: authState.companyID,
      _isNewRow: formView === "add" ? true : false,
    };

    isErrorFuncRef.current = {
      data: newData,
      displayData,
      endSubmit,
      setFieldError,
    };
    if (isErrorFuncRef.current?.data?._UPDATEDCOLUMNS.length === 0) {
      closeDialog();
    } else {
      setIsOpenSave(true);
    }
  };
  return (
    <>
      <FormWrapper
        key={"MobileAppReviewGridMetaData"}
        // metaData={MobileAppReviewMetaData}
        metaData={
          extractMetaData(
            MobileAppReviewMetaData,
            formView === "add" ? "new" : "edit"
          ) as MetaDataType
        }
        initialValues={rows?.[0]?.data as InitialValuesType}
        onSubmitHandler={onSubmitHandler}
        //@ts-ignore
        displayMode={formView}
        formStyle={{
          background: "white",
          // height: "30vh",
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
              // disabled={isSubmitting}
              //endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
              color={"primary"}
            >
              Save
            </Button>
            <Button
              onClick={closeDialog}
              color={"primary"}
              // disabled={isSubmitting}
            >
              Cancel
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

export const ViewEditAppReviewUserFormWrapper = ({
  handleDialogClose,
  isDataChangedRef,
  formView,
}) => {
  const classes = useDialogStyles();
  return (
    <>
      <Dialog
        open={true}
        //@ts-ignore
        TransitionComponent={Transition}
        PaperProps={{
          style: {
            width: "65%",
          },
        }}
        maxWidth="lg"
        classes={{
          scrollPaper: classes.topScrollPaper,
          paperScrollBody: classes.topPaperScrollBody,
        }}
      >
        <AppReviewUserForm
          isDataChangedRef={isDataChangedRef}
          closeDialog={handleDialogClose}
          formView={formView}
        />
      </Dialog>
    </>
  );
};
