import { ClearCacheProvider, ClearCacheContext, queryClient } from "cache";
import { useMutation, useQuery } from "react-query";
import {
  Fragment,
  useEffect,
  useContext,
  useRef,
  useCallback,
  useState,
} from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Alert } from "components/common/alert";
import GridWrapper from "components/dataTableStatic";
import { GridMetaDataType } from "components/dataTable/types";
import { ActionTypes } from "components/dataTable";
import * as API from "./api";
import { SourceParentGridMetaData } from "./gridMetadata";
import { useSnackbar } from "notistack";
import { SourceParentTypeFormWrapper } from "./SourceParentType";
import { MessageBoxWrapper } from "components/custom/messageBoxWrapper";
const actions: ActionTypes[] = [
  {
    actionName: "add",
    actionLabel: "Add",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
  {
    actionName: "edit-detail",
    actionLabel: "View Detail",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "delete",
    actionLabel: "Delete",
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
    return updateAUTHDetailData({ data });
  };
export const SourceParent = () => {
  const isDataChangedRef = useRef(false);
  const myGridRef = useRef<any>(null);
  const isDeleteDataRef = useRef<any>(null);
  const { getEntries } = useContext(ClearCacheContext);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isDelete, SetDelete] = useState(false);
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
  const { data, isLoading, isFetching, isError, error, refetch } = useQuery<
    any,
    any
  >(["getSourceParentGridData"], () => API.getSourceParentGridData());
  useEffect(() => {
    return () => {
      let entries = getEntries() as any[];
      if (Array.isArray(entries) && entries.length > 0) {
        entries.forEach((one) => {
          queryClient.removeQueries(one);
        });
      }
      queryClient.removeQueries(["getSourceParentGridData"]);
    };
  }, [getEntries]);

  const deleteMutation = useMutation(
    updateAUTHDetailDataWrapperFn(API.updSourceParentGridData),
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

  const ClosedEventCall = useCallback(() => {
    navigate(".");
    if (isDataChangedRef.current === true) {
      refetch();
      isDataChangedRef.current = false;
    }
  }, [navigate]);
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
        key={`DistMasterGrid`}
        finalMetaData={SourceParentGridMetaData as GridMetaDataType}
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
          path="edit-detail/*"
          element={
            <SourceParentTypeFormWrapper
              handleDialogClose={ClosedEventCall}
              isDataChangedRef={isDataChangedRef}
              formView="view"
            />
          }
        />
        <Route
          path="add/*"
          element={
            <SourceParentTypeFormWrapper
              handleDialogClose={ClosedEventCall}
              isDataChangedRef={isDataChangedRef}
              formView="add"
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

export const SourceParentTypeMasterGrid = () => {
  return (
    <ClearCacheProvider>
      <SourceParent />
    </ClearCacheProvider>
  );
};
