import { FC, useState, useRef, useMemo } from "react";
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
import { UserBlockConfigMetadata } from "./metaData";
import { PopupMessageAPIWrapper } from "components/custom/popupMessage";
import { utilFunction } from "components/utils";
import { extractMetaData } from "components/utils";

interface updateUserBlockConfigDataType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
  setLoading?: any;
}

const updateUserBlockConfigDataWrapperFn =
  (updateMasterData) =>
  async ({ data }: updateUserBlockConfigDataType) => {
    return updateMasterData(data);
  };

const UserBlockConfigForm: FC<{
  isDataChangedRef: any;
  closeDialog?: any;
  formView?: string;
}> = ({ isDataChangedRef, closeDialog, formView }) => {
  const { enqueueSnackbar } = useSnackbar();
  const isErrorFuncRef = useRef<any>(null);
  const [isOpenSave, setIsOpenSave] = useState(false);
  const { state: rows }: any = useLocation();
  const [formMode, setFormMode] = useState(formView);
  //const moveToViewMode = useCallback(() => setFormMode("view"), [setFormMode]);
  // const moveToEditMode = useCallback(() => setFormMode("edit"), [setFormMode]);

  // const result = useQuery(
  //   ["getinsuMasterFormData", formView, insuCode],
  //   () => API.getinsuMasterFormData({ formView, insuCode })
  // );

  const mutation = useMutation(
    updateUserBlockConfigDataWrapperFn(API.updateUserBlockConfigData),
    {
      onError: (error: any, { endSubmit }) => {
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
    mutation.mutate(isErrorFuncRef.current);
  };
  // const onPopupYes = (rows) => {
  //   mutation.mutate({
  //     ...isErrorFuncRef.current,
  //     CONFIRMED: "Y",
  //   });
  // };
  const onSubmitHandler: SubmitFnType = (
    data,
    displayData,
    endSubmit,
    setFieldError,
    actionFlag
  ) => {
    //@ts-ignore
    endSubmit(true);
    // if (!(formView === "add")) {
    let datanew = data;
    if (datanew.hasOwnProperty("AUTO_RELEASE")) {
      datanew["AUTO_RELEASE"] = !Boolean(datanew["AUTO_RELEASE"])
        ? false
        : true;
    }
    let updatedValue: any = utilFunction.transformDetailsData(
      datanew,
      rows?.[0]?.data
    );
    if (formView !== "new" && updatedValue?._UPDATEDCOLUMNS?.length === 0) {
      // closeDialog();
      setFormMode("view");
    } else {
      if (datanew.hasOwnProperty("AUTO_RELEASE")) {
        datanew["AUTO_RELEASE"] = Boolean(datanew["AUTO_RELEASE"]) ? "Y" : "N";
      }
      if (updatedValue?._OLDROWVALUE?.hasOwnProperty("AUTO_RELEASE")) {
        updatedValue._OLDROWVALUE["AUTO_RELEASE"] = Boolean(
          updatedValue._OLDROWVALUE["AUTO_RELEASE"]
        )
          ? "Y"
          : "N";
      }
      isErrorFuncRef.current = {
        data: {
          ...datanew,
          ...updatedValue,
          _isNewRow: false,
        },
        displayData,
        endSubmit,
        setFieldError,
      };
    }
    if (isErrorFuncRef.current && updatedValue?._UPDATEDCOLUMNS?.length > 0) {
      setIsOpenSave(true);
    }
  };

  const masterMetadata: MetaDataType = useMemo(
    () => extractMetaData(UserBlockConfigMetadata, formMode),
    [UserBlockConfigMetadata, formMode]
  ) as MetaDataType;

  return (
    <>
      <FormWrapper
        key={"userBlockConfigForm" + formMode}
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
            {formMode === "view" ? (
              <>
                <Button
                  onClick={() => {
                    setFormMode("edit");
                  }}
                  color={"primary"}
                >
                  Edit
                </Button>
                <Button
                  onClick={closeDialog}
                  color={"primary"}
                  //disabled={isSubmitting}
                >
                  Close
                </Button>
              </>
            ) : (
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
                  onClick={() => {
                    setFormMode("view");
                  }}
                  disabled={isSubmitting}
                  color={"primary"}
                >
                  Cancel
                </Button>
              </>
            )}
          </>
        )}
      </FormWrapper>

      {isOpenSave ? (
        <PopupMessageAPIWrapper
          MessageTitle="Confirmation"
          Message="Do you want to save this Record?"
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

export const UserBlockConfigFormWrapper = ({
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
            width: "50%",
          },
        }}
        maxWidth="md"
        classes={{
          scrollPaper: classes.topScrollPaper,
          paperScrollBody: classes.topPaperScrollBody,
        }}
      >
        <div
          style={{
            paddingBottom: "20px",
            paddingRight: "5px",
            paddingLeft: "5px",
          }}
        >
          <UserBlockConfigForm
            isDataChangedRef={isDataChangedRef}
            closeDialog={handleDialogClose}
            formView={formView}
          />
        </div>
      </Dialog>
    </>
  );
};
