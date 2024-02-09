import { FC, useEffect, useState, useContext, useRef, useMemo } from "react";
import { useMutation } from "react-query";
import { queryClient } from "cache";
import { InitialValuesType, SubmitFnType } from "packages/form";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
// import FormWrapper from "components/dynamicForm";
import { useSnackbar } from "notistack";
import { useLocation } from "react-router-dom";
import { useDialogStyles } from "pages_audit/common/dialogStyles";
import { Transition } from "pages_audit/common/transition";
import * as API from "../api";
import { InsuMasterMetadata } from "./metaData";
import { PopupMessageAPIWrapper } from "components/custom/popupMessage";
import { StringtoUnicode, utilFunction } from "components/utils";
import { AuthContext } from "pages_audit/auth";
import { extractMetaData } from "components/utils";
import FormWrapper, { MetaDataType } from "components/dynamicForm";

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

const InsuMasterForm: FC<{
  isDataChangedRef: any;
  closeDialog?: any;
  formView?: string;
}> = ({ isDataChangedRef, closeDialog, formView }) => {
  const { enqueueSnackbar } = useSnackbar();
  const isErrorFuncRef = useRef<any>(null);
  const [isOpenSave, setIsOpenSave] = useState(false);
  const { state: rows }: any = useLocation();
  const authController = useContext(AuthContext);
  const [formMode, setFormMode] = useState(formView);

  const mutation = useMutation(
    updateMasterDataWrapperFn(API.updateOtherEntityData()),
    {
      onError: (error: any) => {
        let errorMsg = "Unknown Error occured";
        if (typeof error === "object") {
          errorMsg = error?.error_msg ?? errorMsg;
        }
        //endSubmit(false, errorMsg, error?.error_detail ?? "");
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
    }
  );
  const onActionCancel = () => {
    setIsOpenSave(false);
  };
  const onPopupYes = (rows) => {
    mutation.mutate({
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
    //@ts-ignore
    endSubmit(true);
    let newData = {
      ...data,
      POLICY_LABEL_BN: StringtoUnicode(data?.POLICY_LABEL_BN ?? "").replaceAll(
        "\\u",
        "\\"
      ),
    };

    let oldData = {
      ...rows?.[0]?.data,
      POLICY_LABEL_BN: StringtoUnicode(
        rows?.[0]?.data?.POLICY_LABEL_BN ?? ""
      ).replaceAll("\\u", "\\"),
    };
    let upd = utilFunction.transformDetailsData(newData, oldData);
    if (upd._UPDATEDCOLUMNS.length > 0) {
      isErrorFuncRef.current = {
        data: {
          ...newData,
          ...upd,
          COMP_CD: authController.authState.companyID,
          ENTITY_TYPE: "I",
          _isNewRow: formMode === "add" ? true : false,
        },
        displayData,
        endSubmit,
        setFieldError,
      };
      setIsOpenSave(true);
    } else {
      isErrorFuncRef.current = {
        data: {
          ...newData,
          ...upd,
          COMP_CD: authController.authState.companyID,
          ENTITY_TYPE: "I",
          _isNewRow: formMode === "add" ? true : false,
        },
        displayData,
        endSubmit,
        setFieldError,
      };
      setFormMode("view");
    }
    // if (isErrorFuncRef.current?.data?._UPDATEDCOLUMNS.length === 0) {
    // } else {
    //   setIsOpenSave(true);
    // }
  };

  useEffect(() => {
    return () => {
      queryClient.removeQueries(["getInsuMasterFormData", formView]);
    };
  }, [formView]);

  const masterMetadata: MetaDataType = useMemo(
    () => extractMetaData(InsuMasterMetadata, formMode),
    [InsuMasterMetadata, formMode, ""]
  ) as MetaDataType;

  return (
    <>
      <FormWrapper
        key={"InsuMasterForm" + formMode}
        metaData={masterMetadata}
        initialValues={rows?.[0]?.data as InitialValuesType}
        onSubmitHandler={onSubmitHandler}
        //@ts-ignore
        displayMode={formMode}
        formStyle={{
          background: "white",
          // height: "30vh",
          // overflowY: "auto",
          // overflowX: "hidden",
        }}
      >
        {({ isSubmitting, handleSubmit }) => (
          <>
            {formMode === "add" ? (
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
                  Close
                </Button>
              </>
            ) : formMode === "edit" ? (
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
                  onClick={() => {
                    setFormMode("view");
                  }}
                  color={"primary"}
                  // disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => {
                    setFormMode("edit");
                  }}
                  //disabled={isSubmitting}
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
            )}
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

export const InsuMasterFormWrapper = ({
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
            width: "80%",
          },
        }}
        maxWidth="lg"
        classes={{
          scrollPaper: classes.topScrollPaper,
          paperScrollBody: classes.topPaperScrollBody,
        }}
      >
        <InsuMasterForm
          isDataChangedRef={isDataChangedRef}
          closeDialog={handleDialogClose}
          formView={formView}
        />
      </Dialog>
    </>
  );
};
