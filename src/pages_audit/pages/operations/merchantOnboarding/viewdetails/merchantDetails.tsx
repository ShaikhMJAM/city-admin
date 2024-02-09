import { Button, Dialog, IconButton } from "@mui/material";
import FormWrapper, { MetaDataType } from "components/dynamicForm";
import { Transition } from "pages_audit/common";
import {
  useRef,
  FC,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { useDialogStyles } from "components/detailPopupGridData";
import { SubmitFnType } from "packages/form";
import { useLocation, useNavigate } from "react-router-dom";
import { MerchantOnboardingMetadata } from "./metadata";
import { FromSourceMetaData } from "./fromSourceMetaData";
import { useMutation, useQuery } from "react-query";
import * as API from "../api";
import { queryClient } from "cache";
import { LoaderPaperComponent } from "components/common/loaderPaper";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { Alert } from "components/common/alert";
import { TranParticularsWrapper } from "pages_audit/pages/configurations/serviceWiseConfig/tranParticulers";
import { extractMetaData, ObjectMappingKeys } from "components/utils";
import { AuthContext } from "pages_audit/auth";
import { useSnackbar } from "notistack";
import { PopupMessageAPIWrapper } from "components/custom/popupMessage";

export const MerchantViewDetails: FC<{
  isDataChangedRef: any;
  closeDialog?: any;
  formView?: string;
}> = ({ isDataChangedRef, closeDialog, formView }) => {
  const navigate = useNavigate();
  const [formMode, setFormMode] = useState(formView);
  const [isAccept, setIsAccept] = useState(false);
  const { state: rows }: any = useLocation();
  const classes = useDialogStyles();
  const [isTranPerticulerDialog, setTranPerticulerDialog] = useState({
    open: false,
    buttonName: "",
    defaultMode: "edit",
  });
  const moveToViewMode = useCallback(() => setFormMode("view"), [setFormMode]);
  const moveToEditMode = useCallback(() => setFormMode("edit"), [setFormMode]);
  const isSubmitEventRef = useRef<any>(null);
  const isErrorFuncRef = useRef<any>(null);
  const isDetailFormRef = useRef<any>(null);
  const isTranparticularRef = useRef<any>(null);
  const authController = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const [isOpenAccept, setIsOpenAccept] = useState(false);
  const [isOpenReject, setIsOpenReject] = useState(false);

  const saveMutation = useMutation(API.merchantOnbordingConfig, {
    onSuccess: (response: any) => {
      enqueueSnackbar(response, { variant: "success" });
      isDataChangedRef.current = true;
      onActionCancel();
      closeDialog();
    },
    onError: (error: any) => {
      enqueueSnackbar(error?.error_msg ?? "error", { variant: "error" });
      onActionCancel();
    },
    // onSettled: () => {
    //   onActionCancel();
    //   closeDialog();
    // },
  });

  const glDetails = useQuery(
    [
      "getMerchantOnboardingglDetails",
      { formView, tranCode: rows?.[0]?.data?.TRAN_CD },
    ],
    () =>
      API.getMerchantOnboardingglDetails({
        formView,
        tranCode: rows?.[0]?.data?.TRAN_CD,
      })
  );

  const onSubmitHandler: SubmitFnType = (
    data,
    displayData,
    endSubmit,
    setFieldError,
    actionFlag
  ) => {
    data["IS_PID_KEY_UPDATE"] = "N";
    if (formView === "new") {
      if (
        !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s)/.test(data["PID_KEY"])
      ) {
        endSubmit(false, "");
        setFieldError({
          PID_KEY:
            "Gateway Password should be alphanumeric and have at least one special character, one lowercase character, one uppercase character without any space in between.",
        });
        return;
      }
      data["IS_PID_KEY_UPDATE"] = "Y";
    } else if (data["PID_KEY"] !== rows?.[0]?.data?.PID_KEY) {
      if (
        !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s)/.test(data["PID_KEY"])
      ) {
        endSubmit(false, "");
        setFieldError({
          PID_KEY:
            "Gateway Password should be alphanumeric and have at least one special character, one lowercase character, one uppercase character without any space in between.",
        });
        return;
      }
      data["IS_PID_KEY_UPDATE"] = "Y";
    }
    data["ACTIVE"] =
      formView === "new" ? "Y" : Boolean(data["ACTIVE"]) ? "Y" : "N";
    isErrorFuncRef.current = {
      data: {
        ...data,
        _isNewRow: formView === "new" ? true : false,
      },
      displayData,
      endSubmit,
      setFieldError,
    };
    isDetailFormRef.current?.handleSubmit(isSubmitEventRef.current, "save");
  };

  const onSubmitHandlerDTL: SubmitFnType = (
    data,
    displayData,
    endSubmit,
    setFieldError,
    actionFlag
  ) => {
    //@ts-ignore
    endSubmit(true);
    setIsAccept(true);
    isErrorFuncRef.current?.endSubmit(true);
    let finalResponse = submitDataJson(isErrorFuncRef.current?.data, {
      ...data,
      ...isTranparticularRef.current,
    });

    isErrorFuncRef.current = {
      // data: {
      //   ...finalResponse,
      //   // responseData: finalResponse,
      // },
      ...finalResponse,
      displayData,
      endSubmit,
      setFieldError,
    };
    const setLocalLoader = (
      isLoader = true,
      error_msg = "",
      error_details = ""
    ) => {
      endSubmit(!isLoader);
      isErrorFuncRef.current?.endSubmit(!isLoader, error_msg, error_details);
    };
  };
  const onAcceptYes = (rows) => {
    saveMutation.mutate({
      ...isErrorFuncRef.current,
    });
  };
  const submitDataJson = (mstData, dtlData) => {
    const detailDataFinacle: any = {};
    const detailDataAbabil: any = {};
    const detailDataTranzware: any = {};

    for (let key of Object.keys(dtlData)) {
      var lastStr = key.split("_").pop();
      if (lastStr === "0") {
        let keyData = key || "";
        detailDataFinacle[
          keyData.length > 2
            ? keyData.substring(0, keyData.length - 2)
            : keyData
        ] = dtlData[key];
      } else if (lastStr === "1") {
        let keyData = key || "";
        detailDataAbabil[
          keyData.length > 2
            ? keyData.substring(0, keyData.length - 2)
            : keyData
        ] = dtlData[key];
      } else if (lastStr === "2") {
        let keyData = key || "";
        detailDataTranzware[
          keyData.length > 2
            ? keyData.substring(0, keyData.length - 2)
            : keyData
        ] = dtlData[key];
      }
    }
    mstData["FINACLEDATA"] = detailDataFinacle;
    mstData["ABABILDATA"] = detailDataAbabil;
    mstData["TRANZWAREDATA"] = detailDataTranzware;
    return mstData;
  };

  const onFormButtonClickHandel = (id) => {
    setTranPerticulerDialog({
      open: true,
      buttonName: id,
      defaultMode: "edit",
    });
  };
  const onConfirmFormButtonClickHandel = (id) => {
    setTranPerticulerDialog({
      open: true,
      buttonName: id,
      defaultMode: "view",
    });
  };

  const onSaveTranParticulars = (tranParticulars) => {
    if (isTranPerticulerDialog.buttonName === "TRAN_PARTICULARS_BTN_0") {
      isTranparticularRef.current = {
        ...isTranparticularRef.current,
        TRN_PERTICULERS_0: tranParticulars?.finacle1,
        TRN_PERTICULERS2_0: tranParticulars?.finacle2,
        ABABIL_TRN_PERTICULERS_0: tranParticulars?.ababil1,
        ABABIL_TRN_PERTICULERS2_0: tranParticulars?.ababil2,
        TRANZWARE_TRN_PERTICULERS_0: tranParticulars?.tranzware1,
        TRANZWARE_TRN_PERTICULERS2_0: tranParticulars?.tranzware2,
      };
    } else if (isTranPerticulerDialog.buttonName === "TRAN_PARTICULARS_BTN_1") {
      isTranparticularRef.current = {
        ...isTranparticularRef.current,
        TRN_PERTICULERS_1: tranParticulars?.finacle1,
        TRN_PERTICULERS2_1: tranParticulars?.finacle2,
        ABABIL_TRN_PERTICULERS_1: tranParticulars?.ababil1,
        ABABIL_TRN_PERTICULERS2_1: tranParticulars?.ababil2,
        TRANZWARE_TRN_PERTICULERS_1: tranParticulars?.tranzware1,
        TRANZWARE_TRN_PERTICULERS2_1: tranParticulars?.tranzware2,
      };
    } else if (isTranPerticulerDialog.buttonName === "TRAN_PARTICULARS_BTN_2") {
      isTranparticularRef.current = {
        ...isTranparticularRef.current,
        TRN_PERTICULERS_2: tranParticulars?.finacle1,
        TRN_PERTICULERS2_2: tranParticulars?.finacle2,
        ABABIL_TRN_PERTICULERS_2: tranParticulars?.ababil1,
        ABABIL_TRN_PERTICULERS2_2: tranParticulars?.ababil2,
        TRANZWARE_TRN_PERTICULERS_2: tranParticulars?.tranzware1,
        TRANZWARE_TRN_PERTICULERS2_2: tranParticulars?.tranzware2,
      };
    }
    ClosedEventCall();
  };

  const ClosedEventCall = useCallback(() => {
    setTranPerticulerDialog({ open: false, buttonName: "", defaultMode: "" });
  }, [navigate]);

  useEffect(() => {
    isTranparticularRef.current = ObjectMappingKeys(
      glDetails.data?.[0],
      "TRN_PERTICULERS_0",
      "TRN_PERTICULERS2_0",
      "ABABIL_TRN_PERTICULERS_0",
      "ABABIL_TRN_PERTICULERS2_0",
      "TRANZWARE_TRN_PERTICULERS_0",
      "TRANZWARE_TRN_PERTICULERS2_0",
      "TRN_PERTICULERS_1",
      "TRN_PERTICULERS2_1",
      "ABABIL_TRN_PERTICULERS_1",
      "ABABIL_TRN_PERTICULERS2_1",
      "TRANZWARE_TRN_PERTICULERS_1",
      "TRANZWARE_TRN_PERTICULERS2_1",
      "TRN_PERTICULERS_2",
      "TRN_PERTICULERS2_2",
      "ABABIL_TRN_PERTICULERS_2",
      "ABABIL_TRN_PERTICULERS2_2",
      "TRANZWARE_TRN_PERTICULERS_2",
      "TRANZWARE_TRN_PERTICULERS2_2"
    );
  }, [glDetails.data]);

  // confirmMerchantOnboard

  const result = useMutation(API.confirmMerchantOnboard, {
    onSuccess: (response: any) => {
      // refetch();
      isDataChangedRef.current = true;
      enqueueSnackbar(response, { variant: "success" });
      onActionCancel();
      closeDialog();
    },
    onError: (error: any) => {
      enqueueSnackbar(error?.error_msg ?? "error", { variant: "error" });
    },
    onSettled: () => {
      onActionCancel();
    },
  });

  const onAcceptPopupYes = (rows) => {
    result.mutate({
      CONFIRMED: "Y",
      TRAN_CD: rows?.TRAN_CD ?? "",
    });
  };
  const onRejectPopupYes = (rows) => {
    result.mutate({
      CONFIRMED: "R",
      TRAN_CD: rows?.TRAN_CD ?? "",
    });
  };
  const onActionCancel = () => {
    setIsOpenAccept(false);
    setIsOpenReject(false);
    setIsAccept(false);
  };

  useEffect(() => {
    return () => {
      queryClient.removeQueries([
        "getMerchantOnboardingglDetails",
        { formView, tranCode: rows?.[0]?.data?.TRAN_CD },
      ]);
      queryClient.removeQueries(["getTranParticularKeys"]);
      queryClient.removeQueries(["GetPGWMerchantList"]);
    };
  }, [formView, rows?.[0]?.data?.TRAN_CD]);

  //@ts-ignore
  let errorMsg = `${glDetails?.error?.error_msg}`;
  errorMsg = Boolean(errorMsg.trim()) ? errorMsg : "Unknown error occured";

  //@ts-ignore
  let errorDetail = `${glDetails?.error?.error_detail ?? ""}`;

  if (formMode === "confirm") {
    MerchantOnboardingMetadata.form.label = "Merchant Onboarding Confirmation";
  } else if (formMode === "edit" || formMode === "new" || formMode === "view") {
    MerchantOnboardingMetadata.form.label = "Merchant Onboarding Configuration";
  }

  return (
    <>
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
        {glDetails.isLoading ? (
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
        ) : glDetails.isError === true ? (
          <>
            <Alert
              severity="error"
              errorMsg={errorMsg}
              errorDetail={errorDetail}
            />
            {typeof closeDialog === "function" ? (
              <div style={{ position: "absolute", right: 0, top: 0 }}>
                <IconButton onClick={closeDialog}>
                  <HighlightOffOutlinedIcon />
                </IconButton>
              </div>
            ) : null}
          </>
        ) : formMode === "edit" || formMode === "new" ? (
          <>
            <FormWrapper
              key={`MerchantOnboardConfig-${formMode}`}
              metaData={
                extractMetaData(
                  MerchantOnboardingMetadata,
                  formView
                ) as MetaDataType
              }
              initialValues={rows?.[0]?.data ?? []}
              onSubmitHandler={onSubmitHandler}
              displayMode={formMode}
              formStyle={{
                background: "white",
              }}
            >
              {({ isSubmitting, handleSubmit }) => (
                <>
                  <Button
                    onClick={(event) => {
                      isSubmitEventRef.current = event;
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
                  {/* <Button
                    // onClick={closeDialog}
                    // onClick={moveToViewMode}

                    color={"primary"}
                  // disabled={isSubmitting}
                  >
                    Close
                  </Button> */}
                  <Button
                    onClick={
                      formMode === "new"
                        ? closeDialog
                        : () => setFormMode("view")
                    }
                    //disabled={isSubmitting}
                    color={"primary"}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </FormWrapper>
            <FormWrapper
              key={`fromSourceDetail${formMode}`}
              //@ts-ignore
              metaData={FromSourceMetaData as MetaDataType}
              initialValues={glDetails.data?.[0] ?? []}
              onSubmitHandler={onSubmitHandlerDTL}
              controlsAtBottom={true}
              displayMode={formMode}
              formStyle={{
                background: "white",
                height: "calc(43vh - 48px)",
                overflowY: "auto",
                overflowX: "hidden",
                // padding: "24px",
              }}
              hideHeader={true}
              ref={isDetailFormRef}
              onFormButtonClickHandel={onFormButtonClickHandel}
            ></FormWrapper>
            {isAccept ? (
              <PopupMessageAPIWrapper
                MessageTitle="Confirmation"
                Message="Do you want to Save this Request?"
                onActionYes={(rowVal) => onAcceptYes(rowVal)}
                onActionNo={() => onActionCancel()}
                rows={isErrorFuncRef.current?.data}
                // rows={rows?.[0]?.data}
                open={isAccept}
                loading={saveMutation.isLoading}
              />
            ) : null}
            {isTranPerticulerDialog.open ? (
              <TranParticularsWrapper
                open={isTranPerticulerDialog.open}
                handleDialogClose={ClosedEventCall}
                isDataChangedRef={isDataChangedRef}
                onSaveData={onSaveTranParticulars}
                description={rows?.[0]?.data?.PID}
                rowsdata={isTranparticularRef.current}
                buttonName={isTranPerticulerDialog.buttonName}
                defaultMode={isTranPerticulerDialog.defaultMode}
              />
            ) : null}
            {/* {isAmountLabelOpen ? (
        <AmountLabelsGridWrapper
          open={isAmountLabelOpen}
          closeDialog={() => {
            ClosedEventCall();
          }}
          rowData={rowsdata}
        />
      ) : null} */}
          </>
        ) : formMode === "view" ? (
          <>
            <FormWrapper
              key={`MerchantOnboardConfig-${formMode}`}
              metaData={
                extractMetaData(
                  MerchantOnboardingMetadata,
                  formView
                ) as MetaDataType
              }
              initialValues={rows?.[0]?.data ?? []}
              onSubmitHandler={onSubmitHandler}
              displayMode={formMode}
              formStyle={{
                background: "white",
              }}
            >
              {({ isSubmitting, handleSubmit }) => (
                <>
                  {/* <Button
                    onClick={(event) => {
                      isSubmitEventRef.current = event;
                      handleSubmit(event, "Save");
                    }}
                    // disabled={isSubmitting}
                    // endIcon={
                    //   isSubmitting ? <CircularProgress size={20} /> : null
                    // }
                    color={"primary"}
                  >
                    Save
                  </Button>*/}
                  <Button onClick={moveToEditMode} color={"primary"}>
                    Edit
                  </Button>
                  <Button
                    onClick={closeDialog}
                    color={"primary"}
                    // disabled={isSubmitting}
                  >
                    Close
                  </Button>
                </>
              )}
            </FormWrapper>
            <FormWrapper
              //@ts-ignore
              metaData={FromSourceMetaData as MetaDataType}
              initialValues={glDetails.data?.[0] ?? []}
              onSubmitHandler={onSubmitHandlerDTL}
              controlsAtBottom={true}
              displayMode={formMode}
              formStyle={{
                background: "white",
                height: "calc(43vh - 48px)",
                overflowY: "auto",
                overflowX: "hidden",
                // padding: "24px",
              }}
              hideHeader={true}
              ref={isDetailFormRef}
              onFormButtonClickHandel={onConfirmFormButtonClickHandel}
            ></FormWrapper>
            {isAccept ? (
              <PopupMessageAPIWrapper
                MessageTitle="Confirmation"
                Message="Do you want to Save this Request?"
                onActionYes={(rowVal) => onAcceptYes(rowVal)}
                onActionNo={() => onActionCancel()}
                rows={isErrorFuncRef.current?.data}
                // rows={rows?.[0]?.data}
                open={isAccept}
                loading={result.isLoading}
              />
            ) : null}
            {isTranPerticulerDialog.open ? (
              <TranParticularsWrapper
                open={isTranPerticulerDialog.open}
                handleDialogClose={ClosedEventCall}
                isDataChangedRef={isDataChangedRef}
                onSaveData={onSaveTranParticulars}
                description={rows?.[0]?.data?.PID}
                rowsdata={isTranparticularRef.current}
                buttonName={isTranPerticulerDialog.buttonName}
                defaultMode={isTranPerticulerDialog.defaultMode}
              />
            ) : null}
            {/* {isAmountLabelOpen ? (
        <AmountLabelsGridWrapper
          open={isAmountLabelOpen}
          closeDialog={() => {
            ClosedEventCall();
          }}
          rowData={rowsdata}
        />
      ) : null} */}
          </>
        ) : formMode === "confirm" ? (
          <>
            <FormWrapper
              key={`MerchantOnboardConfig-${formMode}`}
              metaData={
                extractMetaData(
                  MerchantOnboardingMetadata,
                  formView
                ) as MetaDataType
              }
              initialValues={rows?.[0]?.data ?? []}
              onSubmitHandler={onSubmitHandler}
              displayMode={"view"}
              formStyle={{
                background: "white",
              }}
            >
              {({ isSubmitting, handleSubmit }) => (
                <>
                  <Button
                    onClick={() => {
                      if (
                        (
                          rows?.[0]?.data?.LAST_ENTERED_BY || ""
                        ).toLowerCase() ===
                        (
                          authController?.authState?.user?.id || ""
                        ).toLowerCase()
                      ) {
                        enqueueSnackbar("You can not accept your own entry.", {
                          variant: "warning",
                        });
                      } else {
                        setIsOpenAccept(true);
                      }
                    }}
                    color={"primary"}
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={() => {
                      if (
                        (
                          rows?.[0]?.data?.LAST_ENTERED_BY || ""
                        ).toLowerCase() ===
                        (
                          authController?.authState?.user?.id || ""
                        ).toLowerCase()
                      ) {
                        enqueueSnackbar("You can not revert your own entry.", {
                          variant: "warning",
                        });
                      } else {
                        setIsOpenReject(true);
                      }
                    }}
                    color={"primary"}
                  >
                    Revert
                  </Button>
                  {typeof closeDialog === "function" ? (
                    <Button onClick={closeDialog} color={"primary"}>
                      Close
                    </Button>
                  ) : null}
                </>
              )}
            </FormWrapper>
            <FormWrapper
              //@ts-ignore
              metaData={FromSourceMetaData as MetaDataType}
              initialValues={glDetails.data?.[0] ?? []}
              onSubmitHandler={onSubmitHandlerDTL}
              controlsAtBottom={true}
              formStyle={{
                background: "white",
                height: "calc(43vh - 48px)",
                overflowY: "auto",
                overflowX: "hidden",
                // padding: "24px",
              }}
              hideHeader={true}
              ref={isDetailFormRef}
              displayMode={"view"}
              onFormButtonClickHandel={onConfirmFormButtonClickHandel}
            ></FormWrapper>
            {isOpenAccept ? (
              <PopupMessageAPIWrapper
                MessageTitle="Confirmation"
                Message="Do you want to accept this Request?"
                onActionYes={(rowVal) => onAcceptPopupYes(rowVal)}
                onActionNo={() => onActionCancel()}
                rows={rows?.[0]?.data}
                open={isOpenAccept}
                loading={result.isLoading}
              />
            ) : null}
            {isOpenReject ? (
              <PopupMessageAPIWrapper
                MessageTitle="Confirmation"
                Message="Do you want to revert this request?"
                onActionYes={(rowVal) => onRejectPopupYes(rowVal)}
                onActionNo={() => onActionCancel()}
                rows={rows?.[0]?.data}
                open={isOpenReject}
                loading={result.isLoading}
              />
            ) : null}
            {isTranPerticulerDialog.open ? (
              <TranParticularsWrapper
                open={isTranPerticulerDialog.open}
                handleDialogClose={ClosedEventCall}
                isDataChangedRef={isDataChangedRef}
                onSaveData={onSaveTranParticulars}
                description={rows?.[0]?.data?.PID}
                rowsdata={isTranparticularRef.current}
                buttonName={isTranPerticulerDialog.buttonName}
                defaultMode={isTranPerticulerDialog.defaultMode}
              />
            ) : null}
          </>
        ) : (
          <></>
        )}
      </Dialog>
    </>
  );
};
