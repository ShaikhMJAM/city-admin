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
import { WebReroutingFormMetaData } from "./metaData";
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
import {
  StringtoUnicode,
  extractMetaData,
  utilFunction,
} from "components/utils";
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

const WebReroutingForm: FC<{
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

  const result = useQuery(["getWebReroutingData", transactionID], () =>
    API.getWebReroutingData(transactionID, formMode)
  );

  useEffect(() => {
    return () => {
      queryClient.removeQueries(["getWebReroutingData", transactionID]);
    };
  }, [transactionID]);

  const mutation = useMutation(
    updateMasterDataWrapperFn(API.updateWebReroutingConfig),
    {
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
    }
  );

  const resultConfirm = useMutation(API.updateWebReroutingConfirm, {
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
      formMode === "add" ? "Y" : Boolean(data?.ACTIVE) ? "Y" : "N";
    data["IMAGE_DATA"] = filesdata.current ?? "";
    data["POPUP_STATUS"] = Boolean(data?.POPUP_STATUS) ? "Y" : "N";
    data["LOGIN_STATUS"] = Boolean(data?.LOGIN_STATUS) ? "Y" : "N";
    data["LABEL_BN"] = StringtoUnicode(data?.LABEL_BN ?? "").replaceAll(
      "\\u",
      "\\"
    );
    data["POPUP_MSG_BN"] = StringtoUnicode(data?.POPUP_MSG_BN ?? "").replaceAll(
      "\\u",
      "\\"
    );
    data["POPUP_MSG_EN"] = data?.POPUP_MSG_EN ?? "";
    data["API_USER_ID"] = data?.API_USER_ID ?? "";
    data["API_PASSWORD"] = data?.API_PASSWORD ?? "";
    data["SERVICE_CODE"] = data?.SERVICE_CODE ?? "";

    let oldData = {
      ...result?.data?.[0],
      ACTIVE: Boolean(result?.data?.[0]?.ACTIVE) ? "Y" : "N",
      POPUP_STATUS: Boolean(result?.data?.[0]?.POPUP_STATUS) ? "Y" : "N",
      LOGIN_STATUS: Boolean(result?.data?.[0]?.LOGIN_STATUS) ? "Y" : "N",
      LABEL_BN: StringtoUnicode(result?.data?.[0]?.LABEL_BN ?? "").replaceAll(
        "\\u",
        "\\"
      ),
      POPUP_MSG_BN: StringtoUnicode(
        result?.data?.[0]?.POPUP_MSG_BN ?? ""
      ).replaceAll("\\u", "\\"),
    };

    let upd = utilFunction.transformDetailsData(data, oldData);
    if (upd._UPDATEDCOLUMNS.length > 0) {
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
    if (Boolean(result?.data?.[0]?.IMAGE_DATA)) {
      setImageURL(result?.data?.[0]?.IMAGE_DATA);
      filesdata.current = result?.data?.[0]?.IMAGE_DATA;
    }
  }, [result?.data?.[0]?.IMAGE_DATA]);

  let isError = result.isError;
  let errorMsg = `${mutation.error?.error_msg}`;
  errorMsg = Boolean(errorMsg.trim()) ? errorMsg : "Unknown error occured";
  let error_detail = `${result[0]?.error?.error_detail}`;

  const masterMetadata: MetaDataType = useMemo(
    () =>
      extractMetaData(
        WebReroutingFormMetaData,
        formMode === "add" ? "New" : formMode === "confirm" ? "view" : formMode
      ),
    [WebReroutingFormMetaData, formMode, ""]
  ) as MetaDataType;
  if (formMode === "confirm") {
    masterMetadata.form.label = "Web Rerouting Confirmation";
  } else {
    masterMetadata.form.label = "Web Rerouting Configuration";
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
      ) : isError === true ? (
        <>
          <div style={{ margin: "1.2rem" }}>
            <Alert
              severity="error"
              errorMsg={errorMsg}
              errorDetail={error_detail ?? ""}
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
              initialValues={result?.data?.[0] as InitialValuesType}
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
                                if (Boolean(result?.data?.[0]?.IMAGE_DATA)) {
                                  setImageURL(result?.data?.[0]?.IMAGE_DATA);
                                  filesdata.current =
                                    result?.data?.[0]?.IMAGE_DATA;
                                } else {
                                  fileURL.current = "";
                                }
                              }
                        }
                        //disabled={isSubmitting}
                        color={"primary"}
                      >
                        {formMode === "add" ? "Close" : "Cancel"}
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
          {/* <Grid item xs={"auto"} sm={3} md={3}></Grid> */}
          <Grid item xs={10} sm={3} md={3} style={{ paddingBottom: "10px" }}>
            <Typography
              className={headerClasses.title}
              color="inherit"
              variant={"h6"}
              component="div"
            >
              Menu Icon
            </Typography>
            <Tooltip
              key={"tooltip-" + formMode}
              title={
                formMode === "view" || formMode === "confirm"
                  ? ""
                  : "Click to upload the Menu Icon"
              }
              placement={"top"}
              arrow={true}
            >
              <div
                className={classes.uploadWrapper}
                style={{
                  width: "100%",
                  height: "190px",
                  background: "#cfcfcf",
                  cursor:
                    formMode === "edit" || formMode === "add"
                      ? "pointer"
                      : "auto",
                  margin: "10px",
                  padding: "4px",
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
                      maxWidth: "103%",
                      minWidth: "103%",
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
                      width: "25%",
                      height: "190px",
                      borderRadius: "5%",
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
                      Upload Menu Icon
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
            style={{ padding: "0px 10px 10px 20px" }}
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
                    <li>Click on the Menu Icon box to upload Icon.</li>
                    <li>Maximum Icon Size should be 5 MB.</li>
                    <li>Icon format should be JPEG or PNG.</li>
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

export const WebReroutingFormWrapper = ({
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
            width: "85%",
            // minHeight: "48vh",
            // height: "62vh",
          },
        }}
        maxWidth="lg"
        classes={{
          scrollPaper: classes.topScrollPaper,
          paperScrollBody: classes.topPaperScrollBody,
        }}
      >
        <WebReroutingForm
          isDataChangedRef={isDataChangedRef}
          closeDialog={handleDialogClose}
          defaultmode={defaultmode}
          transactionID={rows?.[0]?.data?.TRAN_CD}
        />
      </Dialog>
    </>
  );
};
