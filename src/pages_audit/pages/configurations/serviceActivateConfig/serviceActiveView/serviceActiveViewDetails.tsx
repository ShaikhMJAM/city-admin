import { Button, Dialog } from "@mui/material";
import { PopupMessageAPIWrapper } from "components/custom/popupMessage";
import { useDialogStyles } from "components/detailPopupGridData";
import FormWrapper, { MetaDataType } from "components/dynamicForm";
import { useSnackbar } from "notistack";
import { FC, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { InitialValuesType, SubmitFnType } from "packages/form";
import { MarqueeMessageDetailsMetaData } from "./metaData";
import { Transition } from "pages_audit/common";
import { extractMetaData, utilFunction } from "components/utils";
import { useMutation } from "react-query";
import * as API from "../api";
import { StringtoUnicode } from "components/utils";

export const ServiceActiveDeactiveViewDetail: FC<{
  isDataChangedRef: any;
  closeDialog?: any;
  formView?: string;
}> = ({ isDataChangedRef, closeDialog, formView }) => {
  const { enqueueSnackbar } = useSnackbar();
  const isErrorFuncRef = useRef<any>(null);
  const [isOpenSave, setIsOpenSave] = useState(false);
  const { state: rows }: any = useLocation();
  const classes = useDialogStyles();
  const [formMode, setFormMode] = useState(formView);

  const mutation = useMutation(API.updateServiceActiveDeactiveConfig, {
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
      closeDialog();
    },
  });

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
      TRN_USER:
        typeof data?.TRN_USER === "boolean"
          ? Boolean(data?.TRN_USER)
            ? "Y"
            : "N"
          : data?.TRN_USER,
      VIEW_USER:
        typeof data?.VIEW_USER === "boolean"
          ? Boolean(data?.VIEW_USER)
            ? "Y"
            : "N"
          : data?.VIEW_USER,
      DISPLAY_MSG_BN: StringtoUnicode(data?.DISPLAY_MSG_BN ?? "").replaceAll(
        "\\u",
        "\\"
      ),
    };

    let oldData = {
      ...rows?.[0]?.data,
      DISPLAY_MSG_BN: StringtoUnicode(
        rows?.[0]?.data?.DISPLAY_MSG_BN ?? ""
      ).replaceAll("\\u", "\\"),
    };

    let upd = utilFunction.transformDetailsData(newData, oldData);

    isErrorFuncRef.current = {
      data: {
        ...newData,
        ...upd,
        _isNewRow: formView === "add" ? true : false,
      },
      displayData,
      endSubmit,
      setFieldError,
    };
    if (isErrorFuncRef.current?.data?._UPDATEDCOLUMNS.length === 0) {
      setFormMode("view");
    } else {
      setIsOpenSave(true);
    }
  };

  const onActionCancel = () => {
    setIsOpenSave(false);
  };
  const onPopupYes = (rowsData) => {
    mutation.mutate(rowsData);
  };

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
        <FormWrapper
          key={"ServiceActiveDeactiveForm" + formMode}
          metaData={
            extractMetaData(
              MarqueeMessageDetailsMetaData,
              formView === "add" ? "new" : "edit"
            ) as MetaDataType
          }
          initialValues={rows?.[0]?.data as InitialValuesType}
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
              {formMode === "edit" ? (
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
                    onClick={() => setFormMode("view")}
                    color={"primary"}
                    // disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </>
              ) : formMode === "view" ? (
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
              ) : null}
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
      </Dialog>
    </>
  );
};
