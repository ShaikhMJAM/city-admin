import { AppBar, Button, Dialog, IconButton } from "@mui/material";
import { Fragment, useEffect, useRef, useState } from "react";
import { Transition } from "pages_audit/common";
import { useDialogStyles } from "pages_audit/common/dialogStyles";
import { MasterDetailsForm } from "components/formcomponent";
import { BannerMasterConfigDetailsMetaData } from "./metadata";
import { MasterDetailsMetaData } from "components/formcomponent/masterDetails/types";
import { useLocation } from "react-router-dom";
import { useMutation } from "react-query";
import * as API from "../api";
import { LoaderPaperComponent } from "components/common/loaderPaper";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { Alert } from "components/common/alert";
import { useSnackbar } from "notistack";
import { PopupMessageAPIWrapper } from "components/custom/popupMessage";
import { ViewUpdloadHtml } from "./viewUpdloadHtml";

interface updateBannerMasterDataType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
  setLoading?: any;
}
const updateBannerMasterDataWrapperFn =
  (updateMasterData) =>
  async ({ data }: updateBannerMasterDataType) => {
    return updateMasterData(data);
  };
export const BannerMasterDetails = ({
  ClosedEventCall,
  isDataChangedRef,
  defaultmode = "view",
}) => {
  const classes = useDialogStyles();
  const myRef = useRef<any>(null);
  const detailsDataRef = useRef<any>(null);
  const [isOpenUpload, setIsOpenUpload] = useState<boolean>(false);
  const [isLoading, setLoading] = useState(false);
  const [formMode, setFormMode] = useState(defaultmode);
  const { state: rows }: any = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const [isOpenSave, setIsOpenSave] = useState(false);
  const mutationRet: any = useMutation(API.getBannerMasterDetailGridData);
  const mutation = useMutation(
    updateBannerMasterDataWrapperFn(API.updateBannerMasterData),
    {
      onError: (error: any, { endSubmit, setLoading }) => {
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
      onSuccess: (data, { endSubmit, setLoading }) => {
        enqueueSnackbar(data, {
          variant: "success",
        });

        isDataChangedRef.current = true;
        setIsOpenSave(false);
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
  }) => {
    endSubmit(true);
    if (
      formMode !== "new" &&
      data?._UPDATEDCOLUMNS?.length === 0 &&
      data?.DETAILS_DATA?.isDeleteRow?.length === 0 &&
      data?.DETAILS_DATA?.isNewRow?.length === 0 &&
      data?.DETAILS_DATA?.isUpdatedRow?.length === 0
    ) {
      setFormMode("view");
    } else {
      if (data?.BANN_TYPE === "C" && !Boolean(data?.CUSTOME_USER_NM)) {
        setFieldErrors({ CUSTOME_USER_NM: "Login ID is required." });
      } else {
        setIsOpenSave(true);
        // if (Boolean(data["FROM_DT"])) {
        //   data["FROM_DT"] = format(new Date(data["FROM_DT"]), "dd/MMM/yyyy");
        // }
        // if (Boolean(data["TO_DT"])) {
        //   data["TO_DT"] = format(new Date(data["TO_DT"]), "dd/MMM/yyyy");
        // }
        isErrorFuncRef.current = { data, endSubmit };
      }
    }
  };

  const onSaveHtmlData = (
    htmlText: string,
    sr_cd: string | number,
    isFileChanged: boolean
  ) => {
    if (!isFileChanged) {
      setIsOpenUpload(false);
      return;
    }
    const encodedHtmlText = btoa(htmlText);

    myRef.current?.setGridData((existingData) => {
      const updatedData = [...existingData].map((data) => {
        if (data["SR_CD"] === sr_cd) {
          data["BANNER_DATA"] = encodedHtmlText;
          data["_isTouchedCol"] = {
            ...data["_isTouchedCol"],
            BANNER_DATA: true,
          };
        }
        return data;
      });
      return updatedData;
    });

    setIsOpenUpload(false);
  };

  useEffect(() => {
    if (defaultmode !== "new") {
      mutationRet.mutate({ TRAN_CD: rows[0]?.data?.TRAN_CD });
    }
  }, []);

  const isErrorFuncRef = useRef<any>(null);
  const onActionCancel = () => {
    setIsOpenSave(false);
  };
  const onPopupYes = (rows) => {
    mutation.mutate({
      ...isErrorFuncRef.current,
    });
  };

  return (
    <Fragment>
      <Dialog
        open={true}
        //@ts-ignore
        TransitionComponent={Transition}
        PaperProps={{
          style: {
            width: "70%",
          },
        }}
        maxWidth="md"
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
          <MasterDetailsForm
            key={"BannerMaster-" + formMode}
            metaData={
              BannerMasterConfigDetailsMetaData as MasterDetailsMetaData
            }
            ref={myRef}
            initialData={{ _isNewRow: true, DETAILS_DATA: [] }}
            displayMode={"New"}
            isLoading={isLoading}
            onSubmitData={onSubmitHandler}
            isNewRow={true}
            containerstyle={{
              padding: "10px",
            }}
            formStyle={{
              background: "white",
              // height: "25vh",
              // overflowY: "auto",
              // overflowX: "hidden",
              fullwidth: true,
            }}
            formName={"BannerMasterDetail"}
            formNameMaster={"BannerMasterMaster"}
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
                    // onClick={handleSubmit}
                    onClick={(event) => {
                      handleSubmit(event, "Save");
                    }}
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
        ) : formMode === "view" ? (
          <MasterDetailsForm
            key={"BannerMaster-" + formMode}
            metaData={
              BannerMasterConfigDetailsMetaData as MasterDetailsMetaData
            }
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
              // height: "25vh",
              // overflowY: "auto",
              // overflowX: "hidden",
              fullwidth: true,
            }}
            formName={"BannerMasterDetail"}
            formNameMaster={"BannerMasterMaster"}
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
          <MasterDetailsForm
            key={"BannerMaster-" + formMode}
            metaData={
              BannerMasterConfigDetailsMetaData as MasterDetailsMetaData
            }
            ref={myRef}
            initialData={{
              _isNewRow: false,
              ...(rows?.[0]?.data ?? {}),
              DETAILS_DATA: mutationRet.data || [],
            }}
            displayMode={"edit"}
            isLoading={isLoading}
            onSubmitData={onSubmitHandler}
            isNewRow={false}
            containerstyle={{
              padding: "10px",
            }}
            formStyle={{
              background: "white",
              // height: "25vh",
              // overflowY: "auto",
              // overflowX: "hidden",
              fullwidth: true,
            }}
            formName={"BannerMasterDetailEdit"}
            formNameMaster={"BannerMasterMasterEdit"}
            onClickActionEvent={(index, id, data) => {
              detailsDataRef.current = {
                ...data,
              };
              setIsOpenUpload(true);
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
                    // onClick={handleSubmit}
                    onClick={(event) => {
                      handleSubmit(event, "Save");
                    }}
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
        ) : null}
        {isOpenUpload ? (
          <ViewUpdloadHtml
            open={isOpenUpload}
            onClose={() => {
              setIsOpenUpload(false);
            }}
            detailsData={detailsDataRef.current}
            userMsgText={detailsDataRef.current?.BANNER_DATA ?? ""}
            onSaveData={onSaveHtmlData}
          />
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
      </Dialog>
    </Fragment>
  );
};
