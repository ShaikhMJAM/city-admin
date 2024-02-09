import {
  AppBar,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  LinearProgress,
} from "@mui/material";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Transition } from "pages_audit/common";
import { useDialogStyles } from "pages_audit/common/dialogStyles";
import { MasterDetailsForm } from "components/formcomponent";
import { operatorMasterDetailsMetaData } from "./metadata";
import { MasterDetailsMetaData } from "components/formcomponent/masterDetails/types";
import { cloneDeep } from "lodash";
import { useStyles } from "../../../profile/profilePhotoUpload/style";
import { GradientButton } from "components/styledComponent/button";
import { Tooltip } from "components/styledComponent/tooltip";
import { transformFileObject } from "components/fileUpload/utils";
import { utilFunction } from "components/utils";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import * as API from "../api";
import { AuthContext } from "pages_audit/auth";
import { LoaderPaperComponent } from "components/common/loaderPaper";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { Alert } from "components/common/alert";
import { useSnackbar } from "notistack";
import { SpecialAmountGrid } from "./specialAmount";
import { PopupMessageAPIWrapper } from "components/custom/popupMessage";
import { ClearCacheContext, queryClient } from "cache";

interface updateOperatorMasterDetailsDataType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
  setLoading?: any;
}
const updateOperatorMasterDetailsDataWrapperFn =
  (updateMasterData) =>
  async ({ data }: updateOperatorMasterDetailsDataType) => {
    return updateMasterData(data);
  };
export const OperatorMasterDetails = ({
  ClosedEventCall,
  isDataChangedRef,
  defaultmode = "view",
}) => {
  const classes = useDialogStyles();
  const myRef = useRef<any>(null);
  const mysubdtlRef = useRef<any>({});
  const newRowImageData = useRef<any>(null);
  const [isSpecialAmount, setSpecialAmount] = useState(false);
  const [isopenImgViewer, setOpenImgViewer] = useState(false);
  const [formMode, setFormMode] = useState(defaultmode);
  const [metadata, setMetadata] = useState<any>(operatorMasterDetailsMetaData);
  const [formName, setFormName] = useState<any>("");
  const { state: rows }: any = useLocation();
  const { authState } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const isErrorFuncRef = useRef<any>(null);
  const [openAccept, setopenAccept] = useState(false);
  const mutationRet: any = useMutation(
    updateOperatorMasterDetailsDataWrapperFn(API.getOperatorDetailGridData)
  );
  const mutation = useMutation(
    updateOperatorMasterDetailsDataWrapperFn(
      API.updateOperatorMasterDetailGridData
    ),
    {
      onError: (error: any, { endSubmit, setLoading }) => {
        // setLoading(false);
        endSubmit(true, error?.error_msg, error?.error_detail);
        onActionCancel();
      },
      onSuccess: (data, { endSubmit, setLoading }) => {
        // setLoading(false);
        endSubmit(true);
        enqueueSnackbar("Record Updated successfully.", {
          variant: "success",
        });
        isDataChangedRef.current = true;
        // ClosedEventCall();
        ClosedEventCall();
      },
    }
  );
  const AddNewRow = () => {
    myRef.current?.addNewRow(true);
  };

  const onSubmitHandler = ({
    data,
    resultValueObj,
    resultDisplayValueObj,
    endSubmit,
    setFieldErrors,
    actionFlag,
    displayData,
    setFieldError,
  }) => {
    //@ts-ignore
    endSubmit(true);
    if (formMode === "new") {
      data["OPERATOR_IMAGE"] = newRowImageData?.current;
    }
    if (
      formMode !== "new" &&
      data?._UPDATEDCOLUMNS?.length === 0 &&
      data?.DETAILS_DATA?.isDeleteRow?.length === 0 &&
      data?.DETAILS_DATA?.isNewRow?.length === 0 &&
      data?.DETAILS_DATA?.isUpdatedRow?.length === 0
    ) {
      setFormMode("view");
    } else {
      data["TRN_LABEL_BN"] = "";
      data["TRN_LABEL_EN"] = "";
      data["TRN_TYPE"] = "";
      if (data?.DETAILS_DATA?.isNewRow?.length > 0) {
        data.DETAILS_DATA.isNewRow = data?.DETAILS_DATA?.isNewRow?.map(
          (item) => {
            return {
              ...item,
              ACTIVE: item.ACTIVE ? "Y" : "N",
              CHARGE_ALLOW: item.CHARGE_ALLOW ? "Y" : "N",
            };
          }
        );
      }
      if (data?.DETAILS_DATA?.isUpdatedRow?.length > 0) {
        data.DETAILS_DATA.isUpdatedRow = data?.DETAILS_DATA?.isUpdatedRow?.map(
          (item) => {
            return {
              ...item,
              ACTIVE: item.ACTIVE ? "Y" : "N",
              CHARGE_ALLOW: item.CHARGE_ALLOW ? "Y" : "N",
              _OLDROWVALUE: {
                ...item._OLDROWVALUE,
                ACTIVE: Boolean(item._OLDROWVALUE.ACTIVE) ? "Y" : "N",
                CHARGE_ALLOW: Boolean(item._OLDROWVALUE.CHARGE_ALLOW)
                  ? "Y"
                  : "N",
              },
            };
          }
        );
      }
      data["COMP_CD"] = authState.companyID;
      // setLoading(true);
      // mutation.mutate({ data, endSubmit, setLoading });
      isErrorFuncRef.current = { data, displayData, endSubmit, setFieldError };
      setopenAccept(true);
    }
  };
  let metadataold: MasterDetailsMetaData = {} as MasterDetailsMetaData;
  metadataold = cloneDeep(
    operatorMasterDetailsMetaData
  ) as MasterDetailsMetaData;
  useEffect(() => {
    //@ts-ignore
    window._CHANGE_OPERATOR_TYPE = (value) => {
      if (value === "M") {
        metadataold.detailsGrid.columns = metadataold.detailsGrid.columns.map(
          (item) => {
            if (item.accessor === "OPTION_TYPE") {
              return {
                ...item,
                options: [
                  { value: "PREPAID", label: "PREPAID" },
                  { value: "POSTPAID", label: "POSTPAID" },
                ],
              };
            } else {
              return item;
            }
          }
        );
        setMetadata(metadataold);
        setFormName("OperatorMaster-Mobile");
      } else if (value === "I") {
        metadataold.detailsGrid.columns = metadataold.detailsGrid.columns.map(
          (item) => {
            if (item.accessor === "OPTION_TYPE") {
              return {
                ...item,
                options: [{ value: "INTERNET", label: "INTERNET" }],
              };
            } else {
              return item;
            }
          }
        );
        setMetadata(metadataold);
        setFormName("OperatorMaster-Internet");
      }
    };

    if (Boolean(rows?.[0]?.data?.OPERATOR_TYPE)) {
      //@ts-ignore
      window?._CHANGE_OPERATOR_TYPE?.(rows?.[0]?.data?.OPERATOR_TYPE);
    } else {
      setMetadata(metadataold);
    }
    if (defaultmode !== "new") {
      mutationRet.mutate({
        data: {
          TRAN_CD: rows[0]?.data?.TRAN_CD,
          COMP_CD: authState.companyID,
        },
      });
      mysubdtlRef.current = {
        ...mysubdtlRef.current,
        TRAN_CD: rows[0]?.data?.TRAN_CD,
        COMP_CD: authState.companyID,
      };
    }
    return () => {
      //@ts-ignore
      window._CHANGE_OPERATOR_TYPE = null;
    };
  }, []);
  const onFormButtonClickHandel = (id) => {
    setOpenImgViewer(true);
  };
  // useEffect(() => {
  //   if (Boolean(rows?.[0]?.data?.OPERATOR_IMAGE)) {
  //     myImgRef.current = rows?.[0]?.data?.OPERATOR_IMAGE;
  //   }
  // }, [rows]);

  const onPopupYesAccept = (rows) => {
    mutation.mutate({ ...isErrorFuncRef.current });
  };
  const onActionCancel = () => {
    setopenAccept(false);
  };

  return (
    <Fragment>
      <Dialog
        open={true}
        //@ts-ignore
        TransitionComponent={Transition}
        PaperProps={{
          style: {
            width: "100%",
          },
        }}
        maxWidth="lg"
        classes={{
          scrollPaper: classes.topScrollPaper,
          paperScrollBody: classes.topPaperScrollBody,
        }}
      >
        {mutationRet.isLoading ? (
          <div style={{ height: 100, paddingTop: 10 }}>
            <div style={{ padding: 10 }}>
              <LoaderPaperComponent />
            </div>
            {typeof ClosedEventCall === "function" ? (
              <div style={{ position: "absolute", right: 0, top: 0 }}>
                <IconButton onClick={ClosedEventCall}>
                  <HighlightOffOutlinedIcon />
                </IconButton>
              </div>
            ) : null}
          </div>
        ) : mutationRet.isError ? (
          <>
            <div
              style={{
                paddingRight: "10px",
                paddingLeft: "10px",
                height: 100,
                paddingTop: 10,
              }}
            >
              <AppBar position="relative" color="primary">
                <Alert
                  severity="error"
                  errorMsg={mutationRet.error?.error_msg ?? "Unknow Error"}
                  errorDetail={mutationRet.error?.error_detail ?? ""}
                  color="error"
                />
                {typeof ClosedEventCall === "function" ? (
                  <div style={{ position: "absolute", right: 0, top: 0 }}>
                    <IconButton onClick={ClosedEventCall}>
                      <HighlightOffOutlinedIcon />
                    </IconButton>
                  </div>
                ) : null}
              </AppBar>
            </div>
          </>
        ) : formMode === "new" ? (
          <>
            <MasterDetailsForm
              metaData={metadata}
              ref={myRef}
              initialData={{ _isNewRow: true, DETAILS_DATA: [] }}
              displayMode={"New"}
              isLoading={false}
              onSubmitData={onSubmitHandler}
              isNewRow={true}
              containerstyle={{
                padding: "10px",
              }}
              formStyle={{
                background: "white",
              }}
              formName={formName}
              formNameMaster={"OperatorMaster"}
              onFormButtonClickHandel={onFormButtonClickHandel}
            >
              {({ isSubmitting, handleSubmit }) => {
                return (
                  <>
                    <Button
                      onClick={AddNewRow}
                      // disabled={isSubmitting}
                      //endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                      color={"primary"}
                    >
                      Add Row
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      // disabled={isSubmitting}
                      // endIcon={
                      //   isSubmitting ? <CircularProgress size={20} /> : null
                      // }
                      color={"primary"}
                    >
                      Save
                    </Button>
                    <Button
                      onClick={ClosedEventCall}
                      // disabled={isSubmitting}
                      color={"primary"}
                    >
                      Close
                    </Button>
                  </>
                );
              }}
            </MasterDetailsForm>
            {openAccept ? (
              <PopupMessageAPIWrapper
                MessageTitle="Confirmation"
                Message="Do you want to save this Request?"
                onActionYes={(rowVal) => onPopupYesAccept(rowVal)}
                onActionNo={() => onActionCancel()}
                rows={isErrorFuncRef.current?.data}
                open={openAccept}
                loading={mutation.isLoading}
              />
            ) : null}
          </>
        ) : formMode === "view" ? (
          <MasterDetailsForm
            key={"OperatorDetails-" + formMode}
            metaData={metadata}
            ref={myRef}
            initialData={{
              _isNewRow: false,
              ...(rows?.[0]?.data ?? {}),
              DETAILS_DATA: mutationRet.data || [],
            }}
            displayMode={"view"}
            isLoading={true}
            onSubmitData={onSubmitHandler}
            isNewRow={true}
            containerstyle={{
              padding: "10px",
            }}
            formStyle={{
              background: "white",
            }}
            formName={formName}
            formNameMaster={"OperatorMaster"}
            onFormButtonClickHandel={onFormButtonClickHandel}
          >
            {({ isSubmitting, handleSubmit }) => {
              return (
                <>
                  <Button
                    onClick={() => {
                      setFormMode("edit");
                    }}
                    // disabled={isSubmitting}
                    // endIcon={
                    //   isSubmitting ? <CircularProgress size={20} /> : null
                    // }
                    color={"primary"}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={ClosedEventCall}
                    // disabled={isSubmitting}
                    color={"primary"}
                  >
                    Close
                  </Button>
                </>
              );
            }}
          </MasterDetailsForm>
        ) : formMode === "edit" ? (
          <>
            <MasterDetailsForm
              key={"OperatorDetails-" + formMode}
              metaData={metadata}
              ref={myRef}
              initialData={{
                _isNewRow: false,
                ...(rows?.[0]?.data ?? {}),
                DETAILS_DATA: mutationRet.data || [],
              }}
              displayMode={"edit"}
              isLoading={false}
              onSubmitData={onSubmitHandler}
              isNewRow={false}
              containerstyle={{
                padding: "10px",
              }}
              formStyle={{
                background: "white",
              }}
              formName={formName}
              formNameMaster={"OperatorMaster"}
              onFormButtonClickHandel={onFormButtonClickHandel}
              onClickActionEvent={(index, id, data) => {
                mysubdtlRef.current = {
                  ...mysubdtlRef.current,
                  SR_CD: data?.SR_CD,
                };
                setSpecialAmount(true);
              }}
            >
              {({ isSubmitting, handleSubmit }) => {
                return (
                  <>
                    <Button
                      onClick={AddNewRow}
                      // disabled={isSubmitting}
                      //endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                      color={"primary"}
                    >
                      Add Row
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      // disabled={isSubmitting}
                      // endIcon={
                      //   isSubmitting ? <CircularProgress size={20} /> : null
                      // }
                      color={"primary"}
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => {
                        setFormMode("view");
                      }}
                      // disabled={isSubmitting}
                      color={"primary"}
                    >
                      Cancel
                    </Button>
                  </>
                );
              }}
            </MasterDetailsForm>
            {openAccept ? (
              <PopupMessageAPIWrapper
                MessageTitle="Confirmation"
                Message="Do you want to save this Request?"
                onActionYes={(rowVal) => onPopupYesAccept(rowVal)}
                onActionNo={() => onActionCancel()}
                rows={isErrorFuncRef.current?.data}
                open={openAccept}
                loading={mutation.isLoading}
              />
            ) : null}
          </>
        ) : null}
        {isopenImgViewer ? (
          <ImgaeViewerandUpdate
            isOpen={isopenImgViewer}
            title={"Operator Icon"}
            onClose={() => {
              setOpenImgViewer(false);
            }}
            onSubmit={(filedata = "") => {
              newRowImageData.current = filedata;
              setOpenImgViewer(false);
            }}
            fileData={newRowImageData.current}
            formMode={formMode}
            companyCode={rows[0]?.data?.COMP_CD ?? authState.companyID}
            tranCode={rows[0]?.data?.TRAN_CD ?? 0}
          />
        ) : null}
        {isSpecialAmount ? (
          <SpecialAmountGrid
            isOpen={isSpecialAmount}
            formMode={formMode}
            onClose={() => {
              setSpecialAmount(false);
            }}
            reqDataRef={mysubdtlRef}
          />
        ) : null}
      </Dialog>
    </Fragment>
  );
};

const ImgaeViewerandUpdate = ({
  isOpen,
  title,
  onClose,
  onSubmit,
  fileData,
  formMode,
  companyCode,
  tranCode,
}) => {
  const classes = useStyles();
  const fileURL = useRef<any | null>(null);
  const submitBtnRef = useRef<any | null>(null);
  const fileUploadControl = useRef<any | null>(null);
  const [filesdata, setFilesData] = useState<any>(null);
  const [filecnt, setFilecnt] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const { getEntries } = useContext(ClearCacheContext);

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery<
    any,
    any
  >(
    [
      "getOperatorImageData",
      { COMP_CD: companyCode, TRAN_CD: tranCode, formMode },
    ],
    () =>
      API.getOperatorImageData({
        COMP_CD: companyCode,
        TRAN_CD: tranCode,
        formMode,
      })
  );

  const mutationImagUpdate = useMutation(
    API.updateOperatorMasterDetailGridData,
    {
      onError: (error: any, { endSubmit, setLoading }) => {},
      onSuccess: (data, { endSubmit, setLoading }) => {
        enqueueSnackbar("Image Updated successfully.", {
          variant: "success",
        });
        onSubmit();
      },
    }
  );

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
        fileURL.current =
          typeof filesObj?.[0]?.blob === "object" &&
          Boolean(filesObj?.[0]?.blob)
            ? await URL.createObjectURL(filesObj?.[0]?.blob as any)
            : null;
        setImageData(filesObj?.[0]?.blob);
        //submitBtnRef.current?.click?.();
        setFilecnt(filecnt + 1);
      }
    }
  };
  const setImageData = async (blob) => {
    let base64 = await utilFunction.convertBlobToBase64(blob);
    setFilesData(base64?.[1]);
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
    setImageURL(data?.[0]?.OPERATOR_IMAGE);
    setFilesData(data?.[0]?.OPERATOR_IMAGE);
  }, [data?.[0]?.OPERATOR_IMAGE]);

  useEffect(() => {
    if (formMode === "new" && Boolean(fileData)) {
      setImageURL(fileData);
      setFilesData(fileData);
    }
  }, [formMode, fileData]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries([
        "getOperatorImageData",
        {
          COMP_CD: companyCode,
          TRAN_CD: tranCode,
          formMode,
        },
      ]);
    };
  }, [getEntries]);

  const onUpdateImage = (fileData) => {
    if (fileData === data?.[0]?.OPERATOR_IMAGE) {
      onClose();
    } else if (formMode === "new") {
      onSubmit(fileData);
    } else {
      let imgData: any = {
        COMP_CD: companyCode,
        TRAN_CD: tranCode,
        OPERATOR_IMAGE: fileData,
        _OLDROWVALUE: {
          OPERATOR_IMAGE: data?.[0]?.OPERATOR_IMAGE,
        },
        _UPDATEDCOLUMNS: ["OPERATOR_IMAGE"],
        DETAILS_DATA: {
          isNewRow: [],
          isDeleteRow: [],
          isUpdatedRow: [],
        },
      };
      mutationImagUpdate.mutate({ ...imgData });
    }
  };

  return (
    <Dialog
      open={isOpen}
      //@ts-ignore
      TransitionComponent={Transition}
      fullWidth={false}
    >
      <DialogTitle>{title}</DialogTitle>
      <>
        {isLoading || isFetching ? (
          <LinearProgress
            style={{ marginRight: "24px", marginLeft: "24px" }}
            color="secondary"
          />
        ) : isError ? (
          <Alert
            severity="error"
            errorMsg={error?.error_msg ?? "Something went to wrong.."}
            errorDetail={error?.error_detail}
            color="error"
          />
        ) : mutationImagUpdate.isError ? (
          <Alert
            severity="error"
            errorMsg={
              mutationImagUpdate?.error?.error_msg ??
              "Something went to wrong.."
            }
            errorDetail={mutationImagUpdate?.error?.error_detail}
            color="error"
          />
        ) : (
          <></>
        )}
        <DialogContent>
          <Tooltip
            key={"tooltip-" + formMode}
            title={
              formMode === "view" ? "" : "Double click to change the image"
            }
            placement={"top"}
            arrow={true}
          >
            <div
              className={classes.uploadWrapper}
              style={{
                width: 280,
                height: 280,
                background: "#cfcfcf",
                cursor: formMode === "view" ? "auto" : "pointer",
              }}
              onDoubleClick={() => {
                if (!(formMode === "view")) {
                  fileUploadControl?.current?.click();
                }
              }}
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
                    maxWidth: 250,
                    maxHeight: 250,
                    minWidth: 150,
                    minHeight: 150,
                  }}
                />
              </Grid>
              <input
                name="fileselect"
                type="file"
                style={{ display: "none" }}
                ref={fileUploadControl}
                onChange={handleFileSelect}
                accept=".png,.jpg,.jpeg"
                onClick={(e) => {
                  //to clear the file uploaded state to reupload the same file (AKA allow our handler to handle duplicate file)
                  //@ts-ignore
                  e.target.value = "";
                }}
              />
            </div>
          </Tooltip>
        </DialogContent>
      </>
      {/* )} */}
      <DialogActions style={{ justifyContent: "center" }}>
        <GradientButton onClick={onClose}>Close</GradientButton>
        {formMode === "view" || isLoading || isFetching ? null : (
          <>
            <GradientButton
              onClick={() => {
                setFilesData(null);
                fileURL.current = null;
              }}
            >
              Clear
            </GradientButton>
            <GradientButton
              onClick={() => {
                onUpdateImage(filesdata);
              }}
              endIcon={
                mutationImagUpdate.isLoading ? (
                  <CircularProgress size={20} />
                ) : null
              }
            >
              Update
            </GradientButton>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};
