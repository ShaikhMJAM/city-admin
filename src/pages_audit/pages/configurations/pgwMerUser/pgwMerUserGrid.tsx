import {
  useRef,
  useCallback,
  useEffect,
  useContext,
  Fragment,
  useState,
} from "react";
import { PGWGridMetaData } from "./gridMetadata";
import GridWrapper from "components/dataTableStatic";
import { Alert } from "components/common/alert";
import { ActionTypes } from "components/dataTable";
import { Route, Routes, useNavigate } from "react-router-dom";
import { GridMetaDataType } from "components/dataTable/types";
import { ClearCacheContext, ClearCacheProvider, queryClient } from "cache";
import { useMutation, useQuery } from "react-query";
import * as API from "./api";
import { PgwMerUserEntryWrapper } from "./pgwMerUserEntry/pgwMerUser";
import { useSnackbar } from "notistack";
import { MessageBoxWrapper } from "components/custom/messageBoxWrapper";
const actions: ActionTypes[] = [
  {
    actionName: "view-detail",
    actionLabel: "View Detail",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "delete",
    actionLabel: "Delete",
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
    return updateAUTHDetailData({ data });
  };
export const PgwMerUser = () => {
  const { enqueueSnackbar } = useSnackbar();
  const isDataChangedRef = useRef(false);
  const myGridRef = useRef<any>(null);
  const { getEntries } = useContext(ClearCacheContext);
  const [rowData, setRowData] = useState({});
  const navigate = useNavigate();
  const [isDelete, SetDelete] = useState(false);
  const isDeleteDataRef = useRef<any>(null);
  const setCurrentAction = useCallback(
    (data) => {
      setRowData(data?.rows);
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
  const deleteMutation = useMutation(
    updateAUTHDetailDataWrapperFn(API.updatePgwMerUserEntry),
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

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery<
    any,
    any
  >(["getPGWGridData", "ALL", "ENTRY"], () =>
    API.getPGWGridData("ALL", "ENTRY")
  );

  useEffect(() => {
    return () => {
      queryClient.removeQueries(["getPGWGridData", "ALL", "ENTRY"]);
    };
  }, [getEntries]);

  const ClosedEventCall = useCallback(() => {
    navigate(".");
    if (isDataChangedRef.current) {
      isDataChangedRef.current = false;
      refetch();
    }
  }, [navigate]);

  PGWGridMetaData.gridConfig.gridLabel = "PGW Merchant Users";

  const onDeleteYes = (rowData) => {
    deleteMutation.mutate({
      data: { ...rowData?.data, _isDeleteRow: true },
    });
  };

  return (
    <Fragment>
      {isError && (
        <Alert
          severity="error"
          errorMsg={error?.error_msg ?? "Something went to wrong.."}
          errorDetail={error?.error_detail}
          color="error"
        />
      )}
      <GridWrapper
        key={`PGWGrid`}
        finalMetaData={PGWGridMetaData as GridMetaDataType}
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
          path="view-detail/*"
          element={
            <ClearCacheProvider>
              <PgwMerUserEntryWrapper
                isDataChangedRef={isDataChangedRef}
                defaultmode={"view"}
                handleDialogClose={ClosedEventCall}
              />
            </ClearCacheProvider>
          }
        />
        <Route
          path="add/*"
          element={
            <ClearCacheProvider>
              <PgwMerUserEntryWrapper
                isDataChangedRef={isDataChangedRef}
                defaultmode={"add"}
                handleDialogClose={ClosedEventCall}
              />
            </ClearCacheProvider>
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
