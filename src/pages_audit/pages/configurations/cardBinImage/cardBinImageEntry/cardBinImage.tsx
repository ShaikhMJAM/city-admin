import { FC, useEffect, useState, useRef } from "react";
import { useMutation } from "react-query";
import { InitialValuesType, SubmitFnType } from "packages/form";
import FormWrapper, { MetaDataType } from "components/dynamicForm";
import { useSnackbar } from "notistack";
import { useLocation } from "react-router-dom";
import { useDialogStyles } from "pages_audit/common/dialogStyles";
import { Transition } from "pages_audit/common/transition";
import * as API from "../api";
import { CardBinImageEntryMetaData } from "./metaData";
import { PopupMessageAPIWrapper } from "components/custom/popupMessage";
import {
  Grid,
  Tooltip,
  Typography,
  Button,
  Dialog,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { utilFunction } from "components/utils";
import { useStyles } from "../../../profile/profilePhotoUpload/style";
import { transformFileObject } from "components/fileUpload/utils";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import "../../../profile/style.css";

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

const CardBinImageEntry: FC<{
  isDataChangedRef: any;
  closeDialog?: any;
  defaultmode: string;
}> = ({ isDataChangedRef, closeDialog, defaultmode }) => {
  // const { authState } = useContext(AuthContext);

  const headerClasses = useTypeStyles();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [formMode, setFormMode] = useState(defaultmode);
  const isErrorFuncRef = useRef<any>(null);
  const [isOpenSave, setIsOpenSave] = useState(false);
  const { state: rows }: any = useLocation();
  const fileUploadControl = useRef<any | null>(null);
  const submitBtnRef = useRef<any | null>(null);
  const [filecnt, setFilecnt] = useState(0);
  const fileURL = useRef<any | null>(null);
  const filesdata = useRef<any | null>(null);
  const fileName = useRef<any | null>(null);

  const mutation = useMutation(
    updateMasterDataWrapperFn(API.updateCardBinImageEntry),
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

  const onSubmitHandler: SubmitFnType = (
    data: any,
    displayData,
    endSubmit,
    setFieldError,
    actionFlag
  ) => {
    //@ts-ignore
    endSubmit(true);

    data = {
      ...data,
      IS_BANGLA_QR: Boolean(data?.IS_BANGLA_QR) ? "Y" : "N",
      FILE_DATA: filesdata.current ?? "",
      CONFIRMED: "Y",
      TRAN_CD: rows?.[0]?.data?.TRAN_CD,
      FILE_NAME: fileName?.current ?? "",
    };

    let oldData = {
      ...rows?.[0]?.data,
      IS_BANGLA_QR: Boolean(rows?.[0]?.data?.IS_BANGLA_QR) ? "Y" : "N",
      CONFIRMED: Boolean(rows?.[0]?.data?.CONFIRMED) ? "Y" : "N",
      FILE_DATA: "",
    };

    let upd = utilFunction.transformDetailsData(data, oldData);
    if (upd._UPDATEDCOLUMNS.length > 0) {
      if (Boolean(!fileName.current)) {
        upd._UPDATEDCOLUMNS = upd._UPDATEDCOLUMNS.filter(
          (e) => e !== "FILE_DATA" && e !== "FILE_NAME"
        );
      }
      isErrorFuncRef.current = {
        data: {
          ...data,
          ...upd,
          _isNewRow: formMode === "add" ? true : false,
          isDeleteRow: false,
        },
        displayData,
        endSubmit,
        setFieldError,
      };
      if (isErrorFuncRef.current?.data?._UPDATEDCOLUMNS.length === 0) {
        setFormMode("view");
      } else setIsOpenSave(true);
    } else {
      setFormMode("view");
    }
  };

  const onPopupYes = (rows) => {
    mutation.mutate(isErrorFuncRef.current);
  };

  const onActionCancel = () => {
    setIsOpenSave(false);
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

            fileName.current = (filesObj?.[0]?.blob?.name).replaceAll(
              /\s/g,
              ""
            );
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
    fileURL.current = filedata;
    setFilecnt(filecnt + 1);
  };
  useEffect(() => {
    if (Boolean(rows?.[0]?.data?.IMAGE_PATH)) {
      setImageURL(rows?.[0]?.data?.IMAGE_PATH);
      filesdata.current = rows?.[0]?.data?.IMAGE_PATH;
    }
  }, [rows?.[0]?.data?.IMAGE_PATH]);

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          <FormWrapper
            key={"CardBinImage" + formMode}
            metaData={CardBinImageEntryMetaData as MetaDataType}
            initialValues={rows?.[0]?.data as InitialValuesType}
            onSubmitHandler={onSubmitHandler}
            //@ts-ignore
            displayMode={formMode}
            formStyle={{
              background: "white",
              // height: "55vh",
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
                      color={"primary"}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                  </>
                ) : formMode === "add" ? (
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
                      //disabled={isSubmitting}
                      color={"primary"}
                    >
                      Close
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
        </Grid>
        <Grid item xs={12} sm={6} md={6} style={{ paddingBottom: "10px" }}>
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
                width: "100%",
                height: "190px",
                background: "#cfcfcf",
                cursor: formMode === "view" ? "auto" : "pointer",
                margin: "10px",
                padding: "4px",
              }}
              // onDoubleClick={() => {
              //   if (!(formMode === "view")) {
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
              {/* <input
                name="fileselect"
                type="file"
                style={{ display: "none" }}
                ref={fileUploadControl}
                onChange={(event) => handleFileSelect(event)}
                accept=".png,.jpg,.jpeg"
                onClick={(e) => {
                  //to clear the file uploaded state to reupload the same file (AKA allow our handler to handle duplicate file)
                  //@ts-ignore
                  e.target.value = "";
                }}
              /> */}
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

export const CardBinImageEntryWrapper = ({
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
            width: "90%",
            // minHeight: "48vh",
            // height: "62vh",
          },
        }}
        maxWidth="sm"
        classes={{
          scrollPaper: classes.topScrollPaper,
          paperScrollBody: classes.topPaperScrollBody,
        }}
      >
        <CardBinImageEntry
          isDataChangedRef={isDataChangedRef}
          closeDialog={handleDialogClose}
          defaultmode={defaultmode}
        />
      </Dialog>
    </>
  );
};
