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
import { MSProperitiesFormMetadata } from "./metadata";
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
    return updateAUTHDetailData(data);
  };

const MSProperitiesForm: FC<{
  isDataChangedRef: any;
  closeDialog?: any;
  formView?: any;
  initialValues?: any;
}> = ({ isDataChangedRef, closeDialog, formView, initialValues }) => {
  const { enqueueSnackbar } = useSnackbar();
  const isErrorFuncRef = useRef<any>(null);
  const [isOpenSave, setIsOpenSave] = useState(false);
  const { state: rows }: any = useLocation();
  const authController = useContext(AuthContext);

  const mutation = useMutation(
    updateAUTHDetailDataWrapperFn(API.updateMsPropertiesData),

    {
      onError: (error: any, { endSubmit }) => {
        let errorMsg = "Unknown Error occured";
        if (typeof error === "object") {
          errorMsg = error?.error_msg ?? errorMsg;
        }
        endSubmit(false, errorMsg, error?.error_detail ?? "");
        // enqueueSnackbar(errorMsg, { variant: "error" });
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
    data["DISPLAY"] = "Y";
    endSubmit(true);
    let upd = utilFunction.transformDetailsData(data, initialValues ?? {});
    if (formView !== "add" && upd?._UPDATEDCOLUMNS?.length === 0) {
      closeDialog();
    } else {
      isErrorFuncRef.current = {
        data: {
          ...data,
          // ...reqData,
          ...upd,
          DEFAULT_DATA: "Y",
          _isNewRow: formView === "add" ? true : false,
        },
        displayData,
        endSubmit,
        setFieldError,
      };
      // setIsOpenSave(true);
    }
    setIsOpenSave(true);
  };
  const masterMetadata: MetaDataType = useMemo(
    () => extractMetaData(MSProperitiesFormMetadata, formView),
    [MSProperitiesFormMetadata, formView]
  ) as MetaDataType;
  return (
    <>
      <FormWrapper
        key={"MSProperitiesForm" + formView}
        metaData={masterMetadata}
        // initialValues={(rows?.[0]?.data ?? {}) as InitialValuesType}
        initialValues={initialValues}
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

export const MSProperitiesFormWrapper = ({
  handleDialogClose,
  isDataChangedRef,
  formView,
  initialValues,
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
            marginTop: "250px",
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
        <MSProperitiesForm
          isDataChangedRef={isDataChangedRef}
          closeDialog={handleDialogClose}
          formView={formView}
          initialValues={initialValues}
        />
      </Dialog>
    </>
  );
};
