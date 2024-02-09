import {
  FC,
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { queryClient } from "cache";
import { useSnackbar } from "notistack";
import { cloneDeep } from "lodash-es";
import { useMutation, useQueries } from "react-query";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import Dialog from "@mui/material/Dialog";
import { Alert } from "components/common/alert";
import * as API from "../api";
import { LoaderPaperComponent } from "components/common/loaderPaper";
import { MasterDetailsMetaData } from "components/formcomponent/masterDetails/types";
import { MasterDetailsForm } from "components/formcomponent";
import { format } from "date-fns";
import { AuthContext } from "pages_audit/auth";
import { UniversityMasterDetailsMetaData } from "./universityMetaData";
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
    return updateMasterData({ data });
  };

const ViewEditUniversityMaster: FC<{
  isDataChangedRef: any;
  closeDialog?: any;
  defaultView?: "view" | "edit" | "confirm";
  readOnly?: boolean;
  transactionID: number;
  data: any;
}> = ({
  isDataChangedRef,
  closeDialog,
  defaultView = "view",
  readOnly = false,
  transactionID,
  data: reqData,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [formMode, setFormMode] = useState(defaultView);
  const authController = useContext(AuthContext);
  const [isOpenSave, setIsOpenSave] = useState(false);
  const isErrorFuncRef = useRef<any>(null);
  const moveToViewMode = useCallback(() => setFormMode("view"), [setFormMode]);
  const moveToEditMode = useCallback(() => setFormMode("edit"), [setFormMode]);
  const { authState } = useContext(AuthContext);
  const myRef = useRef<any>(null);
  const mutation = useMutation(
    updateMasterDataWrapperFn(API.updateOtherEntityData()),
    {
      onError: (error: any) => {
        let errorMsg = "Unknown Error occured";
        if (typeof error === "object") {
          errorMsg = error?.error_msg ?? errorMsg;
        }

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
        setIsOpenSave(false);
        closeDialog();
      },
    }
  );
  const mutationConfirm = useMutation(
    updateMasterDataWrapperFn(API.updateOtherEntityData()),
    {
      onError: (error: any) => {
        let errorMsg = "Unknown Error occured";
        if (typeof error === "object") {
          errorMsg = error?.error_msg ?? errorMsg;
        }
        enqueueSnackbar(errorMsg, {
          variant: "error",
        });
      },
      onSuccess: (data) => {
        enqueueSnackbar(data, {
          variant: "success",
        });
        isDataChangedRef.current = true;
        if (typeof closeDialog === "function") {
          closeDialog();
        }
      },
      onSettled: () => {
        onActionCancel();
      },
    }
  );

  const onActionCancel = () => {
    setIsOpenSave(false);
  };
  const onPopupYes = (rows) => {
    mutation.mutate({
      ...isErrorFuncRef.current,
      ENTITY_TYPE: "U",
    });
  };

  const onSubmitHandler = ({ data, displayData, endSubmit, setFieldError }) => {
    // setLoading(true);

    //@ts-ignore
    endSubmit(true);
    if (Boolean(data["EFFECTIVE_DT"])) {
      data["EFFECTIVE_DT"] = format(
        new Date(data["EFFECTIVE_DT"]),
        "dd/MMM/yyyy"
      );
    }

    // let upd = utilFunction.transformDetailsData(data, rows?.[0]?.data ?? {});
    isErrorFuncRef.current = {
      data: {
        ...data,
        // ...upd,
        COMP_CD: authController.authState.companyID,
        ENTITY_TYPE: "U",
      },
      displayData,
      endSubmit,
      setFieldError,
    };
    data["COMP_CD"] = authState.companyID;
    data["BRANCH_CD"] = authState.user.branchCode;
    data["ENTITY_TYPE"] = "U";
    if (Boolean(data?._OLDROWVALUE?.EFFECTIVE_DT)) {
      data._OLDROWVALUE.EFFECTIVE_DT = format(
        new Date(data._OLDROWVALUE.EFFECTIVE_DT),
        "dd/MMM/yyyy"
      );
    }

    if (
      Array.isArray(data?._UPDATEDCOLUMNS) &&
      data._UPDATEDCOLUMNS.length === 0 &&
      Array.isArray(data?.DETAILS_DATA?.isDeleteRow) &&
      data?.DETAILS_DATA?.isDeleteRow?.length === 0 &&
      Array.isArray(data?.DETAILS_DATA?.isNewRow) &&
      data?.DETAILS_DATA?.isNewRow?.length === 0 &&
      Array.isArray(data?.DETAILS_DATA?.isUpdatedRow) &&
      data?.DETAILS_DATA?.isUpdatedRow?.length === 0
    ) {
      moveToViewMode();
    } else {
      setIsOpenSave(true);
    }
    //mutation.mutate({ data, displayData, endSubmit, setFieldError });
  };

  const result = useQueries([
    {
      queryKey: ["getDetailsGridData", transactionID],
      queryFn: () => API.getDetailsGridData(transactionID),
    },
    {
      queryKey: ["GetMiscValue"],
      queryFn: () => API.GetMiscValue(),
    },
  ]);
  //const getMiscData = useQueries(API.GetMiscValue, ["GetMiscValue"]);
  useEffect(() => {
    return () => {
      queryClient.removeQueries(["getDetailsGridData", transactionID]);
      queryClient.removeQueries(["GetMiscValue"]);
    };
  }, [transactionID]);

  const loading = result[0].isLoading || result[0].isFetching;
  let isError = result[0].isError;
  //@ts-ignore
  let errorMsg = `${result[0].error?.error_msg}`;
  errorMsg = Boolean(errorMsg.trim()) ? errorMsg : "Unknown error occured";

  //@ts-ignore
  let error_detail = `${result[0]?.error?.error_detail}`;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  let metadata: MasterDetailsMetaData = {} as MasterDetailsMetaData;
  metadata = cloneDeep(
    UniversityMasterDetailsMetaData
  ) as MasterDetailsMetaData;
  const metaData = useMemo(() => {
    let myColumns = metadata.detailsGrid.columns;
    if (formMode === "view") {
      myColumns = metadata.detailsGrid.columns.filter(
        (one) => one.accessor !== "_hidden"
      );
    }
    return {
      ...metadata,
      detailsGrid: { ...metadata.detailsGrid, columns: myColumns },
    };
  }, [formMode, metadata]);

  const AddNewRow = () => {
    myRef.current?.addNewRow(true);
  };
  const renderResult = loading ? (
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
  ) : formMode === "view" ? (
    <MasterDetailsForm
      key={"universityMaster" + formMode}
      metaData={metaData}
      ref={myRef}
      initialData={{
        _isNewRow: false,
        ...reqData[0].data,
        DETAILS_DATA: result[0].data,
      }}
      displayMode={formMode}
      isLoading={true}
      onSubmitData={onSubmitHandler}
      isNewRow={false}
      formStyle={{
        background: "white",
        // height: "25vh",
        // overflowY: "auto",
        // overflowX: "hidden",
      }}
    >
      {({ isSubmitting, handleSubmit }) => {
        return (
          <>
            <Button
              onClick={moveToEditMode}
              //disabled={isSubmitting}
              //endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
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
        );
      }}
    </MasterDetailsForm>
  ) : formMode === "edit" ? (
    <>
      <MasterDetailsForm
        key={"universityMaster" + formMode}
        metaData={metaData}
        ref={myRef}
        initialData={{
          _isNewRow: false,
          ...reqData[0].data,
          DETAILS_DATA: result[0].data,
        }}
        displayMode={formMode}
        // isLoading={false}
        onSubmitData={onSubmitHandler}
        isNewRow={false}
        formStyle={{
          background: "white",
          // height: "25vh",
          // overflowY: "auto",
          // overflowX: "hidden",
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
                // endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                color={"primary"}
              >
                Save
              </Button>
              <Button
                onClick={moveToViewMode}
                // disabled={isSubmitting}
                color={"primary"}
              >
                Cancel
              </Button>
            </>
          );
        }}
      </MasterDetailsForm>
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
  ) : null;
  return renderResult;
};

export const ViewEditUniversityMasterWrapper = ({
  isDataChangedRef,
  closeDialog,
  defaultView,
}) => {
  const { state: data }: any = useLocation();
  return (
    <Fragment>
      <Dialog
        open={true}
        onClose={closeDialog}
        PaperProps={{
          style: {
            width: "100%",
          },
        }}
        maxWidth="md"
      >
        <ViewEditUniversityMaster
          transactionID={data?.[0]?.data?.TRAN_CD}
          isDataChangedRef={isDataChangedRef}
          closeDialog={closeDialog}
          data={data}
          defaultView={defaultView}
        />
      </Dialog>
    </Fragment>
  );
};
