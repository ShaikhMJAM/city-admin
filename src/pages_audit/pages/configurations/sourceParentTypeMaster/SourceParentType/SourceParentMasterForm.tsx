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
import { SourceParentMetaData } from "./metaData";
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

const SourceParentMasterForm: FC<{
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
  // console.log("rows", rows);
  const mutation = useMutation(
    updateAUTHDetailDataWrapperFn(API.updSourceParentGridData),

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
    if (!(formView === "add")) {
      let upd: any = utilFunction.transformDetailsData(data, rows?.[0]?.data);
      newData["SINGUP_ALLOW"] = Boolean(newData["SINGUP_ALLOW"]) ? "Y" : "N";
      newData["BENF_ALLOW"] = Boolean(newData["BENF_ALLOW"]) ? "Y" : "N";

      // console.log("upd0<<", upd)

      upd["_OLDROWVALUE"] = {
        ...upd["_OLDROWVALUE"],
        SINGUP_ALLOW: Boolean(upd["_OLDROWVALUE"]?.SINGUP_ALLOW) ? "Y" : "N",
        BENF_ALLOW: Boolean(upd["_OLDROWVALUE"]?.BENF_ALLOW) ? "Y" : "N",
      };
      // console.log("upd1<<", upd)
      // if (upd["_UPDATEDCOLUMNS"]?.length === 0) {
      //   closeDialog();
      //   return;
      // }
      newData = { ...newData, ...upd };
    } else {
      let newData = data;
      newData["SINGUP_ALLOW"] = Boolean(newData["SINGUP_ALLOW"]) ? "Y" : "N";
      newData["BENF_ALLOW"] = Boolean(newData["BENF_ALLOW"]) ? "Y" : "N";
    }
    newData["_isNewRow"] = formView === "add" ? true : false;
    newData["COMP_CD"] = authController.authState.companyID;
    isErrorFuncRef.current = {
      data: newData,
      displayData,
      endSubmit,
      setFieldError,
    };
    // console.log("ref<<", isErrorFuncRef.current)
    if (isErrorFuncRef.current?.data?._UPDATEDCOLUMNS?.length === 0) {
      setFormMode("view");
    } else setIsOpenSave(true);
  };
  const masterMetadata: MetaDataType = useMemo(
    () => extractMetaData(SourceParentMetaData, formView),
    [SourceParentMetaData, formView, ""]
  ) as MetaDataType;
  return (
    <>
      <FormWrapper
        key={"sourceparentform" + formMode}
        metaData={masterMetadata}
        initialValues={(rows?.[0]?.data ?? {}) as InitialValuesType}
        onSubmitHandler={onSubmitHandler}
        //@ts-ignore
        displayMode={formMode}
        formStyle={{
          background: "white",
          // height: "40vh",
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

export const SourceParentTypeFormWrapper = ({
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
          },
        }}
        maxWidth="md"
        classes={{
          scrollPaper: classes.topScrollPaper,
          paperScrollBody: classes.topPaperScrollBody,
        }}
      >
        <SourceParentMasterForm
          isDataChangedRef={isDataChangedRef}
          closeDialog={handleDialogClose}
          formView={formView}
        />
      </Dialog>
    </>
  );
};
