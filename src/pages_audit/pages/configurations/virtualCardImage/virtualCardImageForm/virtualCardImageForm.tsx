import { FC, useEffect, useState, useRef, useMemo, useContext } from "react";
import { useMutation, useQuery } from "react-query";
import { InitialValuesType, SubmitFnType } from "packages/form";
import FormWrapper, { MetaDataType } from "components/dynamicForm";
import { useSnackbar } from "notistack";
import { useLocation } from "react-router-dom";
import { useDialogStyles } from "pages_audit/common/dialogStyles";
import { Transition } from "pages_audit/common/transition";
import * as API from "../api";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { CardImageEntryMetaData } from "./metaData";
import { PopupMessageAPIWrapper } from "components/custom/popupMessage";
import { useStyles } from "../../../profile/profilePhotoUpload/style";
import { transformFileObject } from "components/fileUpload/utils";
import {
  Grid,
  Tooltip,
  Typography,
  Button,
  Dialog,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { extractMetaData, utilFunction } from "components/utils";
import { queryClient } from "cache";
import { AuthContext } from "pages_audit/auth";
import { LoaderPaperComponent } from "components/common/loaderPaper";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import "../../../profile/style.css";
import { Alert } from "components/common/alert";

const useTypeStyles = makeStyles((theme) => ({
  title: {
    flex: "1 1 100%",
    color: "var(--theme-color1)",
    textAlign: "center",
  },
  typography: {
    flex: "1 1 100%",
    color: "var(--theme-color1)",
    textAlign: "left",
  },
  refreshiconhover: {},
}));

interface updateMasterDataType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
}

const updateMasterDataWrapperFn =
  (updateMasterData) =>
  async ({ data }: updateMasterDataType) => {
    return updateMasterData({ data });
  };

const CardImageForm: FC<{
  isDataChangedRef: any;
  closeDialog?: any;
  defaultmode: string;
  transactionID: any;
}> = ({ isDataChangedRef, closeDialog, defaultmode, transactionID }) => {
  // const { authState } = useContext(AuthContext);
  const authController = useContext(AuthContext);
  const headerClasses = useTypeStyles();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [formMode, setFormMode] = useState(defaultmode);
  const isErrorFuncRef = useRef<any>(null);
  const fileUploadControl = useRef<any | null>(null);
  const [isOpenSave, setIsOpenSave] = useState(false);
  const { state: rows }: any = useLocation();
  const [filecnt, setFilecnt] = useState(0);
  const fileURL = useRef<any | null>(null);
  const filesdata = useRef<any | null>(null);
  const fileName = useRef<any | null>(null);
  const submitBtnRef = useRef<any | null>(null);
  const [rowData, setRowData] = useState({});
  const [isOpenAccept, setIsOpenAccept] = useState(false);
  const [isOpenReject, setIsOpenReject] = useState(false);

  const result: any = useQuery(["getVirtualCardImage", transactionID], () =>
    API.getVirtualCardImage(transactionID, formMode)
  );

  useEffect(() => {
    return () => {
      queryClient.removeQueries(["getVirtualCardImage", transactionID]);
    };
  }, [transactionID]);

  const mutation = useMutation(updateMasterDataWrapperFn(API.updateCardImage), {
    onError: (error: any, { endSubmit }) => {
      let errorMsg = "Unknown Error occured";
      if (typeof error === "object") {
        errorMsg = error?.error_msg ?? errorMsg;
      }
      endSubmit(false, errorMsg, error?.error_detail ?? "");
      onActionCancel();
    },
    onSuccess: (data, { endSubmit }) => {
      endSubmit(true, "");
      enqueueSnackbar(data, {
        variant: "success",
      });
      isDataChangedRef.current = true;
      if (typeof closeDialog === "function") {
        closeDialog();
      }
    },
  });

  const resultConfirm = useMutation(API.virtualCardConfig, {
    onSuccess: (response: any) => {
      enqueueSnackbar(response, { variant: "success" });
      isDataChangedRef.current = true;
      closeDialog();
    },
    onError: (error: any) => {
      enqueueSnackbar(error?.error_msg ?? "error", { variant: "error" });
    },
    onSettled: () => {
      onActionCancel();
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

    data["ACTIVE"] =
      formMode === "add"
        ? "Y"
        : data["ACTIVE"] === "Y" || data["ACTIVE"] === true
        ? "Y"
        : "N";
    data["CARD_IMAGE"] = filesdata.current ?? "";

    let oldData = {
      ...rows?.[0]?.data,
      CONFIRMED: Boolean(rows?.[0]?.data?.CONFIRMED) ? "Y" : "N",
      CARD_IMAGE: result?.[0]?.data?.[0]?.CARD_IMAGE,
    };

    let upd = utilFunction.transformDetailsData(data, oldData);

    if (upd._UPDATEDCOLUMNS.length > 0) {
      let updatedColumns = upd._UPDATEDCOLUMNS;
      let isCardImageUpdated = updatedColumns.some(
        (item) => item === "CARD_IMAGE"
      );

      if (isCardImageUpdated || formMode === "add") {
        upd["CACHE_ID"] = utilFunction.generateUUID();
        upd["_OLDROWVALUE"] = {
          ...upd["_OLDROWVALUE"],
          CACHE_ID: oldData?.CACHE_ID,
        };
        upd["_UPDATEDCOLUMNS"] = [...upd["_UPDATEDCOLUMNS"], "CACHE_ID"];
      }

      isErrorFuncRef.current = {
        data: {
          ...data,
          ...upd,
          // updImg,

          // CACHE_ID: updImg,
          _isNewRow: formMode === "add" ? true : false,
          isDeleteRow: false,
        },
        displayData,
        endSubmit,
        setFieldError,
      };
      setIsOpenSave(true);
    } else {
      setFormMode("view");
    }
  };

  const onAcceptPopupYes = (rowVal) => {
    resultConfirm.mutate({
      confirmed: "Y",
      tran_cd: rows[0]?.data?.TRAN_CD ?? "",
    });
  };
  const onRejectPopupYes = (rowVal) => {
    resultConfirm.mutate({
      confirmed: "R",
      tran_cd: rows[0]?.data?.TRAN_CD ?? "",
    });
  };

  const onPopupYes = (rows) => {
    mutation.mutate(isErrorFuncRef.current);
  };

  const onActionCancel = () => {
    setIsOpenSave(false);
    setIsOpenAccept(false);
    setIsOpenReject(false);
  };

  const customTransformFileObj = (currentObj) => {
    return transformFileObject({})(currentObj);
  };

  const handleFileSelect = async (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files);
    if (filesArray.length > 0) {
      let resdata = filesArray.map((one) => customTransformFileObj(one));
      if (resdata.length > 0) {
        let filesObj: any = await Promise.all(resdata);

        let fileExt = filesObj?.[0]?.fileExt?.toUpperCase();
        if (fileExt === "JPG" || fileExt === "JPEG" || fileExt === "PNG") {
          let fileSize = filesObj?.[0]?.size / 1024 / 1024;

          if (fileSize <= 5) {
            fileURL.current =
              typeof filesObj?.[0]?.blob === "object" &&
              Boolean(filesObj?.[0]?.blob)
                ? await URL.createObjectURL(filesObj?.[0]?.blob as any)
                : null;
            setImageData(filesObj?.[0]?.blob);

            fileName.current = filesObj?.[0]?.blob?.name;
            //submitBtnRef.current?.click?.();
            setFilecnt(filecnt + 1);
          } else {
            enqueueSnackbar("Image size should be less than 5 MB.", {
              variant: "warning",
            });
          }
        } else {
          enqueueSnackbar("Please Select Valid Format.", {
            variant: "warning",
          });
        }
      }
    }
  };
  const setImageData = async (blob) => {
    let base64 = await utilFunction.convertBlobToBase64(blob);
    filesdata.current = base64?.[1];
  };

  const setImageURL = async (filedata) => {
    if (filedata !== null) {
      let blob = utilFunction.base64toBlob(filedata, "image/png");
      fileURL.current =
        typeof blob === "object" && Boolean(blob)
          ? await URL.createObjectURL(blob as any)
          : null;
      setFilecnt(filecnt + 1);
    }
  };

  useEffect(() => {
    if (Boolean(result?.data?.[0]?.CARD_IMAGE)) {
      setImageURL(result?.data?.[0]?.CARD_IMAGE);
      filesdata.current = result?.data?.[0]?.CARD_IMAGE;
    }
  }, [result?.data?.[0]?.CARD_IMAGE]);

  let isError = result.isError;
  let errorMsg = `${result.error?.error_msg}`;
  errorMsg = Boolean(errorMsg.trim()) ? errorMsg : "Unknown error occured";

  const masterMetadata: MetaDataType = useMemo(
    () =>
      extractMetaData(
        CardImageEntryMetaData,
        formMode === "add" ? "New" : formMode === "confirm" ? "view" : formMode
      ),
    [CardImageEntryMetaData, formMode, ""]
  ) as MetaDataType;
  if (formMode === "confirm") {
    masterMetadata.form.label = "Virtual Card Image Confirmation";
  } else {
    masterMetadata.form.label = "Virtual Card Image Configuration";
  }
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
      ) : isError ? (
        <>
          <span>{errorMsg}</span>
          <div style={{ margin: "1.2rem" }}>
            <Alert
              severity="error"
              errorMsg={errorMsg ?? "Something went to wrong.."}
              errorDetail={result?.error?.error_detail ?? ""}
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
      ) : formMode === "edit" ||
        formMode === "add" ||
        formMode === "view" ||
        formMode === "confirm" ? (
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <FormWrapper
              key={"CardImageUpload" + formMode}
              metaData={masterMetadata}
              initialValues={rows?.[0]?.data as InitialValuesType}
              onSubmitHandler={onSubmitHandler}
              //@ts-ignore
              displayMode={
                formMode === "confirm"
                  ? "view"
                  : formMode === "add"
                  ? "new"
                  : formMode
              }
              formStyle={{
                background: "white",
                // height: "55vh",
                // overflowY: "auto",
                // overflowX: "hidden",
              }}
            >
              {({ isSubmitting, handleSubmit }) => (
                <>
                  {formMode === "confirm" ? (
                    <>
                      <Button
                        onClick={(event) => {
                          if (
                            (
                              rows[0]?.data?.LAST_ENTERED_BY || ""
                            ).toLowerCase() ===
                            (
                              authController?.authState?.user?.id || ""
                            ).toLowerCase()
                          ) {
                            enqueueSnackbar(
                              "You can not accept your own entry.",
                              {
                                variant: "warning",
                              }
                            );
                          } else {
                            setIsOpenAccept(true);
                          }
                        }}
                        color="primary"
                      >
                        Accept
                      </Button>

                      <Button
                        onClick={() => {
                          if (
                            (
                              rows[0]?.data?.LAST_ENTERED_BY || ""
                            ).toLowerCase() ===
                            (
                              authController?.authState?.user?.id || ""
                            ).toLowerCase()
                          ) {
                            enqueueSnackbar(
                              "You can not reject your own entry.",
                              {
                                variant: "warning",
                              }
                            );
                          } else {
                            setIsOpenReject(true);
                          }
                          // setFormMode("view");
                        }}
                        color={"primary"}
                      >
                        Reject
                      </Button>
                      <Button
                        onClick={closeDialog}
                        //disabled={isSubmitting}
                        color={"primary"}
                      >
                        Close
                      </Button>
                    </>
                  ) : formMode === "edit" || formMode === "add" ? (
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
                        onClick={
                          formMode === "add"
                            ? closeDialog
                            : () => {
                                setFormMode("view");
                                if (Boolean(result?.data?.[0]?.CARD_IMAGE)) {
                                  setImageURL(result?.data?.[0]?.CARD_IMAGE);
                                  filesdata.current =
                                    result?.data?.[0]?.CARD_IMAGE;
                                } else {
                                  fileURL.current = "";
                                }
                              }
                        }
                        //disabled={isSubmitting}
                        color={"primary"}
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
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            style={{ paddingBottom: "10px", background: "white" }}
          >
            <Typography
              className={headerClasses.title}
              color="inherit"
              variant={"h6"}
              component="div"
            >
              Card Image
            </Typography>
            <Tooltip
              key={"tooltip-" + formMode}
              title={
                formMode === "view" || formMode === "confirm"
                  ? ""
                  : "Click to upload the Card Image"
              }
              placement={"top"}
              arrow={true}
            >
              <div
                className={classes.uploadWrapper}
                style={{
                  width: "310px",
                  height: "200px",
                  background: "#cfcfcf",
                  cursor:
                    formMode === "edit" || formMode === "add"
                      ? "pointer"
                      : "auto",
                  margin: "10px",
                  padding: "4px",
                  borderRadius: "2%",
                }}
                // onDoubleClick={() => {
                //   if (formMode === "edit" || formMode === "add") {
                //     fileUploadControl?.current?.click();
                //   }
                // }}
                ref={submitBtnRef}
                key={"div" + filecnt}
              >
                <Grid
                  container
                  spacing={0}
                  justifyContent="center"
                  alignItems="center"
                >
                  <img
                    src={Boolean(fileURL.current) ? fileURL.current : ""}
                    style={{
                      maxWidth: "300px",
                      minWidth: "300px",
                      maxHeight: "190px",
                      minHeight: "190px",
                    }}
                  />
                </Grid>
                {formMode === "edit" || formMode === "add" ? (
                  <div
                    className="image-upload-icon"
                    onClick={() => fileUploadControl?.current?.click()}
                    style={{
                      width: "300px",
                      height: "190px",
                      borderRadius: "2%",
                    }}
                  >
                    <IconButton>
                      <AddAPhotoIcon htmlColor="white" />
                    </IconButton>
                    <Typography
                      component={"span"}
                      style={{
                        margin: "0",
                        color: "white",
                        lineHeight: "1.5",
                        fontSize: "0.75rem",
                        fontFamily: "Public Sans,sans-serif",
                        fontWeight: "400",
                      }}
                    >
                      Upload Card Image
                    </Typography>
                    <input
                      name="fileselect"
                      type="file"
                      style={{ display: "none" }}
                      ref={fileUploadControl}
                      onChange={(event) => handleFileSelect(event)}
                      accept="image/*"
                      onClick={(e) => {
                        //to clear the file uploaded state to reupload the same file (AKA allow our handler to handle duplicate file)
                        //@ts-ignore
                        e.target.value = "";
                      }}
                    />
                  </div>
                ) : (
                  <input
                    name="fileselect"
                    type="file"
                    style={{ display: "none" }}
                    ref={fileUploadControl}
                    onChange={(event) => handleFileSelect(event)}
                    accept="image/*"
                    onClick={(e) => {
                      //to clear the file uploaded state to reupload the same file (AKA allow our handler to handle duplicate file)
                      //@ts-ignore
                      e.target.value = "";
                    }}
                  />
                )}
              </div>
            </Tooltip>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            style={{ padding: "0px 10px 10px 20px", background: "white" }}
          >
            {formMode === "edit" || formMode === "add" ? (
              <>
                <Typography
                  className={headerClasses.typography}
                  color="inherit"
                  variant={"h6"}
                  component="div"
                >
                  Note:
                </Typography>
                <Typography
                  className={headerClasses.typography}
                  color="inherit"
                  variant={"h6"}
                  component="div"
                  style={{ fontSize: "inherit" }}
                >
                  <ul style={{ paddingLeft: "15px" }}>
                    <li>Click on the Card Image box to upload Image.</li>
                    <li>Maximum Image Size should be 5 MB.</li>
                    <li>Image format should be JPEG or PNG.</li>
                  </ul>
                </Typography>
              </>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      ) : null}

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
      {isOpenAccept ? (
        <PopupMessageAPIWrapper
          MessageTitle="Confirmation"
          Message="Do you want to accept this Request?"
          onActionYes={(rowVal) => onAcceptPopupYes(rowVal)}
          onActionNo={() => onActionCancel()}
          rows={rowData}
          open={isOpenAccept}
          loading={resultConfirm.isLoading}
        />
      ) : null}
      {isOpenReject ? (
        <PopupMessageAPIWrapper
          MessageTitle="Confirmation"
          Message="Do you want to reject this Request?"
          onActionYes={(rowVal) => onRejectPopupYes(rowVal)}
          onActionNo={() => onActionCancel()}
          rows={rowData}
          open={isOpenReject}
          loading={resultConfirm.isLoading}
        />
      ) : null}
    </>
  );
};

export const CardImageFormWrapper = ({
  handleDialogClose,
  isDataChangedRef,
  defaultmode,
  moduleType,
}) => {
  const classes = useDialogStyles();
  const { state: rows }: any = useLocation();
  return (
    <>
      <Dialog
        open={true}
        //@ts-ignore
        TransitionComponent={Transition}
        PaperProps={{
          style: {
            width: "50%",
            background: "white",
            // minHeight: "48vh",
            // height: "62vh",
          },
        }}
        maxWidth="md"
        classes={{
          scrollPaper: classes.topScrollPaper,
          paperScrollBody: classes.topPaperScrollBody,
        }}
      >
        <CardImageForm
          isDataChangedRef={isDataChangedRef}
          closeDialog={handleDialogClose}
          defaultmode={defaultmode}
          transactionID={rows?.[0]?.data?.TRAN_CD}
        />
      </Dialog>
    </>
  );
};
