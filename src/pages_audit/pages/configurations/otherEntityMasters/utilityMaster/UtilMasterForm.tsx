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
import * as API from "../api";
import { UtilMasterMetadata } from "./metaData";
import { PopupMessageAPIWrapper } from "components/custom/popupMessage";
import { AuthContext } from "pages_audit/auth";
import { utilFunction } from "components/utils";
import { extractMetaData } from "components/utils";

const UtilMasterForm: FC<{
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

  //const moveToViewMode = useCallback(() => setFormMode("view"), [setFormMode]);
  // const moveToEditMode = useCallback(() => setFormMode("edit"), [setFormMode]);

  // const result = useQuery(
  //   ["getUtilMasterFormData", formView, UtilCode],
  //   () => API.getUtilMasterFormData({ formView, UtilCode })
  // );

  const mutation = useMutation(
    API.updateOtherEntityData(),

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
    data,
    displayData,
    endSubmit,
    setFieldError,
    actionFlag
  ) => {
    //@ts-ignore
    endSubmit(true);
    let upd = utilFunction.transformDetailsData(data, rows?.[0]?.data ?? {});
    if (upd._UPDATEDCOLUMNS.length > 0) {
      isErrorFuncRef.current = {
        data: {
          ...data,
          ...upd,
          COMP_CD: authController.authState.companyID,
          ENTITY_TYPE: "P",
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
          ...data,
          ...upd,
          COMP_CD: authController.authState.companyID,
          ENTITY_TYPE: "P",
          _isNewRow: formMode === "add" ? true : false,
        },
        displayData,
        endSubmit,
        setFieldError,
      };
      setFormMode("view");
    }
  };

  useEffect(() => {
    return () => {
      queryClient.removeQueries(["getUtilMasterFormData", formView]);
    };
  }, [formView]);

  const masterMetadata: MetaDataType = useMemo(
    () => extractMetaData(UtilMasterMetadata, formMode),
    [UtilMasterMetadata, formMode, ""]
  ) as MetaDataType;

  return (
    <>
      <FormWrapper
        key={"UtilMasterForm" + formMode}
        metaData={masterMetadata}
        initialValues={rows?.[0]?.data as InitialValuesType}
        onSubmitHandler={onSubmitHandler}
        //@ts-ignore
        // displayMode={formMode}
        displayMode={formMode}
        formStyle={{
          background: "white",
          height: "30vh",
          overflowY: "auto",
          overflowX: "hidden",
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

export const UtilMasterFormWrapper = ({
  handleDialogClose,
  isDataChangedRef,
  formView,
}) => {
  const classes = useDialogStyles();
  const { state: rows }: any = useLocation();
  const { getEntries } = useContext(ClearCacheContext);
  return (
    <>
      <Dialog
        open={true}
        //@ts-ignore
        TransitionComponent={Transition}
        PaperProps={{
          style: {
            width: "80%",
            // minHeight: "33vh",
            // height: "50vh",
          },
        }}
        maxWidth="lg"
        classes={{
          scrollPaper: classes.topScrollPaper,
          paperScrollBody: classes.topPaperScrollBody,
        }}
      >
        <UtilMasterForm
          isDataChangedRef={isDataChangedRef}
          closeDialog={handleDialogClose}
          formView={formView}
        />
      </Dialog>
    </>
  );
};
