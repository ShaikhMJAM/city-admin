import { ClearCacheContext, ClearCacheProvider, queryClient } from "cache";
import GridWrapper from "components/dataTableStatic";
import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { holidayGrid } from "./gridMetaData";
import * as API from "./api";
// import * as APIDTL from "./holidayConfigurationForm";
import { useMutation, useQuery } from "react-query";
import { Alert } from "components/common/alert";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ViewEditHolidayAppForm } from "./holidayConfigurationForm";
import { MessageBoxWrapper } from "components/custom/messageBoxWrapper";
import { useSnackbar } from "notistack";
import { ActionTypes } from "components/dataTable";
import { BusinessDayFormWrapper } from "./businessDayConfig/businessDayConfigForm";
const actions: ActionTypes[] = [
  {
    actionName: "add",
    actionLabel: "Add",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
  {
    actionName: "view-detail",
    actionLabel: "View Details",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "delete",
    actionLabel: "Delete",
    multiple: false,
    rowDoubleClick: false,
  },
  {
    actionName: "business-day-config",
    actionLabel: "Business Day Config",
    multiple: false,
    rowDoubleClick: false,
  },
];
interface updateAUTHDetailDataType {
  data: any;
  displayData?: any;
  endSubmit?: any;
  setFieldError?: any;
}

const updateAUTHDetailDataWrapperFn =
  (updateAUTHDetailData) =>
  async ({ data }: updateAUTHDetailDataType) => {
    return updateAUTHDetailData(data);
  };
export const HolidayData = () => {
  const { enqueueSnackbar } = useSnackbar();
  const isDataChangedRef = useRef(false);
  const myGridRef = useRef<any>(null);
  const isDeleteDataRef = useRef<any>(null);
  const dataRef = useRef<any>(null);
  const { getEntries } = useContext(ClearCacheContext);
  const navigate = useNavigate();
  const [isDelete, SetDelete] = useState(false);
  const { data, isLoading, isFetching, isError, error, refetch }: any =
    useQuery(["getHolidayConfig"], API.getHolidayConfig);
  const setCurrentAction = useCallback(
    (datarow) => {
      if (datarow?.name === "delete") {
        isDeleteDataRef.current = datarow?.rows?.[0];
        SetDelete(true);
      } else if (datarow?.name === "business-day-config") {
        console.log(">>datarow?.rows", datarow?.rows);
        if (Number(datarow?.rows?.[0]?.data?.BUSINESS_DAY ?? "0") > 0) {
          navigate(datarow?.name, {
            state: datarow?.rows,
          });
        } else {
          enqueueSnackbar(
            "Business Day has been not generated. Please generate a Business Day through the View Details Screen.",
            {
              variant: "warning",
            }
          );
        }
      } else {
        navigate(datarow?.name, {
          state: datarow?.rows,
        });
      }
    },
    [navigate]
  );
  useEffect(() => {
    return () => {
      let entries = getEntries() as any[];
      if (Array.isArray(entries) && entries.length > 0) {
        entries.forEach((one) => {
          queryClient.removeQueries(one);
        });
      }
      queryClient.removeQueries(["getHolidayConfig"]);
    };
  }, [getEntries]);
  useEffect(() => {
    if (data) {
      dataRef.current = data;
    }
  }, [data]);
  const handleDialogClose = () => {
    if (isDataChangedRef.current === true) {
      isDataChangedRef.current = false;
      refetch();
    }
    navigate(".");
  };

  const deleteMutation = useMutation(
    updateAUTHDetailDataWrapperFn(API.updHolidayConfigInsert),
    {
      onError: (error: any) => {},
      onSuccess: (data) => {
        enqueueSnackbar("Records successfully deleted", {
          variant: "success",
        });
        refetch();
        SetDelete(false);
      },
    }
  );

  const onDeleteYes = (rows) => {
    deleteMutation.mutate({ data: { ...rows?.data, _isDeleteRow: true } });
  };

  return (
    <Fragment>
      {isError ? (
        <Alert
          severity={error?.severity ?? "error"}
          errorMsg={error?.error_msg ?? "Error"}
          errorDetail={error?.error_detail ?? ""}
        />
      ) : (
        ""
      )}
      <GridWrapper
        key={`HolidayConfigGrid`}
        finalMetaData={holidayGrid}
        data={data ?? []}
        setData={() => null}
        actions={actions}
        setAction={setCurrentAction}
        refetchData={() => refetch()}
        loading={isLoading || isFetching}
        ref={myGridRef}
      />

      <Routes>
        <Route
          path="add/*"
          element={
            <ViewEditHolidayAppForm
              isDataChangedRef={isDataChangedRef}
              closeDialog={handleDialogClose}
              lastGridEntry={data ?? []}
              defaultView={"new"}
            />
          }
        />
        <Route
          path="view-detail/*"
          element={
            <ViewEditHolidayAppForm
              isDataChangedRef={isDataChangedRef}
              closeDialog={handleDialogClose}
              lastGridEntry={data ?? []}
              defaultView={"view"}
            />
          }
        />
        <Route
          path="business-day-config/*"
          element={
            <BusinessDayFormWrapper
              isDataChangedRef={isDataChangedRef}
              closeDialog={handleDialogClose}
              defaultView={"view"}
            />
          }
        />
      </Routes>
      {isDelete ? (
        <MessageBoxWrapper
          isOpen={isDelete}
          validMessage={"Would you like to delete the selected record?"}
          onActionYes={(rowVal) => onDeleteYes(rowVal)}
          onActionNo={() => {
            SetDelete(false);
          }}
          isLoading={deleteMutation.isLoading}
          isError={deleteMutation.isError}
          error_msg={deleteMutation.error?.error_msg ?? "Unknown Error occured"}
          error_detail={deleteMutation.error?.error_detail ?? ""}
          loadingText={"Deleting..."}
          rows={isDeleteDataRef.current}
        />
      ) : null}
    </Fragment>
  );
};

export const HolidayGridWrapper = () => {
  return (
    <ClearCacheProvider>
      <HolidayData />
    </ClearCacheProvider>
  );
};
