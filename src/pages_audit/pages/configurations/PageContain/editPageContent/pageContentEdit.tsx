import { FC, useState, useRef, useContext } from "react";
import { useMutation } from "react-query";
import { InitialValuesType, SubmitFnType } from "packages/form";
import FormWrapper, { MetaDataType } from "components/dynamicForm";
import { useSnackbar } from "notistack";
import { useLocation } from "react-router-dom";
import { useDialogStyles } from "pages_audit/common/dialogStyles";
import { Transition } from "pages_audit/common/transition";
import * as API from "../api";
import { PageContentEditMetadata } from "./metaData";
import { Button, CircularProgress, Dialog } from "@mui/material";
import { StringtoUnicode, utilFunction } from "components/utils";
import "../../../profile/style.css";
import { AuthContext } from "pages_audit/auth";
import { PopupMessageAPIWrapper } from "components/custom/popupMessage";
interface updateMasterDataType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
}

const updateMasterDataWrapperFn =
  (updateMasterData) =>
  async ({ data }: updateMasterDataType) => {
    return updateMasterData(data);
  };

const CardBinImageEntry: FC<{
  isDataChangedRef: any;
  handleDialogClose?: any;
  defaultmode: string;
}> = ({ isDataChangedRef, handleDialogClose, defaultmode }) => {
  // const { authState } = useContext(AuthContext);

  const { enqueueSnackbar } = useSnackbar();
  const [formMode, setFormMode] = useState(defaultmode);
  const isErrorFuncRef = useRef<any>(null);
  const { state: rows }: any = useLocation();
  const [isOpenSave, setIsOpenSave] = useState(false);
  const authController = useContext(AuthContext);
  const result = useMutation(updateMasterDataWrapperFn(API.updatePageContent), {
    onError: (error: any, { endSubmit }) => {
      let errorMsg = "Unknown Error occured";
      if (typeof error === "object") {
        errorMsg = error?.error_msg ?? errorMsg;
      }
      endSubmit(false, errorMsg, error?.error_detail ?? "");
      handleDialogClose();
    },
    onSuccess: (data, { endSubmit }) => {
      endSubmit(true, "");
      enqueueSnackbar(data, {
        variant: "success",
      });
      isDataChangedRef.current = true;

      handleDialogClose();
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
    console.log("<<data", data);
    let newData = {
      ...data,
      DETAIL_DATA: StringtoUnicode(data?.DETAIL_DATA ?? "").replaceAll(
        "\\u",
        "\\"
      ),
    };

    let oldData = {
      ...rows?.[0]?.data,
      DETAIL_DATA: StringtoUnicode(
        rows?.[0]?.data?.DETAIL_DATA ?? ""
      ).replaceAll("\\u", "\\"),
    };

    let upd = utilFunction.transformDetailsData(newData, oldData);

    isErrorFuncRef.current = {
      data: {
        ...newData,
        ...upd,
        COMP_CD: authController.authState.companyID,
      },
      displayData,
      endSubmit,
      setFieldError,
    };
    if (isErrorFuncRef.current?.data?._UPDATEDCOLUMNS.length === 0) {
      setFormMode("view");
    } else {
      console.log("<<isErrorFuncRef.current", isErrorFuncRef.current);
      // result.mutate(isErrorFuncRef.current);
      setIsOpenSave(true);
    }
  };

  const onActionCancel = () => {
    setIsOpenSave(false);
  };
  const onPopupYes = (rowsData) => {
    result.mutate(isErrorFuncRef.current);
  };

  return (
    <>
      <FormWrapper
        key={`pageEditDetail` + formMode}
        metaData={PageContentEditMetadata as MetaDataType}
        initialValues={rows?.[0]?.data as InitialValuesType}
        onSubmitHandler={onSubmitHandler}
        //@ts-ignore
        displayMode={formMode}
        formStyle={{
          background: "white",
          // height: "calc(42vh - 100px)",
          // overflowY: "auto",
          // overflowX: "hidden",
        }}
        containerstyle={{ padding: "10px" }}
      >
        {({ isSubmitting, handleSubmit }) => (
          <>
            {formMode === "edit" ? (
              <>
                <Button
                  // endIcon={
                  //   result.isLoading ? <CircularProgress size={20} /> : null
                  // }
                  onClick={(event) => {
                    handleSubmit(event, "Save");
                  }}
                  color={"primary"}
                  // ref={inputButtonRef}
                >
                  Save
                </Button>
                <Button
                  onClick={() => {
                    setFormMode("view");
                  }}
                  color={"primary"}
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
                  onClick={handleDialogClose}
                  //disabled={isSubmitting}
                  endIcon={
                    result.isLoading ? <CircularProgress size={20} /> : null
                  }
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
          Message="Do you want to save this Record?"
          onActionYes={(rowVal) => onPopupYes(rowVal)}
          onActionNo={() => onActionCancel()}
          rows={isErrorFuncRef.current?.data}
          open={isOpenSave}
          loading={result.isLoading}
        />
      ) : null}
    </>
  );
};

export const PageContainEditWrapper = ({
  handleDialogClose,
  isDataChangedRef,
  defaultmode,
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
            // minHeight: "36vh",
            // height: "36vh",
          },
        }}
        maxWidth="md"
        classes={{
          scrollPaper: classes.topScrollPaper,
          paperScrollBody: classes.topPaperScrollBody,
        }}
      >
        <CardBinImageEntry
          isDataChangedRef={isDataChangedRef}
          handleDialogClose={handleDialogClose}
          defaultmode={defaultmode}
        />
      </Dialog>
    </>
  );
};
