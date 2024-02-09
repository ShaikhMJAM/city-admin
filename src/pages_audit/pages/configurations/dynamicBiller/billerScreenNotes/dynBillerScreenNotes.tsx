import { FC, useEffect, useState, useContext, useRef, useMemo } from "react";
import { useMutation, useQuery } from "react-query";
import { ClearCacheContext, queryClient } from "cache";
import { SubmitFnType } from "packages/form";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import FormWrapper, { MetaDataType } from "components/dynamicForm";
import { useSnackbar } from "notistack";
import { useLocation } from "react-router-dom";
import { useDialogStyles } from "pages_audit/common/dialogStyles";
import { Transition } from "pages_audit/common/transition";
import * as API from "../api";
import { DynBillerScreenNotesMetaData } from "./metaData";
import { PopupMessageAPIWrapper } from "components/custom/popupMessage";
import { AuthContext } from "pages_audit/auth";
import { StringtoUnicode, utilFunction } from "components/utils";
import { extractMetaData } from "components/utils";
import { LoaderPaperComponent } from "components/common/loaderPaper";
import IconButton from "@mui/material/IconButton";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { Alert } from "components/common/alert";

const DynBillerScreenNotes: FC<{
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

  const {
    data: screenNotes,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery<any, any>(
    [
      "getDynBillerScreenNotes",
      rows?.[0]?.data?.CATEGORY_ID,
      rows?.[0]?.data?.SUB_CATEGORY_ID,
      rows?.[0]?.data?.BILLER_ID,
    ],
    () =>
      API.getDynBillerScreenNotes(
        rows?.[0]?.data?.CATEGORY_ID,
        rows?.[0]?.data?.SUB_CATEGORY_ID,
        rows?.[0]?.data?.BILLER_ID
      )
  );
  const mutation = useMutation(API.updateDynamicBillerScreenNotes, {
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
      onActionCancel();
      closeDialog();
    },
  });

  const onActionCancel = () => {
    setIsOpenSave(false);
  };
  const onPopupYes = (rows) => {
    mutation.mutate(rows);
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
    const languageCodes = new Set();
    const duplicate = data?.screenNotes.some((note) => {
      if (languageCodes.has(note.LANGUAGE_CD)) {
        return true;
      }
      languageCodes.add(note.LANGUAGE_CD);
    });

    if (duplicate) {
      endSubmit(false, "Duplicate Language found.");
      return;
    }

    const newData = data?.screenNotes.map((note) => ({
      ...note,
      CATEGORY_ID: rows?.[0]?.data?.CATEGORY_ID,
      SUB_CATEGORY_ID: rows?.[0]?.data?.SUB_CATEGORY_ID,
      BILLER_ID: rows?.[0]?.data?.BILLER_ID,
      SCREEN_MSG: StringtoUnicode(note?.SCREEN_MSG)
        .replaceAll("\\u", "\\")
        .replaceAll("\r\n", "\n")
        .replaceAll("\n", "\r\n"),
    }));

    const finalData = utilFunction.transformDetailDataForDML(
      screenNotes?.screenNotes,
      newData,
      ["CATEGORY_ID", "SUB_CATEGORY_ID", "BILLER_ID", "LANGUAGE_CD"]
    );
    if (
      finalData?.isDeleteRow?.length === 0 &&
      finalData?.isNewRow?.length === 0 &&
      finalData?.isUpdatedRow?.length === 0
    ) {
      setFormMode("view");
    } else {
      isErrorFuncRef.current = {
        data: {
          DETAILS_DATA: finalData,
        },
        displayData,
        endSubmit,
        setFieldError,
      };
      setIsOpenSave(true);
    }
  };

  useEffect(() => {
    return () => {
      queryClient.removeQueries([
        "getDynBillerScreenNotes",
        rows?.[0]?.data?.CATEGORY_ID,
        rows?.[0]?.data?.SUB_CATEGORY_ID,
        rows?.[0]?.data?.BILLER_ID,
      ]);
    };
  }, [
    rows?.[0]?.data?.CATEGORY_ID,
    rows?.[0]?.data?.SUB_CATEGORY_ID,
    rows?.[0]?.data?.BILLER_ID,
  ]);

  const masterMetadata: MetaDataType = useMemo(() => {
    let newMetadata = extractMetaData(DynBillerScreenNotesMetaData, formMode);
    newMetadata.form.name = newMetadata.form.name + formMode;
    return newMetadata;
  }, [DynBillerScreenNotesMetaData, formMode]) as MetaDataType;

  let billerID = rows?.[0]?.data?.BILLER_ID;
  let billerName = rows?.[0]?.data?.BILLER_NAME;

  DynBillerScreenNotesMetaData.form.label =
    "Dynamic Biller Screen Notes : " + billerID + "(" + billerName + ")";

  return (
    <>
      {isLoading || isFetching ? (
        <>
          <LoaderPaperComponent />
          {typeof closeDialog === "function" ? (
            <div style={{ position: "absolute", right: 0, top: 0 }}>
              <IconButton onClick={closeDialog}>
                <HighlightOffOutlinedIcon />
              </IconButton>
            </div>
          ) : null}
        </>
      ) : isError === true ? (
        <>
          <div style={{ paddingRight: "50px" }}>
            <Alert
              severity="error"
              errorMsg={error?.error_msg ?? "Something went to wrong.."}
              errorDetail={error?.error_detail}
              color="error"
            />
          </div>
          {typeof closeDialog === "function" ? (
            <div style={{ position: "absolute", right: 0, top: 0 }}>
              <IconButton onClick={closeDialog}>
                <HighlightOffOutlinedIcon />
              </IconButton>
            </div>
          ) : null}
        </>
      ) : (
        <>
          <FormWrapper
            key={"dynBillerScreenNotes" + formMode}
            metaData={masterMetadata}
            initialValues={screenNotes ?? {}}
            onSubmitHandler={onSubmitHandler}
            //@ts-ignore
            // displayMode={formMode}
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
                      onClick={(event) => {
                        setFormMode("view");
                        // handleSubmit(event, "view");
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
                      onClick={(event) => {
                        setFormMode("edit");
                        // handleSubmit(event, "edit");
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
        </>
      )}
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

export const DynBillerScreenNotesWrapper = ({
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
        maxWidth="md"
        classes={{
          scrollPaper: classes.topScrollPaper,
          paperScrollBody: classes.topPaperScrollBody,
        }}
      >
        <DynBillerScreenNotes
          isDataChangedRef={isDataChangedRef}
          closeDialog={handleDialogClose}
          formView={formView}
        />
      </Dialog>
    </>
  );
};
