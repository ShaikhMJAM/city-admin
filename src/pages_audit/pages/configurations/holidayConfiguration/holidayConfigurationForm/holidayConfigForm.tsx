import {
  FC,
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";
import { queryClient } from "cache";
import { useMutation, useQueries } from "react-query";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import Dialog from "@mui/material/Dialog";
import { Alert } from "components/common/alert";
import * as API from "../api";
import { LoaderPaperComponent } from "components/common/loaderPaper";
import { MasterDetailsForm } from "components/formcomponent";
import { HolidayMetadata } from "./metaData";
import { PopupMessageAPIWrapper } from "components/custom/popupMessage";
import { useSnackbar } from "notistack";
import { AuthContext } from "pages_audit/auth";
import { format } from "date-fns";
import { HolidayGrid } from "./holiday";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useTypeStyles = makeStyles((theme) => ({
  typography: {
    flex: "1 1 100%",
    color: "var(--theme-color1)",
    textAlign: "left",
    paddingLeft: "10px",
  },
  fontSize: {
    fontSize: "initial",
  },
}));

const HolidayConfigForm: FC<{
  isDataChangedRef: any;
  closeDialog?: any;
  defaultView?: any;
  transactionID: number;
  compCD: number;
  data: any;
  lastGridEntry: any;
}> = ({
  isDataChangedRef,
  closeDialog,
  defaultView = "view",
  transactionID,
  compCD,
  data: reqData,
  lastGridEntry,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const { authState } = useContext(AuthContext);
  const [formMode, setFormMode] = useState(defaultView);
  const mysubdtlRef = useRef<any>({});
  const [openAccept, setopenAccept] = useState(false);
  const headerClasses = useTypeStyles();
  const [isHoliday, setHoliday] = useState(false);
  const isErrorFuncRef = useRef<any>(null);
  const moveToViewMode = useCallback(() => setFormMode("view"), [setFormMode]);
  const moveToEditMode = useCallback(() => setFormMode("edit"), [setFormMode]);
  // const moveToNewMode = useCallback(() => setFormMode("new"), [setFormMode]);
  const myRef = useRef<any>(null);
  const mutation = useMutation(API.updHolidayConfigInsert, {
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
      closeDialog();
    },
  });

  const genBusinessDay = useMutation(API.generateBusinessDay, {
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
    },
    onSuccess: (data) => {
      enqueueSnackbar(data, {
        variant: "success",
      });
    },
  });

  const getMaxEndDate = useCallback((lastGridEntry): Date => {
    let maxDate = new Date(lastGridEntry[0]?.END_DT);

    lastGridEntry.forEach((item) => {
      const currentDate = new Date(item.END_DT);
      if (currentDate > maxDate) maxDate = currentDate;
    });

    return new Date(maxDate);
  }, []);

  const onSubmitHandler = ({
    data,
    displayData,
    endSubmit,
    setFieldErrors,
  }) => {
    //@ts-ignore
    endSubmit(true);

    if (formMode === "new" && lastGridEntry.length > 0) {
      if (new Date(data.START_DT) <= getMaxEndDate(lastGridEntry)) {
        setFieldErrors({
          START_DT: "Start date must be greater than previous End date",
        });
        return;
      }
    }
    if (
      data?._isNewRow === false &&
      data?._UPDATEDCOLUMNS?.length === 0 &&
      data?.DETAILS_DATA?.isNewRow?.length === 0 &&
      data?.DETAILS_DATA?.isUpdatedRow?.length === 0 &&
      data?.DETAILS_DATA?.isNewRow?.length === 0
    ) {
      moveToViewMode();
      // closeDialog();
    } else {
      let isValidDate: any =
        formMode === "new"
          ? checkFromAndTodateisValid(reqData, data)
          : { isValid: true };

      console.log("isValidDate<<", isValidDate);

      if (formMode === "new" && isValidDate?.isValid === false) {
        if (isValidDate?.isStartDateValid === false) {
          setFieldErrors({
            START_DT:
              "This period is already configured(Start Date:" +
              isValidDate?.fromDate +
              " , End Date : " +
              isValidDate?.toDate +
              " ).",
          });
        } else if (isValidDate?.isStartDateValid === false) {
          setFieldErrors({
            END_DT:
              "This period is already configured(Start Date:" +
              isValidDate?.fromDate +
              " , End Date : " +
              isValidDate?.toDate +
              " ).",
          });
        } else {
          setFieldErrors({
            START_DT:
              "This period is already configured(Start Date:" +
              isValidDate?.fromDate +
              " , End Date : " +
              isValidDate?.toDate +
              " ).",
          });
        }
      } else {
        if (Boolean(data["START_DT"])) {
          data["START_DT"] = format(new Date(data["START_DT"]), "dd/MMM/yyyy");
        }
        if (Boolean(data["END_DT"])) {
          data["END_DT"] = format(new Date(data["END_DT"]), "dd/MMM/yyyy");
        }

        data["COMP_CD"] = authState.companyID;
        data["BRANCH_CD"] = authState.user.branchCode;
        isErrorFuncRef.current = {
          data,
          displayData,
          endSubmit,
          setFieldErrors,
        };
        setopenAccept(true);
      }
    }
  };

  const result = useQueries([
    {
      queryKey: ["getDetailsHolidayGridData", transactionID, compCD],
      queryFn: () =>
        API.getDetailsHolidayGridData(transactionID, compCD, formMode),
    },
  ]);
  useEffect(() => {
    return () => {
      queryClient.removeQueries([
        "getDetailsHolidayGridData",
        transactionID,
        compCD,
      ]);
    };
  }, [transactionID, compCD]);

  const loading = result[0].isLoading || result[0].isFetching;
  let isError = result[0].isError;
  //@ts-ignore
  let errorMsg = `${result[0].error?.error_msg}`;
  errorMsg = Boolean(errorMsg.trim()) ? errorMsg : "Unknown error occured";

  //@ts-ignore
  let error_detail = `${result[0]?.error?.error_detail}`;

  const AddNewRow = () => {
    myRef.current?.addNewRow(true);
  };
  const checkFromAndTodateisValid = (oldData, newData) => {
    console.log("oldData", oldData, "newData", newData);
    let isValid: any = { isValid: true };
    if (Boolean(oldData) && Boolean(newData) && Array.isArray(oldData)) {
      try {
        let newStartDate = new Date(newData?.START_DT);
        let newEndDate = new Date(newData?.END_DT);
        const dateStart = new Date(
          newStartDate.getFullYear(),
          newStartDate.getMonth(),
          newStartDate.getDate()
        );
        const dateEnd = new Date(
          newEndDate.getFullYear(),
          newEndDate.getMonth(),
          newEndDate.getDate()
        );
        let shouldSkip = false;
        oldData.forEach((item) => {
          if (shouldSkip) {
            return;
          }
          let startDateOld = new Date(
            new Date(item?.START_DT).getFullYear(),
            new Date(item?.START_DT).getMonth(),
            new Date(item?.START_DT).getDate()
          );
          let endDateOld = new Date(
            new Date(item?.END_DT).getFullYear(),
            new Date(item?.END_DT).getMonth(),
            new Date(item?.END_DT).getDate()
          );

          if (dateStart >= startDateOld && dateStart <= endDateOld) {
            isValid = {
              isValid: false,
              isStartDateValid: false,
              isEndDateValid: true,
              fromDate: format(startDateOld, "dd/MM/yyyy"),
              toDate: format(endDateOld, "dd/MM/yyyy"),
            };
            shouldSkip = true;
          } else if (dateEnd >= startDateOld && dateEnd <= endDateOld) {
            isValid = {
              isValid: false,
              isStartDateValid: true,
              isEndDateValid: false,
              fromDate: format(startDateOld, "dd/MM/yyyy"),
              toDate: format(endDateOld, "dd/MM/yyyy"),
            };
            shouldSkip = true;
          }
        });
      } catch (err) {
        console.log("Error in Date check", err);
      }
    }
    return isValid;
  };
  const onPopupYesAccept = (rows) => {
    mutation.mutate(rows);
  };
  const onActionCancel = () => {
    setopenAccept(false);
  };

  const onPopulateBusinessDay = () => {
    genBusinessDay.mutate(reqData?.[0]?.data?.TRAN_CD);
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
  ) : formMode === "new" ? (
    <>
      <MasterDetailsForm
        key={"holidayMaster"}
        metaData={HolidayMetadata}
        ref={myRef}
        initialData={{ _isNewRow: true, DETAILS_DATA: [] }}
        displayMode={"new"}
        onSubmitData={onSubmitHandler}
        isNewRow={true}
        formStyle={{
          background: "white",
          // height: "15vh",
          // overflowY: "auto",
          // overflowX: "hidden",
        }}
      >
        {({ isSubmitting, handleSubmit }) => {
          return (
            <>
              <Button
                onClick={AddNewRow}
                disabled={isSubmitting}
                color={"primary"}
              >
                Add Row
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                color={"primary"}
              >
                Save
              </Button>
              <Button
                onClick={closeDialog}
                disabled={isSubmitting}
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
          Message="Do You want to save this Request?"
          onActionYes={(rowVal) => onPopupYesAccept(rowVal)}
          onActionNo={() => onActionCancel()}
          rows={isErrorFuncRef.current?.data}
          open={openAccept}
          loading={mutation.isLoading}
        />
      ) : null}
    </>
  ) : formMode === "view" ? (
    <>
      <MasterDetailsForm
        key={"holidayMaster" + formMode}
        metaData={HolidayMetadata}
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
          height: "15vh",
          overflowY: "auto",
          overflowX: "hidden",
        }}
        containerstyle={{ padding: "10px" }}
      >
        {({ isSubmitting, handleSubmit }) => {
          return (
            <>
              <>
                {Number(reqData?.[0]?.data?.BUSINESS_DAY ?? "0") > 0 ? null : (
                  <Button onClick={onPopulateBusinessDay} color={"primary"}>
                    Populate Business Day
                  </Button>
                )}
              </>
              <Button onClick={moveToEditMode} color={"primary"}>
                Edit
              </Button>
              <Button onClick={closeDialog} color={"primary"}>
                Close
              </Button>
            </>
          );
        }}
      </MasterDetailsForm>
      <Typography
        className={headerClasses.typography}
        color="inherit"
        variant={"h6"}
        component="div"
      >
        <>
          {Number(reqData?.[0]?.data?.BUSINESS_DAY ?? "0") > 0 ? (
            <>
              Note :
              <span className={headerClasses.fontSize}>
                Business Days have already been generated. You can check in
                Business Day Configuration Screen.
              </span>
            </>
          ) : (
            <>
              Note :
              <span className={headerClasses.fontSize}>
                Click on "Populate Business Day" button to Generate Business
                Days.
              </span>
            </>
          )}
        </>
      </Typography>
    </>
  ) : formMode === "edit" ? (
    <>
      <MasterDetailsForm
        key={"holidayMaster" + formMode}
        metaData={HolidayMetadata}
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
          height: "15vh",
          overflowY: "auto",
          overflowX: "hidden",
        }}
        containerstyle={{ padding: "10px" }}
        onClickActionEvent={(index, id, data) => {
          mysubdtlRef.current = {
            // ...mysubdtlRef.current,
            SR_CD: data?.SR_CD,

            COMP_CD: data?.COMP_CD,
            ...data,
          };
          setHoliday(true);
        }}
      >
        {({ isSubmitting, handleSubmit }) => {
          return (
            <>
              <Button
                onClick={AddNewRow}
                disabled={isSubmitting}
                color={"primary"}
              >
                Add Row
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                color={"primary"}
              >
                Save
              </Button>
              <Button
                onClick={moveToViewMode}
                disabled={isSubmitting}
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
          Message="Do You want to save this Request?"
          onActionYes={(rowVal) => onPopupYesAccept(rowVal)}
          onActionNo={() => onActionCancel()}
          rows={isErrorFuncRef.current?.data}
          open={openAccept}
          loading={mutation.isLoading}
        />
      ) : null}

      {isHoliday ? (
        <HolidayGrid
          isOpen={isHoliday}
          formMode={formMode}
          onClose={() => {
            setHoliday(false);
          }}
          reqDataRef={mysubdtlRef}
          reqData={reqData}
        />
      ) : null}
    </>
  ) : null;

  return renderResult;
};

export const ViewEditHolidayAppForm = ({
  isDataChangedRef,
  closeDialog,
  defaultView,
  lastGridEntry,
}) => {
  const { state: data }: any = useLocation();
  return (
    <Fragment>
      <Dialog
        open={true}
        PaperProps={{
          style: {
            width: "65%",
          },
        }}
        maxWidth="md"
      >
        <HolidayConfigForm
          transactionID={data?.[0]?.data?.TRAN_CD}
          compCD={data?.[0]?.data?.COMP_CD}
          lastGridEntry={lastGridEntry ?? []}
          isDataChangedRef={isDataChangedRef}
          closeDialog={closeDialog}
          data={data}
          defaultView={defaultView}
        />
      </Dialog>
    </Fragment>
  );
};
