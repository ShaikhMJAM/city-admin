import {
  FC,
  useEffect,
  useState,
  useContext,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useMutation, useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { ClearCacheContext, queryClient } from "cache";
import { InitialValuesType, SubmitFnType } from "packages/form";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import FormWrapper, { MetaDataType } from "components/dynamicForm";
import { useSnackbar } from "notistack";
import { useDialogStyles } from "pages_audit/common/dialogStyles";
import { Transition } from "pages_audit/common/transition";
import * as API from "../api";
import { FileconfigMasterFormMetadata } from "./metaData";
import { PopupMessageAPIWrapper } from "components/custom/popupMessage";
import { extractMetaData, utilFunction } from "components/utils";
import { AuthContext } from "pages_audit/auth";
import { format } from "date-fns";
import { UploadTarget } from "components/fileUpload/uploadTarget";
import { FileObjectType } from "components/fileUpload/type";
import { transformFileObject } from "components/fileUpload/utils";
import {
  ImageViewer,
  NoPreview,
  PDFViewer,
} from "components/fileUpload/preView";
import { LoaderPaperComponent } from "components/common/loaderPaper";
import { Box, IconButton, Typography } from "@mui/material";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { Alert } from "components/common/alert";

interface updateAUTHDetailDataType {
  data: any;
  displayData?: any;
  endSubmit?: any;
  setFieldError?: any;
  formData?: any;
}

const updateAUTHDetailDataWrapperFn =
  (updateAUTHDetailData) =>
  async ({ data }: updateAUTHDetailDataType) => {
    return updateAUTHDetailData({ data });
  };

const FileconfigMasterForm: FC<{
  isDataChangedRef: any;
  closeDialog?: any;
  formView?: string;
}> = ({ isDataChangedRef, closeDialog, formView }) => {
  const { enqueueSnackbar } = useSnackbar();
  const isErrorFuncRef = useRef<any>(null);
  const [isOpenSave, setIsOpenSave] = useState(false);
  const { state: rows }: any = useLocation();
  const [files, setFiles] = useState<any>([]);
  const filesRef = useRef<any>(null);
  const authController = useContext(AuthContext);

  const result: any = useQuery(
    ["getConfigFileData", rows?.TRAN_CD, formView],
    () => API.getConfigFileData(rows?.TRAN_CD, formView)
  );

  useEffect(() => {
    return () => {
      queryClient.removeQueries(["getConfigFileData", rows?.TRAN_CD, formView]);
    };
  }, [rows?.TRAN_CD, formView]);

  useEffect(() => {
    if (!result?.isLoading) {
      let fileData = {
        FILE_DATA: utilFunction.blobToFile(
          utilFunction.base64toBlob(
            result?.data?.[0]?.FILE_DATA,
            rows?.FILE_TYPE === "pdf"
              ? "application/pdf"
              : "image/" + rows?.FILE_TYPE
          ),
          rows?.FILE_NAME
        ),
        FILE_TYPE: rows?.FILE_TYPE,
        FILE_NAME: rows?.FILE_NAME,
      };
      setFiles(fileData);
    }
  }, [result?.data]);

  const mutation = useMutation(
    updateAUTHDetailDataWrapperFn(API.updFileconfigMasterFormData),

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
      // tranDate: rows?.TRAN_DT,
      // fileName: rows?.FILE_NAME,
      // fileType: rows?.FILE_TYPE,
      // transactionID: rows?.TRAN_CD,
      // dataFile: isFileRef.current?.base64Object,
      ...isErrorFuncRef.current,
    });
  };

  const customTransformFileObj = (currentObj) => {
    return transformFileObject({})(currentObj);
  };
  const validateFilesAndAddToListCB = useCallback(
    async (newFiles: File[], existingFiles: FileObjectType[] | undefined) => {
      if (newFiles.length > 0) {
        let resdata = newFiles.map((one) => customTransformFileObj(one));
        if (resdata.length > 0) {
          let filesObj: any = await Promise.all(resdata);

          let fileExt = filesObj?.[0]?.fileExt?.toUpperCase();
          if (fileExt === "PDF") {
            let fileSize = filesObj?.[0]?.size / 1024 / 1024;
            if (fileSize <= 5) {
              setFiles(filesObj[0]);
            } else {
              enqueueSnackbar("File size should be less than 5 MB.", {
                variant: "warning",
              });
            }
          } else {
            enqueueSnackbar("Please Select PDF File only.", {
              variant: "warning",
            });
          }
        }
      }
    },
    [files, setFiles]
  );

  const onSubmitHandler: SubmitFnType = async (
    data,
    displayData,
    endSubmit,
    setFieldError,
    actionFlag
  ) => {
    //@ts-ignore
    endSubmit(true);
    // if (formView === "new" && !filesRef.current?.blob) {
    //   enqueueSnackbar("Please upload the required file!", { variant: "error" })
    //   return
    // }
    let base64Data = await utilFunction.convertBlobToBase64(
      filesRef?.current?.blob ?? filesRef?.current?.FILE_DATA
    );
    let newData = {
      ...data,
      //comment by altaf 12-09-23
      // FILE_NAME:
      //   filesRef?.current?.name ??
      //   filesRef?.current?.FILE_NAME ??
      //   "" +
      //   "." +
      //   (filesRef?.current?.fileExt ?? filesRef?.current?.FILE_TYPE ?? ""),
      FILE_NAME: filesRef?.current.name ?? filesRef?.current?.FILE_NAME ?? "",
      FILE_TYPE:
        filesRef?.current?.fileExt ?? filesRef?.current?.FILE_TYPE ?? "",
      FILE_DATA: base64Data[1],
      TRAN_DT: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
    };
    let upd = utilFunction.transformDetailsData(
      newData,
      { ...rows, FILE_DATA: result?.data?.[0]?.FILE_DATA } ?? {}
    );

    /**
     * by altaf
     * updating condition check from 0 to 1 because by default there is TRAN_DT present in _UPDATEDCOLUMNS
     */
    if (formView !== "new" && upd?._UPDATEDCOLUMNS?.length === 1) {
      closeDialog();
    } else {
      isErrorFuncRef.current = {
        data: {
          ...newData,
          ...upd,
          COMP_CD: authController.authState.companyID,
          _isNewRow: formView === "new" ? true : false,
          TRAN_DT: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
          FILE_DATA: upd?._UPDATEDCOLUMNS?.includes("FILE_DATA")
            ? newData?.FILE_DATA
            : "",
        },
        displayData,
        endSubmit,
        setFieldError,
      };
      console.log(isErrorFuncRef.current);
      setIsOpenSave(true);
    }
  };

  const masterMetadata: MetaDataType = useMemo(
    () => extractMetaData(FileconfigMasterFormMetadata, formView),
    [FileconfigMasterFormMetadata, formView, ""]
  ) as MetaDataType;

  return (
    <>
      {result.isLoading ? (
        <div style={{ margin: "2rem" }}>
          <LoaderPaperComponent />
          {typeof closeDialog === "function" ? (
            <div style={{ position: "absolute", right: 0, top: 0 }}>
              <IconButton onClick={closeDialog}>
                <HighlightOffOutlinedIcon />
              </IconButton>
            </div>
          ) : null}
        </div>
      ) : result.isError === true ? (
        <>
          <Alert
            severity="error"
            errorMsg={result?.error?.error_msg ?? "Something went to wrong.."}
            errorDetail={result?.error?.error_detail}
            color="error"
            style={{ paddingRight: "50px" }}
          />
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
            key={"FileconfigMasterForm"}
            metaData={masterMetadata}
            initialValues={(rows ?? {}) as InitialValuesType}
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
                    filesRef.current = files;
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
            )}
          </FormWrapper>
          <Box sx={{ p: 1 }}>
            <UploadTarget
              existingFiles={files}
              onDrop={validateFilesAndAddToListCB}
              disabled={false}
            />
          </Box>

          {files &&
          ((files?._mimeType?.includes?.("pdf") ?? false) ||
            (files?.FILE_TYPE?.includes?.("pdf") ?? false)) ? (
            <PDFViewer
              blob={files?.blob ?? files?.FILE_DATA}
              fileName={files?.name ?? files?.FILE_NAME}
            />
          ) : files &&
            ((files?._mimeType?.includes?.("image") ?? false) ||
              (files?._mimeType?.includes?.("jpg") ?? false) ||
              (files?._mimeType?.includes?.("jpeg") ?? false) ||
              (files?._mimeType?.includes?.("png") ?? false) ||
              (files?.FILE_TYPE?.includes?.("image") ?? false) ||
              (files?.FILE_TYPE?.includes?.("jpg") ?? false) ||
              (files?.FILE_TYPE?.includes?.("jpeg") ?? false) ||
              (files?.FILE_TYPE?.includes?.("png") ?? false)) ? (
            <ImageViewer
              blob={files?.blob ?? files?.FILE_DATA}
              fileName={files?.name ?? files?.FILE_NAME}
            />
          ) : files && files.length > 0 ? (
            <NoPreview
              fileName={files?.name ?? files?.FILE_NAME}
              message={"No preview available for the file"}
            />
          ) : (
            <div style={{ padding: "9px" }}>
              <Typography>No file found to preview!</Typography>
            </div>
          )}
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

export const FileconfigMasterFormWrapper = ({
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
            height: "90%",
          },
        }}
        maxWidth="md"
        classes={{
          scrollPaper: classes.topScrollPaper,
          paperScrollBody: classes.topPaperScrollBody,
        }}
      >
        <FileconfigMasterForm
          isDataChangedRef={isDataChangedRef}
          closeDialog={handleDialogClose}
          formView={formView}
        />
      </Dialog>
    </>
  );
};
