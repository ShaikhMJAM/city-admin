import { ClearCacheContext, ClearCacheProvider, queryClient } from "cache";
import { Alert } from "components/common/alert";
import GridWrapper, { GridMetaDataType } from "components/dataTableStatic";
import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useMutation, useQuery } from "react-query";
import * as API from "./api";
import { TenureTypeConfigGridMetaData } from "./gridMetadata";

import { ActionTypes } from "components/dataTable";
import { Route, Routes, useNavigate } from "react-router-dom";

import {
  TenureTypeFormWrapper,
  ViewEditTenureTypeWrapper,
} from "./tenureTypeForm";
import { useSnackbar } from "notistack";
import { MessageBoxWrapper } from "components/custom/messageBoxWrapper";
const actions: ActionTypes[] = [
  {
    actionName: "view-details",
    actionLabel: "View Details",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "add",
    actionLabel: "Add",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
  {
    actionName: "delete",
    actionLabel: "Delete",
    multiple: false,
    rowDoubleClick: true,
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
export const TenureTypeConfigGrid = () => {
  const { enqueueSnackbar } = useSnackbar();
  const myGridRef = useRef<any>(null);
  const navigate = useNavigate();
  const isDataChangedRef = useRef(false);
  const [isDelete, SetDelete] = useState(false);
  const { getEntries } = useContext(ClearCacheContext);
  const isDeleteDataRef = useRef<any>(null);
  const { data, isLoading, isFetching, isError, error, refetch } = useQuery<
    any,
    any
  >(["getTenureTypeConfigGridData"], API.getTenureTypeConfigGridData);

  const deleteMutation = useMutation(
    updateAUTHDetailDataWrapperFn(API.updateTenureTypeConfigData),
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
  useEffect(() => {
    return () => {
      let entries = getEntries() as any[];
      if (Array.isArray(entries) && entries.length > 0) {
        entries.forEach((one) => {
          queryClient.removeQueries(one);
        });
      }
      queryClient.removeQueries(["getTenureTypeConfigGridData"]);
    };
  }, [getEntries]);

  const setCurrentAction = useCallback(
    (data) => {
      if (data?.name === "delete") {
        isDeleteDataRef.current = data?.rows?.[0];
        SetDelete(true);
      } else if (data?.name === "add") {
        navigate(data?.name, {
          state: [],
        });
      } else {
        navigate(data?.name, {
          state: data?.rows,
        });
      }
    },
    [navigate]
  );
  const ClosedEventCall = useCallback(() => {
    navigate(".");
    if (isDataChangedRef.current === true) {
      refetch();
      isDataChangedRef.current = false;
    }
  }, [navigate]);

  return (
    <Fragment>
      <>
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
          key={`tenureTypeConfigGrid`}
          finalMetaData={TenureTypeConfigGridMetaData as GridMetaDataType}
          data={data ?? []}
          setData={() => null}
          loading={isLoading || isFetching}
          actions={actions}
          setAction={setCurrentAction}
          refetchData={() => refetch()}
          ref={myGridRef}
        />
        <Routes>
          <Route
            path="add/*"
            element={
              <TenureTypeFormWrapper
                closeDialog={ClosedEventCall}
                isDataChangedRef={isDataChangedRef}
              />
            }
          />
          <Route
            path="view-details/*"
            element={
              <ViewEditTenureTypeWrapper
                isDataChangedRef={isDataChangedRef}
                closeDialog={ClosedEventCall}
                defaultView={"view"}
              />
            }
          />
        </Routes>
      </>

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

export const TenureTypeConfigGridWrapper = () => {
  return (
    <ClearCacheProvider>
      <TenureTypeConfigGrid />
    </ClearCacheProvider>
  );
};
