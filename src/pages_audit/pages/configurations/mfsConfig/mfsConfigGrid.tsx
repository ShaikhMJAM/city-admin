import {
  useRef,
  useCallback,
  useEffect,
  useContext,
  Fragment,
  useState,
} from "react";
import { MFSGridMetaData } from "./gridMetadata";
import GridWrapper from "components/dataTableStatic";
import { Alert } from "components/common/alert";
import { ActionTypes } from "components/dataTable";
import { Route, Routes, useNavigate } from "react-router-dom";
import { GridMetaDataType } from "components/dataTable/types";
import { ClearCacheContext, queryClient } from "cache";
import { useMutation, useQuery } from "react-query";
import * as API from "./api";
import { MFSConfigEntryWrapper } from "./mfsConfigEntry/mfsConfig";
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
    return updateAUTHDetailData({ data });
  };
export const MFSConfig = () => {
  const isDataChangedRef = useRef(false);
  const myGridRef = useRef<any>(null);
  const { getEntries } = useContext(ClearCacheContext);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isDelete, SetDelete] = useState(false);
  const isDeleteDataRef = useRef<any>(null);
  const [rowData, setRowData] = useState({});

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

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery<
    any,
    any
  >(["getMFSGridData", "ALL"], () => API.getMFSGridData("ALL", "ENTRY"));

  useEffect(() => {
    return () => {
      queryClient.removeQueries(["getMFSGridData", "ALL"]);
    };
  }, [getEntries]);

  const ClosedEventCall = useCallback(() => {
    navigate(".");
    if (isDataChangedRef.current) {
      isDataChangedRef.current = false;
      refetch();
    }
  }, [navigate]);

  const deleteMutation = useMutation(API.deleteMFSConfigEntry, {
    onError: (error: any) => {},
    onSuccess: (data) => {
      isDataChangedRef.current = true;
      enqueueSnackbar("Records successfully deleted", {
        variant: "success",
      });
      // closeDialog();
      SetDelete(false);
      refetch();
    },
  });

  const onDeleteYes = (rows) => {
    deleteMutation.mutate({ data: { ...rows?.data, _isDeleteRow: true } });
  };
  MFSGridMetaData.gridConfig.gridLabel = "MFS Configuration";

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
        key={`MFSGrid`}
        finalMetaData={MFSGridMetaData as GridMetaDataType}
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
            <MFSConfigEntryWrapper
              isDataChangedRef={isDataChangedRef}
              defaultmode={"view"}
              handleDialogClose={ClosedEventCall}
            />
          }
        />
        <Route
          path="add/*"
          element={
            <MFSConfigEntryWrapper
              isDataChangedRef={isDataChangedRef}
              defaultmode={"add"}
              handleDialogClose={ClosedEventCall}
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
